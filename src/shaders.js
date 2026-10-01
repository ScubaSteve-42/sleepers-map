// GLSL for the map. Three.js compiles ShaderMaterial as GLSL ES 3.00, so texelFetch and gl_InstanceID are available.
// Node and edge positions live in float textures (one texel per node) that the CPU rewrites each frame:
//   uPos: xyz = centre, w unused.   uFx: x = visibility 0..1, y = emphasis, z = dim, w = birth flash 1..0.

const common = /* glsl */ `
precision highp float;
precision highp sampler2D;
float hash11(float p){ p = fract(p * .1031); p *= p + 33.33; p *= p + p; return fract(p); }
float hash31(vec3 p){ p = fract(p * .1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vnoise(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  float a = hash31(i), b = hash31(i+vec3(1,0,0)), c = hash31(i+vec3(0,1,0)), d = hash31(i+vec3(1,1,0));
  float e = hash31(i+vec3(0,0,1)), g = hash31(i+vec3(1,0,1)), h = hash31(i+vec3(0,1,1)), k = hash31(i+vec3(1,1,1));
  return mix(mix(mix(a,b,f.x), mix(c,d,f.x), f.y), mix(mix(e,g,f.x), mix(h,k,f.x), f.y), f.z);
}
float fbm(vec3 p){ float s = 0., a = .5; for(int i=0;i<5;i++){ s += a*vnoise(p); p = p*2.03 + 7.1; a *= .5; } return s; }
`;
// only the node, halo and edge vertex shaders read the position textures (TEXW comes from the material's defines)
const texu = /* glsl */ `
ivec2 texCoord(int i){ return ivec2(i % TEXW, i / TEXW); }
`;

export const nodeVert = /* glsl */ `
${common}${texu}
uniform sampler2D uPos; uniform sampler2D uFx; uniform float uTime;
attribute vec3 aColor; attribute vec4 aInfo; // aInfo: radius, tier, seed, spare
varying vec3 vNormalV; varying vec3 vViewV; varying vec3 vObj; varying vec3 vColor;
varying float vEmph; varying float vDim; varying float vSeed; varying float vTier;
void main(){
  ivec2 tc = texCoord(gl_InstanceID);
  vec4 P = texelFetch(uPos, tc, 0); vec4 F = texelFetch(uFx, tc, 0);
  float vis = smoothstep(0., 1., F.x);
  float breathe = 1. + .035 * sin(uTime * 1.3 + aInfo.z * 6.2831);
  float birth = 1. + .55 * sin(F.w * 3.1416) * F.w;
  float s = aInfo.x * vis * breathe * birth * (1. + .22 * F.y);
  vec3 world = P.xyz + position * s;
  vec4 mv = viewMatrix * vec4(world, 1.);
  vNormalV = normalize((viewMatrix * vec4(position, 0.)).xyz);
  vViewV = normalize(-mv.xyz);
  vObj = position; vColor = aColor; vEmph = F.y; vDim = F.z; vSeed = aInfo.z; vTier = aInfo.y;
  gl_Position = projectionMatrix * mv;
}`;

export const nodeFrag = /* glsl */ `
${common}
uniform float uTime;
varying vec3 vNormalV; varying vec3 vViewV; varying vec3 vObj; varying vec3 vColor;
varying float vEmph; varying float vDim; varying float vSeed; varying float vTier;
void main(){
  vec3 N = normalize(vNormalV), V = normalize(vViewV);
  float ndv = clamp(dot(N, V), 0., 1.);
  float fres = pow(1. - ndv, 2.2);
  vec3 L = normalize(vec3(-.45, .7, .6));
  float diff = clamp(dot(N, L) * .5 + .5, 0., 1.);
  float swirl = fbm(vObj * 2.4 + vec3(uTime * .06, vSeed * 17., uTime * .04));
  vec3 base = vColor;
  vec3 col = mix(base * .22, base * .95, diff) + base * (swirl - .35) * .5;
  col += mix(base, vec3(1.), .25) * fres * (.5 + 1.0 * vEmph);
  col += vec3(1.) * pow(fres, 5.) * .12;
  col += mix(base, vec3(1.), .4) * pow(ndv, 8.) * (vTier < 1.5 ? .16 : .05);
  float lum = dot(col, vec3(.299, .587, .114));
  col = mix(col, vec3(lum) * .16, vDim * .84);
  col *= 1. + .3 * vEmph;
  gl_FragColor = vec4(col, 1.);
}`;

export const haloVert = /* glsl */ `
${common}${texu}
uniform sampler2D uPos; uniform sampler2D uFx; uniform float uTime;
attribute vec3 aColor; attribute vec4 aInfo;
varying vec2 vUv; varying vec3 vColor; varying float vVis; varying float vEmph; varying float vDim; varying float vTier; varying float vBirth; varying float vNear;
void main(){
  ivec2 tc = texCoord(gl_InstanceID);
  vec4 P = texelFetch(uPos, tc, 0); vec4 F = texelFetch(uFx, tc, 0);
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  float tier = aInfo.y;
  float k = tier < .5 ? 6.5 : (tier < 1.5 ? 5.6 : (tier < 2.5 ? 4.1 : 3.3));
  float vis = smoothstep(0., 1., F.x);
  float size = aInfo.x * k * (.3 + .7 * vis) * (1. + .55 * F.y + 1.4 * F.w);
  vec3 world = P.xyz + (right * position.x + up * position.y) * size;
  vUv = position.xy; vColor = aColor; vVis = vis; vEmph = F.y; vDim = F.z; vTier = tier; vBirth = F.w;
  vNear = clamp(length(P.xyz - cameraPosition) / (aInfo.x * 20.), .08, 1.);   // fade the glow when the camera is right next to the node
  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.);
}`;

export const haloFrag = /* glsl */ `
${common}
uniform float uHaloGain;
varying vec2 vUv; varying vec3 vColor; varying float vVis; varying float vEmph; varying float vDim; varying float vTier; varying float vBirth; varying float vNear;
void main(){
  float r = length(vUv);
  if (r > 1.) discard;
  float g = exp(-r * r * 6.5);
  float tight = smoothstep(.42, 0., r);
  float sp = 0.;
  if (vTier < 1.5) {
    float ax = pow(max(0., 1. - abs(vUv.x) * 16.), 2.), ay = pow(max(0., 1. - abs(vUv.y) * 16.), 2.);
    sp = (ax * (1. - abs(vUv.y)) + ay * (1. - abs(vUv.x))) * .5 * (1. - r);
  }
  float a = (g * .4 + tight * .13 + sp * .8) * vVis * vNear;
  float tierGain = vTier < 2.5 ? 1. : .7;
  float strength = (.5 * mix(uHaloGain * tierGain, 1., vEmph) + 1.1 * vEmph + 1.8 * vBirth) * (1. - vDim * .88);
  gl_FragColor = vec4(vColor * a * strength, 1.);
}`;

export const edgeVert = /* glsl */ `
${common}${texu}
uniform sampler2D uPos; uniform sampler2D uFx; uniform vec2 uRes; uniform float uPx;
attribute float aT; attribute float aSide;
attribute vec2 aEnds; attribute vec4 aEdge; // aEdge: weight 0..1, seed, seed2, spare
attribute vec3 aColA; attribute vec3 aColB;
varying vec3 vCol; varying float vSide; varying float vT; varying float vVis; varying float vDim; varying float vEmph; varying float vW; varying float vSeed;
void main(){
  ivec2 ta = texCoord(int(aEnds.x + .5)), tb = texCoord(int(aEnds.y + .5));
  vec4 pa = texelFetch(uPos, ta, 0), pb = texelFetch(uPos, tb, 0);
  vec4 fa = texelFetch(uFx, ta, 0), fb = texelFetch(uFx, tb, 0);
  vec3 A = pa.xyz, B = pb.xyz; vec3 d = B - A; float L = max(length(d), 1e-3); vec3 ax = d / L;
  vec3 hlp = abs(ax.y) < .92 ? vec3(0., 1., 0.) : vec3(1., 0., 0.);
  vec3 n1 = normalize(cross(ax, hlp)); vec3 n2 = cross(ax, n1);
  float ang = aEdge.y * 6.2831853;
  vec3 C = (A + B) * .5 + (n1 * cos(ang) + n2 * sin(ang)) * L * (.1 + .16 * aEdge.z);
  float t = aT, it = 1. - t;
  vec3 P = it * it * A + 2. * it * t * C + t * t * B;
  vec3 T = normalize(2. * it * (C - A) + 2. * t * (B - C));
  mat4 vp = projectionMatrix * viewMatrix;
  vec4 c0 = vp * vec4(P, 1.);
  vec4 c1 = vp * vec4(P + T * max(L * .02, .5), 1.);
  vec2 s0 = c0.xy / max(c0.w, 1e-4) * uRes * .5, s1 = c1.xy / max(c1.w, 1e-4) * uRes * .5;
  vec2 dir = s1 - s0; float dl = length(dir); dir = dl > 1e-4 ? dir / dl : vec2(1., 0.);
  vec2 nrm = vec2(-dir.y, dir.x);
  float inc = step(.99, max(fa.y, fb.y)) * step(.45, min(fa.y, fb.y));
  float wpx = (.75 + 1.7 * aEdge.x) * uPx * (1. + 1.3 * inc) * (.5 + .5 * sin(3.14159 * t));
  c0.xy += nrm * aSide * wpx / (uRes * .5) * c0.w;
  gl_Position = c0;
  vCol = mix(aColA, aColB, t); vSide = aSide; vT = t; vW = aEdge.x; vSeed = aEdge.y;
  vVis = min(fa.x, fb.x); vEmph = inc; vDim = (1. - inc) * max(fa.z, fb.z);
}`;

export const edgeFrag = /* glsl */ `
${common}
uniform float uTime; uniform float uPulse; uniform float uReveal; uniform float uEdgeGain;
varying vec3 vCol; varying float vSide; varying float vT; varying float vVis; varying float vDim; varying float vEmph; varying float vW; varying float vSeed;
void main(){
  if (vT > uReveal * 1.25 - vSeed * .25) discard;
  float soft = 1. - smoothstep(.2, 1., abs(vSide));
  float base = (.11 + .3 * vW) * soft;
  float head = fract(uTime * (.045 + .05 * vW) + vSeed);
  float dd = abs(vT - head); dd = min(dd, 1. - dd);
  float pulse = exp(-dd * dd * 700.) * uPulse * (.3 + .7 * vW) * soft;
  float inten = base + pulse * 1.9;
  inten *= smoothstep(0., 1., vVis) * (1. - vDim * .93) * (1. + vEmph * 2.4) * mix(uEdgeGain, 1., vEmph);
  gl_FragColor = vec4(vCol * inten, 1.);
}`;

export const starVert = /* glsl */ `
${common}
uniform float uTime; uniform float uPx;
attribute float aSize; attribute float aPhase; attribute vec3 aTint;
varying vec3 vTint; varying float vTw;
void main(){
  vTint = aTint; vTw = .65 + .35 * sin(uTime * (.5 + aPhase) + aPhase * 40.);
  vec4 mv = modelViewMatrix * vec4(position, 1.);
  gl_PointSize = aSize * uPx * (.8 + .4 * vTw);
  gl_Position = projectionMatrix * mv;
}`;

export const starFrag = /* glsl */ `
${common}
varying vec3 vTint; varying float vTw;
void main(){
  vec2 p = gl_PointCoord - .5; float r = length(p) * 2.;
  float a = smoothstep(1., 0., r); a *= a;
  gl_FragColor = vec4(vTint * a * vTw * 1.15, 1.);
}`;

export const dustVert = /* glsl */ `
${common}
uniform float uTime; uniform float uPx;
attribute float aSize; attribute float aPhase;
varying float vA;
void main(){
  vec3 p = position + vec3(sin(uTime * .05 + aPhase * 30.), cos(uTime * .04 + aPhase * 17.), sin(uTime * .045 + aPhase * 11.)) * 18.;
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  float dist = -mv.z;
  gl_PointSize = clamp(aSize * uPx * 420. / max(dist, 1.), 1., 6. * uPx);
  vA = smoothstep(2200., 200., dist) * (.5 + .5 * sin(uTime * .3 + aPhase * 50.));
  gl_Position = projectionMatrix * mv;
}`;

export const dustFrag = /* glsl */ `
${common}
varying float vA;
void main(){
  vec2 p = gl_PointCoord - .5; float r = length(p) * 2.;
  float a = smoothstep(1., 0., r); a *= a * vA * .5;
  gl_FragColor = vec4(vec3(.62, .72, 1.) * a, 1.);
}`;

// soft coloured clouds behind each category's cluster, so the territories read at a glance
export const cloudVert = /* glsl */ `
${common}
uniform float uTime;
attribute vec3 aColor; attribute vec4 aCloud; // aCloud: size, alpha, seed, spare
attribute vec3 aCenter;
varying vec2 vUv; varying vec3 vColor; varying float vAlpha; varying float vSeed;
void main(){
  vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 up = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  vec3 world = aCenter + (right * position.x + up * position.y) * aCloud.x;
  vUv = position.xy; vColor = aColor; vAlpha = aCloud.y; vSeed = aCloud.z;
  gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.);
}`;

export const cloudFrag = /* glsl */ `
${common}
uniform float uTime;
varying vec2 vUv; varying vec3 vColor; varying float vAlpha; varying float vSeed;
void main(){
  float r = length(vUv); if (r > 1.) discard;
  float fall = pow(1. - smoothstep(0., 1., r), 1.7);
  float n = fbm(vec3(vUv * 1.7 + vSeed * 9., uTime * .015 + vSeed));
  float a = fall * (.35 + 1.1 * n) * vAlpha;
  gl_FragColor = vec4(vColor * a, 1.);
}`;

export const bgVert = /* glsl */ `
varying vec3 vDir;
void main(){ vDir = position; gl_Position = projectionMatrix * viewMatrix * vec4(position * 1. + cameraPosition, 1.); gl_Position.z = gl_Position.w * .9999; }`;

export const bgFrag = /* glsl */ `
${common}
uniform float uTime;
varying vec3 vDir;
void main(){
  vec3 d = normalize(vDir);
  float y = d.y * .5 + .5;
  vec3 col = mix(vec3(.004, .005, .02), vec3(.012, .014, .05), smoothstep(0., 1., y));
  float n1 = fbm(d * 2.2 + vec3(0., uTime * .004, 3.));
  float n2 = fbm(d * 4.6 + vec3(9., 2., uTime * .006));
  float cloud = smoothstep(.42, .85, n1) * .5 + smoothstep(.5, .9, n2) * .25;
  vec3 teal = vec3(.02, .13, .2), mag = vec3(.17, .03, .17), ind = vec3(.05, .05, .24);
  vec3 tint = mix(mix(teal, mag, smoothstep(.2, .8, fbm(d * 1.4 + 5.))), ind, smoothstep(.3, .7, fbm(d * 1.1 + 11.)));
  col += tint * cloud * .85;
  float band = pow(1. - abs(d.y * .9 + d.x * .35), 6.) * .35;
  col += vec3(.04, .05, .11) * band * (.5 + fbm(d * 7.));
  gl_FragColor = vec4(col, 1.);
}`;

export const finalVert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.); }`;

export const finalFrag = /* glsl */ `
precision highp float;
uniform sampler2D tDiffuse; uniform float uTime; uniform float uVig; uniform float uGrain; uniform float uCA; uniform vec2 uRes;
varying vec2 vUv;
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
void main(){
  vec2 c = vUv - .5; float r2 = dot(c, c);
  vec2 off = c * r2 * uCA;
  vec3 col = vec3(texture2D(tDiffuse, vUv + off).r, texture2D(tDiffuse, vUv).g, texture2D(tDiffuse, vUv - off).b);
  col *= 1. - uVig * smoothstep(.12, .62, r2 * 1.9);
  col += (hash12(vUv * uRes + fract(uTime) * 91.) - .5) * uGrain;
  gl_FragColor = vec4(max(col, 0.), 1.);
}`;
