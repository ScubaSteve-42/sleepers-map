# Rebuild Your Map of Software Engineering

*A returning programmer's guide from machine code to AI agents, 1945 to 2026*

To catch up after three or four decades away, treat modern software as the stack you remember plus a new way of working on top of it: **the layers are familiar, the workflow is not**. You still have processors that obey numbers, translators (assemblers, compilers, interpreters) above them, languages above those, data held in databases, and an operating system and network beneath everything, and C, C++, Java, SQL, Visual Basic, Fortran and even COBOL are all still in the top 20 languages ([TIOBE, September 2026](https://www.tiobe.com/tiobe-index/)). What changed is that nearly everything is now free, open, networked and checked by machines: Python leads the rankings, JavaScript and TypeScript run the web, Git and GitHub hold the code, package registries supply the libraries, linters, tests and continuous integration run on every change, the browser and the cloud are the platforms, and since 2022 AI assistants and agents write a growing share of code. Read chapters 1 to 3 for what you partly remember (compilers, C and C++, the language families), chapters 4 to 6 for data, databases and matrices, chapters 7 and 8 for tooling that did not exist in your day, chapter 9 for what the evidence says works and fails, and chapters 10 to 12 for companies, platforms and the AI era; the timeline and glossary are for lookup. Three cautions apply throughout: no development method has ever been tested as a whole, popularity rankings count different things, and items dated 2026 were read through summarizing tools and are labelled "as reported" where that matters.

## If you only read one page: the layers are the same, the workflow is new

Software is still a stack of translations from human ideas to numbers that a processor obeys, and the stack you knew (machine code, assembler, compiler, language, library, operating system) is intact (chapter 1). The surprises are in what surrounds it, as the table shows.

| Area | What you would remember | What it is now |
|---|---|---|
| Languages | C, Pascal, BASIC, FORTRAN, COBOL, early C++ | Python first on TIOBE (17.76%), C second, C++ third; JavaScript and TypeScript run the web; Java, C#, Swift, Kotlin and Rust fill out the field (chapters 2 and 3) |
| Compilers | A vendor product such as Turbo C or Microsoft C | Two free families, GCC and Clang/LLVM, plus virtual machines with bytecode and just-in-time compilers (chapters 1 and 3) |
| Memory | Pointers and `malloc` as the programmer's responsibility | Memory-unsafe code is a security liability (about 70% of Microsoft's CVE-numbered vulnerabilities in 2019), and Rust has entered the Linux kernel (chapter 3) |
| Data | Program-owned files, dBase, mainframe databases | SQL won; PostgreSQL, MySQL and SQLite lead; the NoSQL challengers mostly absorbed SQL features (chapter 5) |
| Numbers | Fortran numerical libraries | The same BLAS and LAPACK ideas sit under NumPy and the machine-learning stack (chapter 6) |
| Source control | RCS, CVS or copied folders | Git and pull requests on GitHub, where a branch costs about 41 bytes (chapter 7) |
| Libraries | A shared folder of library files, "DLL hell" | Package managers and registries (npm's holds about 4.4 million package documents) and a new supply-chain attack surface (chapter 7) |
| Quality | Lint (1978) and tests run by hand | Linters, formatters, type checkers, unit tests and continuous integration on every change (chapter 8) |
| Process | Structured programming, waterfall, maturity models | Agile, DevOps and trunk-based development, with thin evidence for any whole method (chapter 9) |
| Platforms | DOS, Unix workstations, Windows desktops | Windows holds 76% of desktops, but the browser, the cloud, containers and two phone platforms are where most software lives (chapter 11) |
| Help | Manuals, colleagues and trial and error | AI assistants and agents: 84% of surveyed developers use or plan to use them, and 46% distrust their accuracy (chapter 12) |

**What is popular now.** TIOBE's September 2026 top five is Python, C, C++, Java and C#; in Stack Overflow's 2025 survey JavaScript (66%), HTML/CSS (61.9%), SQL (58.6%) and Python (57.9%) lead the languages, with Visual Studio Code used by 75.9% of respondents, Docker by 71.1% and PostgreSQL by 55.6% ([Stack Overflow 2025](https://survey.stackoverflow.co/2025/technology)). **What has worked** is anything that shortens feedback, contains change or turns failure into learning: structured programming, information hiding, high-level languages with automatic memory management, version control, automated tests with continuous integration, code review, open-source components and small batches (chapter 9). **What has not worked** includes lines of code as a measure, big-bang rewrites, strict single-pass waterfall for uncertain requirements, coverage percentages as targets, code-generating CASE tools, heavyweight middleware such as CORBA, and findings delivered in dashboards rather than inside code review (chapters 8 and 9). **What to distrust**: the Standish "CHAOS" failure rates, the precise "10x programmer", unaudited claims that COBOL handles most ATM transactions, and any productivity number from a tool's own vendor; the best-known randomized trial of AI assistance on experienced developers (METR, 2025) found them 19% slower while they believed they were about 20% faster (chapters 2, 9 and 12). A word on terms: "the researchers" are the Claude agents who produced the twelve research notes behind this report, and "the notes" are those files.

## Timeline: eighty years in forty-two entries

| Year | Event | Ch. |
|---|---|---|
| 1945 | von Neumann's "First Draft" describes the stored-program computer | 1 |
| 1946 | ENIAC announced; it is programmed by rewiring | 1 |
| 1948 | Manchester "Baby" runs the first stored program (21 June) | 1 |
| 1949 | EDSAC runs; Wheeler's Initial Orders are the forerunner of the assembler | 1 |
| 1952 | Glennie's Autocode and Hopper's A-0 | 1 |
| 1957 | FORTRAN compiler for the IBM 704 | 1 |
| 1958 to 1960 | LISP, COBOL and ALGOL 60 | 2 |
| 1964 | IBM System/360 (7 April); Dartmouth BASIC (1 May) | 1 |
| 1968 | NATO conference at Garmisch makes "software engineering" a named discipline; Dijkstra's GOTO letter | 1 |
| 1969 to 1973 | Unix begun on a PDP-7; its kernel rewritten in C (1973) | 3 |
| 1970 | Codd's relational model; Pascal | 5, 2 |
| 1972 | Smalltalk, Prolog and the Unix pipe | 2, 3 |
| 1975 | Brooks's *The Mythical Man-Month*; Altair BASIC | 9, 2 |
| 1978 | K&R's *The C Programming Language*; Johnson's lint | 3, 8 |
| 1979 | Oracle ships the first commercial SQL database; Stroustrup starts "C with Classes" | 5, 3 |
| 1981 | IBM PC with PC-DOS (August) | 11 |
| 1983 | TCP/IP flag day (1 January); GNU announced (27 September); DB2 | 11, 3, 5 |
| 1984 | Macintosh; MathWorks founded | 10, 6 |
| 1985 | IEEE 754 floating-point standard | 4 |
| 1986 to 1987 | SQL becomes an ANSI, then ISO, standard | 5 |
| 1989 | ANSI C; Berners-Lee proposes the Web; Python begun | 3, 11, 2 |
| 1991 | Linux announced (25 August) | 3 |
| 1993 | CERN releases the Web royalty-free (30 April) | 11 |
| 1995 | Java and JavaScript; MySQL | 2, 5 |
| 1998 | First ISO C++ standard; "open source" coined (3 February) | 3, 10 |
| 2001 | Agile Manifesto (February) | 9 |
| 2005 | Git's first commit (7 April) | 7 |
| 2006 | AWS launches S3 and EC2 | 11 |
| 2007 | iPhone announced (9 January) | 11 |
| 2008 | GitHub (April) and the App Store (10 July) | 7, 11 |
| 2012 | AlexNet wins ImageNet with 15.3% error against 26.2% | 6 |
| 2013 | Docker unveiled (March) | 11 |
| 2014 | Kubernetes's first commit (6 June); Swift announced | 11, 2 |
| 2015 | Rust 1.0 (May); Visual Studio Code announced (29 April) | 3, 8 |
| 2016 | The left-pad incident (March); Language Server Protocol | 7, 8 |
| 2017 | The Transformer paper | 6 |
| 2020 | Python 2 sunset (1 January) | 2 |
| 2021 | GitHub Copilot preview (29 June); Log4Shell (December) | 12, 7 |
| 2022 | ChatGPT (30 November) | 6 |
| 2024 | xz backdoor disclosed (29 March); Model Context Protocol (25 November) | 7, 12 |
| 2025 | Shai-Hulud npm worm (September); Python 3.14 (7 October); Linux maintainers call Rust "a success" (December) | 7, 2, 3 |
| 2026 | TypeScript 7.0 (8 July) and EU Cyber Resilience Act reporting duties (11 September), both as reported | 12 |

## 1. Every program ends as numbers, and a compiler is a pipeline of rewrites

### A processor obeys only numbers, and everything else is translation

The most useful single idea for a returning reader is that a computer's processor can do exactly one thing: obey **machine code**, a stream of numbers that its circuits decode one instruction at a time ("add these two registers", "jump back if the last comparison said less-or-equal"). Machine code belongs to one processor family, so code for an Intel chip will not run on an ARM chip ([Crafting Interpreters](https://craftinginterpreters.com/a-map-of-the-territory.html)). Everything else in programming, from assembly language to Python, is a layer of translation or simulation built on top of those numbers, and the vocabulary you will meet (assembler, linker, loader, compiler, interpreter, bytecode, virtual machine, JIT) names the layers and the moment at which each translation happens.

The first electronic computer, ENIAC (announced February 1946), was programmed by rewiring: cables and switches, about 18,000 vacuum tubes, 30 tons ([Computer History Museum timeline](https://www.computerhistory.org/timeline/computers/)). The escape was the **stored-program** idea in John von Neumann's June 1945 "First Draft of a Report on the EDVAC", which puts instructions in the same memory as data, so one program can translate another ([von Neumann 1945](https://web.mit.edu/STS.035/www/PDFs/edvac.pdf)). The Manchester "Baby" ran the first stored program on 21 June 1948 and Cambridge's EDSAC its first fully automatic calculation on 6 May 1949. David Wheeler's EDSAC "Initial Orders" (31 instructions hard-wired on a mechanical read-only memory) read symbolic programs from paper tape, and the August 1949 revision added relocation, which the EDSAC guide calls "the forerunner of the modern assembler" ([Cambridge EDSAC page](https://www.cl.cam.ac.uk/events/EDSAC99/statistics.html)). Wilkes, Wheeler and Gill's 1951 book, the first on programming, established the **subroutine library**. A priority caution: Kathleen Booth's "Contracted Notation" for Birkbeck College's ARC machines (from 1947) is often called the first assembly language, but that wording comes from an obituary and Wikipedia, Birkbeck itself says only "very early", and no source shows whether a program or a person translated it ([Birkbeck](http://www.dcs.bbk.ac.uk/about/history/); [The Register](https://www.theregister.com/2022/10/29/kathleen_booth_obit/)). The earliest documented assembler program is Wheeler's.

| Term | Takes in | Produces | When it runs |
|---|---|---|---|
| Assembler | assembly text (mnemonics and labels) | machine code in an object file | before delivery; near one-to-one translation |
| Compiler | high-level source | assembly, machine code, bytecode or other source | before delivery (ahead of time); many-to-one, with analysis and optimization |
| Linker | object files and libraries | one executable, with final addresses filled in | before delivery |
| Loader | an executable file | a running process in memory | at launch |
| Interpreter | source or bytecode | nothing saved; effects happen as it reads | at run time |
| Virtual machine | bytecode | effects, as if on an imaginary computer | at run time |
| JIT compiler | bytecode or source | machine code in memory, on demand | at run time, for the hot parts |
| Transpiler | source in language A | source in language B | before delivery |

The compiler-versus-interpreter line is blurry. Python's glossary says the language "is an interpreted language, as opposed to a compiled one, though the distinction can be blurry because of the presence of the bytecode compiler": CPython compiles your source to **bytecode**, a compact instruction list for an imaginary computer, and a virtual machine runs it ([Python glossary](https://docs.python.org/3/glossary.html)). The idea is old: Crafting Interpreters credits Martin Richards (BCPL) and Niklaus Wirth (Pascal, where it was called p-code) with it ([Crafting Interpreters](https://craftinginterpreters.com/a-map-of-the-territory.html)), and the Java specification calls UCSD Pascal's P-Code machine "the best-known virtual machine" of its kind ([JVM specification](https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-1.html)). A "virtual machine" that a cloud provider rents out is a different thing: it emulates a whole computer.

### One loop, seen at five levels, shows what each tool does

The researchers compiled one tiny program, "sum the numbers 1 to 10", with real tools on 2026-09-30, so the bytes below are verified rather than recalled. The C source is:

```c
int sum_to_10(void) {
    int sum = 0;
    for (int i = 1; i <= 10; i++)
        sum += i;
    return sum;
}
```

On a 64-bit Intel or AMD processor (x86-64) the assembler turns the loop into **17 bytes** ([Compiler Explorer run](https://godbolt.org/z/obGGdh3sc)):

```
xor eax, eax          31 C0              sum = 0  (a number XOR itself is zero)
mov ecx, 1            B9 01 00 00 00     i = 1    (little-endian: low byte first)
again: add eax, ecx   01 C8              sum += i
inc ecx               FF C1              i++
cmp ecx, 10           83 F9 0A           compare i with 10
jle again             7E F7              jump back while i <= 10
ret                   C3                 return; the answer is in eax
```

The label `again` names an address, and the F7 in the jump is minus nine as a signed number, which lands back on it. The same loop on 64-bit ARM, the chip family in most phones, is **28 bytes**, because every ARM64 instruction is exactly four bytes while these x86 instructions run one to five: the visible difference between CISC ("complex instruction set") and RISC ("reduced instruction set") design ([ARM64 run](https://godbolt.org/z/sTnaM311h)). Java produces 22 bytes of bytecode for a stack machine that pushes and pops values instead of using named registers ([Java run](https://godbolt.org/z/YoGMPM7a1)), and CPython 3.14's bytecode uses instruction names that change between releases, so bytecode is "not expected to ... be stable between Python releases" ([CPython run](https://godbolt.org/z/4fT4c1YzK)).

The most instructive result is what an optimizing compiler does with the same C. At no optimization (`-O0`) gcc 16.2 emits 13 instructions and 41 bytes that keep every variable in memory. At `-O2` the whole loop disappears and the function becomes two instructions, `mov eax, 55` and `ret`, six bytes ([-O2 run](https://godbolt.org/z/5Yf1bc946)). The compiler evaluated the loop at compile time. The loop you wrote is not necessarily the loop that runs, which is also why stepping through optimized code in a debugger can look strange.

### A compiler climbs up to meaning and descends to the machine

Robert Nystrom's image in *Crafting Interpreters* is the cleanest: climb a mountain from raw characters to the program's meaning, then descend toward something the CPU can execute ([Crafting Interpreters](https://craftinginterpreters.com/a-map-of-the-territory.html)). **Lexing** groups characters into tokens (`sum += i;` becomes the name `sum`, the operator `+=`, the name `i` and a semicolon). **Parsing** checks the tokens against the grammar and builds an abstract syntax tree that mirrors the nesting. **Semantic analysis** works out what names mean and, in a statically typed language, checks types. The program is then rewritten in an **intermediate representation** (IR), closer to machine operations but independent of any chip; **optimization** rewrites the IR; **code generation** picks real instructions and registers; and the toolchain assembles, links and loads, in GCC's words "preprocessing, compilation proper, assembly and linking, always in that order" ([GCC manual](https://gcc.gnu.org/onlinedocs/gcc/Overall-Options.html)).

Two inventions turned compiler writing from craft into engineering. **BNF**, a precise notation for grammars, came from the ALGOL 60 report edited by Peter Naur (January 1960), building on John Backus's 1959 paper ([ALGOL 60 report](https://www.masswerk.at/algol60/report.htm)); Backus later said "nobody paid any attention to it. Except Peter Naur" ([oral history](http://archive.computerhistory.org/resources/text/Oral_History/Backus_John/Backus_John_1.oral_history.2006.102657970.pdf)), but once syntax was a formal object a program could generate parsers, as Bell Labs' **Lex** and **Yacc** (both 1975) did; Johnson's paper notes Yacc was used for lint, the Portable C Compiler and a mathematics typesetter ([Yacc paper](https://web.archive.org/web/20201201001559/http://dinosaur.compilertools.net/yacc/index.html)). The second is the shared intermediate form: supporting N languages on M chips needs N times M compilers without one, and N front ends plus M back ends with one. Chris Lattner's chapter on LLVM (begun December 2000, now the middle of Clang, Rust and Swift) makes that argument and calls LLVM IR "a low-level RISC-like virtual instruction set" ([Lattner](https://aosabook.org/en/v1/llvm.html)).

Optimization is not a luxury, because the compiler may replace your program with any other that behaves the same. `24 * 60 * 60` becomes the constant 86,400 even at `-O0` (constant folding); a small function pasted into its caller disappears as a call (inlining); and a multiplication that does not change inside a loop moves out of it, while array addresses advance by 4 bytes per step instead of being recomputed (hoisting and strength reduction) ([Compiler Explorer runs listed in the notes](https://godbolt.org/z/a3aqY7r5a)).

### The 1950s proved that compiled code could match hand-written code

FORTRAN is what made high-level languages unavoidable. John Backus's IBM team began in 1954 and delivered a compiler for the IBM 704 in 1957, a job that took "two and one-half years and 18 man years" and about 24,000 machine instructions ([Backus et al. 1957](https://softwarepreservation.computerhistory.org/FORTRAN/paper/BackusEtAl-FortranAutomaticCodingSystem-1957.pdf)). The 1954 report's goal was code that "will be executed in about the same time that would be required had the problem been laboriously hand coded", because personnel costs were at least as great as machine cost and, at some installations, as much as half the machine cost went to debugging ([1954 report](https://softwarepreservation.computerhistory.org/FORTRAN/BackusEtAl-Preliminary%20Report-1954.pdf)). To beat the skeptics the team built in what modern compilers use: common-subexpression elimination, hoisting invariant work out of loops, strength reduction of array subscripts, and even a simulated Monte Carlo run to decide which variables deserved the 704's three index registers. IBM says the team "confounded skeptics who insisted that a program compiled from a high-level language could never be as efficient as one that was handcrafted" ([IBM](https://www.ibm.com/history/fortran)); note that "first optimizing compiler" is IBM's own priority claim, and Backus remembered the compiler as about 30,000 instructions, not the paper's 24,000.

Before FORTRAN, "compiler" meant something narrower. Alick Glennie's Autocode for the Manchester Mark 1 (1952) really translated algebraic statements to machine language, so Knuth and Trabb Pardo "choose to credit Glennie with the first compiler although A-0 was completed first"; Grace Hopper's A-0 (1952) pulled stored subroutines from a library and linked them, closer to a linker plus macro expander ([Knuth and Trabb Pardo 1976](https://bitsavers.org/pdf/stanford/cs_techReports/STAN-CS-76-562_EarlyDevelPgmgLang_Aug76.pdf)). Hopper's 1955 warning remains the best summary of the field's perennial hype: "automatic programming does not imply that it is now possible to walk up to a computer, say 'write my payroll checks', and push a button" ([Hopper 1955](http://bitsavers.informatik.uni-stuttgart.de/pdf/univac/HopperAutoCodingPaper_1955.pdf)).

### Machines and working conditions shaped the first languages

Programs of the 1950s and early 1960s reached the machine on 80-column punched cards (a FORTRAN statement took one card) and came back hours or a day later; at MIT, each batch job "had complete control of the whole 7094 - all 32K of memory" ([CTSS overview](https://multicians.org/thvv/compatible-time-sharing-system.pdf)). Expensive turnaround made compile-time checking and readable syntax economic necessities, and the reaction was **time-sharing**: MIT's CTSS (November 1961), Dartmouth's system and BASIC (4 a.m., 1 May 1964) and Multics (from 1965) ([Dartmouth](https://www.dartmouth.edu/basicfifty/basic.html); [Multicians](https://multicians.org/history.html)). On the hardware side, IBM's **System/360** (7 April 1964) replaced five incompatible product lines with one compatible family; IBM says it "pioneered the 8-bit byte still in use on computers today" and notes that before it "anyone buying a new computer system had to scrap their existing programs and start from scratch" ([IBM](https://www.ibm.com/history/system-360)). That idea of an architecture as a durable contract is the ancestor of every instruction set since. Minicomputers (the $18,000 PDP-8) and then the Intel 4004 (1971) put machines in labs and processors on chips ([CHM Silicon Engine](https://www.computerhistory.org/siliconengine/microprocessor-integrates-cpu-function-onto-a-single-chip/)), and the 8086 (1978) deliberately kept the 8080's assembly language ([Morse](https://stevemorse.org/8086history/8086history.doc)). IBM's RISC work began in 1974 as a telephone-switching project, and its designers stressed that RISC "does not strictly imply a reduced number of instructions" ([Cocke and Markstein](https://acg.cis.upenn.edu/milom/cis501-Fall11/papers/cocke-RISC.pdf)).

### In 1968 the profession named its crisis and began to answer it

By the mid-1960s cheaper hardware had made programming the bottleneck, and large projects such as IBM's OS/360 were late and unreliable. In October 1968 more than fifty people from eleven countries met in Garmisch, Germany, under a NATO banner; the report says "software engineering" was "deliberately chosen as being provocative, in implying the need for software manufacture to be based on the types of theoretical foundations and practical disciplines, that are traditional in the established branches of engineering" ([NATO 1968 report](http://homepages.cs.ncl.ac.uk/brian.randell/NATO/nato1968.PDF)). Co-editor Brian Randell believes the term came from Fritz Bauer, a hedged attribution; other claimants exist and the notes did not verify them ([Randell](http://homepages.cs.ncl.ac.uk/brian.randell/NATO/NATOReports/index.html)). Participants disagreed about whether it was a crisis at all, but Dijkstra's 1972 Turing lecture explains it best: once machines were "several orders of magnitude more powerful", programming "had become an equally gigantic problem" ([Dijkstra, "The Humble Programmer"](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html)).

The answers arrived in waves. Dijkstra's March 1968 letter against the GO TO statement (retitled "Go To Statement Considered Harmful" by its editor, Niklaus Wirth) launched **structured programming**: build programs from sequence, choice, loops and procedures so that a reader can tell where a running process is ([EWD215](https://www.cs.utexas.edu/users/EWD/transcriptions/EWD02xx/EWD215.html); title story from [EWD1308](https://www.cs.utexas.edu/users/EWD/transcriptions/EWD13xx/EWD1308.html)). Knuth's 1974 reply argued "for the elimination of go to's in certain cases, and for their introduction in others", and warned that "premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%" ([Knuth 1974](https://pic.plover.com/knuth-GOTO.pdf)). David Parnas's 1972 paper introduced **information hiding**: cut a system into modules by the design decisions each hides, not by the steps of a flowchart ([Parnas 1972](https://wstomv.win.tue.nl/edu/2ip30/references/criteria_for_modularization.pdf)). Doug McIlroy's 1968 call for "mass produced software components" planted the seed of today's libraries and package managers, and Tony Hoare's 1969 paper proposed proving programs correct while warning that proofs "may be applicable only to quite simple program designs" ([Hoare 1969](https://www.cs.cmu.edu/~crary/819-f09/Hoare69.pdf)). Wirth's retrospective records the verdict that mattered: these developments "passed virtually unnoticed in industry" ([Wirth 2008](https://people.inf.ethz.ch/wirth/Miscellaneous/IEEE-Annals.pdf)). None of them "solved" the crisis.

### What failed in this era, and what survived inside the failures

Five ideas of the period failed against their original ambition. **PL/I**, designed in 1963 by IBM and the SHARE user group to unify scientific, business and systems programming, was criticized for the "frightening size and complexity" of its definition, and the author of the Multics PL/I compiler warned in 1969 that the difficulty of building one "has been seriously underestimated" ([Dijkstra EWD340](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html); [Freiburghouse 1969](https://www.multicians.org/pl1-raf.html)); it never displaced FORTRAN or COBOL, though it survives on IBM mainframes and Multics was written in it. **Self-modifying code**, once normal because early machines had no index registers, was abandoned as hardware supplied them and as reasoning about programs required static text. **Hand-coded absolute addresses** died with assemblers, and the **"automatic programming" promise** recurred with each generation of tools until Hopper drew the line that explains why: such routines "eliminate the clerical part of the job" but "cannot define a problem" ([Hopper 1955](http://bitsavers.informatik.uni-stuttgart.de/pdf/univac/HopperAutoCodingPaper_1955.pdf)). **UNCOL** (1958), a proposed universal intermediate language, never shipped, but its N-plus-M arithmetic is why LLVM IR and Java bytecode exist; the notes' description of it rests on Wikipedia's lead and is a pointer, not verified history.

## 2. Every language answered a specific pain, and only a handful won

### A language is a bundle of answers to a few design questions

A programming "paradigm" is a style of organizing a program, and almost every real language mixes several. In **procedural** languages (FORTRAN, COBOL, Pascal, C) you state steps that change variables, grouped into procedures. In **object-oriented** ones (Simula, Smalltalk, C++, Java, C#) you build objects that bundle data with the operations on it. In **functional** ones (Lisp, ML, Haskell, Erlang) you combine functions and avoid changing shared state. In **logic** languages (Prolog) you state facts and rules and let a search engine find answers. **Array** languages (APL, MATLAB, R, Julia, NumPy) apply operations to whole arrays so loops mostly vanish, and **declarative** tools (SQL, regular expressions, `make`, HTML) say what you want and let an engine decide how. Three more choices separate languages: whether types are checked before the program runs (static: C, Java, Rust) or while it runs (dynamic: Python, JavaScript, Lisp); how memory is reclaimed; and whether code is compiled ahead of time, run on a virtual machine or interpreted. What matters most for a returning reader is that **the winning ideas are small and portable**, such as closures, filter-map-reduce pipelines, garbage collection, type inference, pattern matching, optional types in place of null, and async/await, rather than whole paradigms.

### One small task in thirteen languages, every sample actually run

The researchers ran the same task, "sum the squares of the odd numbers from 1 to 10" (the answer is 165), in about forty languages on real compilers and interpreters on 2026-09-30 and 2026-10-01. Thirteen of the samples are reproduced here as a reading primer. The first group is what you remember, plus Fortran as it looks now:

```cobol
      * COBOL (GnuCOBOL 3.2) prints 00165; PIC 9(5) declares a five-digit number up front
       IDENTIFICATION DIVISION.
       PROGRAM-ID. SUMSQ.
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 N     PIC 99.
       01 TOTAL PIC 9(5) VALUE 0.
       PROCEDURE DIVISION.
           PERFORM VARYING N FROM 1 BY 2 UNTIL N > 10
               COMPUTE TOTAL = TOTAL + N * N
           END-PERFORM
           DISPLAY TOTAL
           STOP RUN.
```

```basic
REM BASIC (uBasic dialect): the line-number style you remember
10 let t = 0
20 for n = 1 to 9 step 2
30 let t = t + n * n
40 next n
50 print t
```

```pascal
{ Pascal (Free Pascal 3.2.2) }
program SumSquares;
var n, total: integer;
begin
  total := 0;
  for n := 1 to 10 do
    if odd(n) then total := total + n * n;
  writeln(total);
end.
```

```fortran
! Fortran (gfortran 16.2): whole-array arithmetic and a masked SUM, no loop
program sumsq
  implicit none
  integer :: n(10), i
  n = [(i, i = 1, 10)]
  print *, sum(n**2, mask = mod(n, 2) == 1)
end program sumsq
```

```c
/* C (GCC 16.2) */
#include <stdio.h>
int main(void) {
    int total = 0;
    for (int n = 1; n <= 10; n += 2) total += n * n;
    printf("%d\n", total);
    return 0;
}
```

The second group is today's mainstream, where the same idea is written as a pipeline of filter, map and sum:

```python
# Python 3.14
print(sum(x * x for x in range(1, 11) if x % 2 == 1))
```

```javascript
// JavaScript (Node.js v22)
console.log(Array.from({length: 10}, (_, i) => i + 1).filter(x => x % 2 === 1).map(x => x * x).reduce((a, b) => a + b, 0));
```

```rust
// Rust 1.98.0
fn main() {
    let total: i32 = (1..=10).filter(|x| x % 2 == 1).map(|x| x * x).sum();
    println!("{}", total);
}
```

The third group comes from other traditions: functional, logic, array and declarative.

```haskell
-- Haskell (GHC 9.12.2): a list comprehension, like set notation
main = print (sum [x * x | x <- [1 .. 10], odd x])
```

```lisp
;; Common Lisp (CLISP): the parentheses are the syntax, and code is data
(print (reduce #'+ (mapcar (lambda (x) (* x x)) (remove-if-not #'oddp (loop for i from 1 to 10 collect i)))))
```

```prolog
% Prolog (SWI-Prolog): collect all solutions of a logical query, then add them up
main :- findall(S, (between(1, 10, X), X mod 2 =:= 1, S is X*X), L), sum_list(L, T), write(T), nl.
:- initialization(main).
```

```apl
⍝ APL (Dyalog): no loop; read right to left: 1..10, keep the odd ones, square, add up
⎕←+/×⍨(2|⍳10)/⍳10
```

```sql
-- SQL (SQLite): say which rows you want, not how to loop
WITH RECURSIVE n(x) AS (SELECT 1 UNION ALL SELECT x + 1 FROM n WHERE x < 10)
SELECT SUM(x * x) FROM n WHERE x % 2 = 1;
```

The visible trend is that the 1960s loop-and-variable style survives in C and Pascal, while every mainstream language of the last twenty years offers the pipeline, and Fortran, remembered for punched cards and `DO` loops, now has array arithmetic like MATLAB. (These runs are the researchers' own experiments; each printed 165, with COBOL printing 00165.)

### The first generation, 1957 to 1972, answered one pain each

Each early language answered a different problem, and the survivors found an institution that needed them for decades. The "today" column uses TIOBE's September 2026 index ([TIOBE](https://www.tiobe.com/tiobe-index/)); the notes' profiles rest on primary documents such as the 1957 FORTRAN paper, McCarthy's history of Lisp, the ALGOL 60 report and Dartmouth's BASIC manual.

| Language and year | Who | Defining trait | Status in September 2026 |
|---|---|---|---|
| FORTRAN, 1954 to 57 | John Backus's IBM team | Formulas in near-mathematical notation, `DO` loops; an optimizing compiler | Thriving niche: 11th, 1.24%; "Fortran 2028" in committee ([WG5](https://wg5-fortran.org/)) |
| LISP, 1958 to 60 | John McCarthy, MIT | Programs are nested lists; recursion, conditional expressions, garbage collection | Family alive (Clojure, Scheme): "Lisp" 43rd |
| ALGOL 60, 1960 | International committee, edited by Peter Naur | Block structure, recursion, grammar written in BNF | Dead in production; ancestor of Pascal, C and Simula |
| COBOL, 1959 to 60 | CODASYL, with Grace Hopper as adviser | English-like syntax, exact decimal arithmetic | Legacy but heavily used: 20th, 0.78% |
| BASIC, 1964 | Kemeny and Kurtz, Dartmouth | Line numbers, interactive time-sharing, built for beginners | Descendants: Visual Basic 7th (2.55%) |
| APL, 1962 to 66 | Kenneth Iverson | Whole-array operations in special symbols | Niche (Dyalog still sold) |
| Simula 67, 1962 to 67 | Dahl and Nygaard, Oslo | Classes, objects, inheritance, virtual methods | Historic, enormously influential |
| Pascal, 1970 | Niklaus Wirth, ETH Zurich | Structured, teachable; portable P-code | Delphi/Object Pascal 13th, 1.08% |
| Prolog, 1972 | Colmerauer and Roussel, Marseille | Facts and rules; search for proofs | Niche: 29th, 0.60% |

Why did the winners win? FORTRAN's optimizing compiler removed the speed penalty and IBM spread it ([IBM](https://www.ibm.com/history/fortran)). COBOL won because the US Department of Defense mandated that manufacturers support a vendor-neutral business language ([IBM on COBOL](https://www.ibm.com/think/topics/cobol)). BASIC was easy, ran on time-sharing and then shipped inside 1970s personal computers: Gates and Allen licensed their interpreter to MITS for the Altair in 1975 ([CHM](https://www.computerhistory.org/timeline/software-languages/)). Pascal's portable compiler cost $50 ([Wirth 2008](https://people.inf.ethz.ch/wirth/Miscellaneous/IEEE-Annals.pdf)). PL/I lost on cost and complexity. Be wary of the critics of the day: Dijkstra's 1975 remarks that COBOL "cripples the mind" and that BASIC-exposed students are "mentally mutilated beyond hope of regeneration" are polemic, not evidence ([EWD498](https://www.cs.utexas.edu/~EWD/transcriptions/EWD04xx/EWD498.html)).

### Objects: from Simula to Smalltalk to Java, and the retreat from inheritance

Object-oriented programming (OOP) bundles data and the code that works on it into **objects**, created from templates called **classes**; **inheritance** lets one class extend another, and **polymorphism** lets different classes respond to the same call in their own way ([Oracle Java Tutorials](https://docs.oracle.com/javase/tutorial/java/concepts/index.html)). Dahl and Nygaard built Simula in Oslo (1962 to 1967) for simulation, and ACM's Turing Award biography says it "contains the core of the concepts now available in mainstream object-oriented languages such as C++, Eiffel, Java, and C#" ([ACM, Nygaard](https://web.archive.org/web/20241214185319/https://amturing.acm.org/award_winners/nygaard_5916220.cfm)). Alan Kay's group at Xerox PARC gave the idea its name and a purer form in Smalltalk (1972 to 1980); Kay defines it far more narrowly than textbooks do: "OOP to me means only messaging, local retention and protection and hiding of state-process, and extreme late-binding of all things" ([Kay's 2003 email](https://purl.archive.org/stefan_ram/pub/doc_kay_oop_en)). Smalltalk's Model-View-Controller pattern still names the structure of most GUI and web frameworks. The 1994 "Gang of Four" book *Design Patterns* gave the industry a vocabulary.

The backlash is well documented. Peter Norvig's 1996 talk showed that 16 of the book's 23 patterns have simpler implementations in Lisp or Dylan, suggesting that patterns are what you write when a language lacks a feature ([Norvig](https://norvig.com/design-patterns/)). Erlang's Joe Armstrong said object languages carry "all this implicit environment": "You wanted a banana but what you got was a gorilla holding the banana and the entire jungle" ([John D. Cook quoting Armstrong](https://www.johndcook.com/blog/2011/07/19/you-wanted-banana/)). Newer languages reflect it: Go "encourages composition over inheritance" ([Pike, Go at Google](https://go.dev/talks/2012/splash.article)) and the Rust Book says "if a language must have inheritance to be object oriented, then Rust is not such a language" ([Rust Book](https://doc.rust-lang.org/book/ch18-01-what-is-oo.html)). OOP kept the idea of objects and slowly discarded deep inheritance hierarchies; C++, Java and C# remain third, fourth and fifth on TIOBE.

### Java and .NET: the managed-language answer to C++

**Java** came from Sun Microsystems' 1991 "Green Project" for consumer devices, was called Oak, and was announced on 23 May 1995 alongside Netscape ([Sun, "The Early Years"](https://web.archive.org/web/20051230031802/http://java.sun.com/features/1998/05/birthday.html)). Its 1996 white paper says "when the project started, C++ was the language of choice. But over time the difficulties encountered with C++ grew to the point where the problems could best be addressed by creating an entirely new language platform"; Java removed pointers, multiple inheritance of classes, the preprocessor and `goto`, added garbage collection, and compiled to **bytecode** that runs on the same Java Virtual Machine everywhere ([Gosling and McGilton](https://www.oracle.com/technetwork/java/intro-141743.html)). Browser applets died (the Applet API was finally removed in JDK 26 on 17 March 2026, per [JEP 504](https://openjdk.org/jeps/504)), but the server side flourished: servlets, J2EE, and then Spring, created in 2003 "as a response to the complexity of the early J2EE specifications" ([Spring](https://docs.spring.io/spring-framework/reference/overview.html)). Since 2018 Java ships on a strict six-month cadence, with JDK 27 released on 15 September 2026 and Java 25 the current long-term-support version ([Oracle roadmap](https://www.oracle.com/java/technologies/java-se-support-roadmap.html)).

**C#** and the .NET platform are Microsoft's answer, led by Anders Hejlsberg, who also wrote the compiler that became Borland's Turbo Pascal before joining Microsoft in 1996. C# 1.0 shipped with Visual Studio .NET 2002 and, in Microsoft's words, "looked a lot like Java"; it then evolved faster (generics 2005, LINQ 2007, async/await 2012) and became open source and cross-platform with .NET Core in 2016 ([Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history); [.NET Core 1.0](https://devblogs.microsoft.com/dotnet/announcing-net-core-1-0/)). TIOBE named C# its language of the year for 2025. Classic Visual Basic is frozen (Microsoft says VB.NET "won't be extended to new workloads") ([VB strategy](https://learn.microsoft.com/en-us/dotnet/visual-basic/getting-started/strategy)).

### The web and scripting languages won by being short, instant and glued to libraries

**JavaScript** was prototyped in May 1995 at Netscape by Brendan Eich, who was told it "must 'look like Java'", which ruled out Perl, Python and Tcl; he chose "Scheme-ish first-class functions and Self-ish (albeit singular) prototypes", and calls the result "a quickie love-child of C and Self" ([Eich, "Popularity"](https://brendaneich.com/2008/04/popularity/)). The popular claim that it took ten days is not in his account and is unverified. It became the only language every browser runs, was standardized as ECMAScript from 1997, and left the browser with Ryan Dahl's Node.js in 2009 ([Ecma-262](https://ecma-international.org/publications-and-standards/standards/ecma-262/)). **TypeScript** (Microsoft, announced 1 October 2012) added optional static types that compile away, and by August 2025 GitHub's Octoverse reported it as the most-used language on that platform by contributor count ([Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)). The price of this ecosystem is churn: frameworks, bundlers and runtimes (React, Angular, Vue, Svelte, Deno, Bun) turn over quickly.

**Python** was begun by Guido van Rossum in December 1989 as a Christmas-week "hobby" project, "a descendant of ABC that would appeal to Unix/C hackers", named for Monty Python; indentation for grouping "derives directly from ABC" ([van Rossum, Foreword](https://www.python.org/doc/essays/foreword/)). Python 3.0 (December 2008) broke compatibility, and Python 2 was not sunset until 1 January 2020, about eleven years later ([python.org](https://www.python.org/doc/sunset-python-2/)). The global interpreter lock long stopped threads from running Python code in parallel, and Python 3.14 (7 October 2025) officially supports an optional free-threaded build ([What's new in 3.14](https://docs.python.org/3/whatsnew/3.14.html)). Python rose from an average TIOBE rank of 25 in 2001 to first place in 2026 by being readable, by gluing to C libraries (numerics, then machine learning) and by being the teaching language ([TIOBE](https://www.tiobe.com/tiobe-index/)). **PHP**, begun in 1994 by Rasmus Lerdorf as C-written CGI tools, won the server layer through cheap hosting and WordPress (chapter 11 gives the shares). **Ruby** rose with Rails (2004); **Perl**, the 1990s web and system-administration default, fell from tenth place on TIOBE in 2016 to 23rd; **Lua** owns embedded and game scripting. John Ousterhout's 1998 essay explains the family: scripting languages are "designed for gluing", connecting components written in system languages such as C ([Ousterhout](https://web.stanford.edu/~ouster/cgi-bin/papers/scripting.pdf)). The **shell** is the original glue: the Unix pipe (1972), the Bourne shell (1979), bash (1989), and Microsoft's PowerShell (2006), which replaced "pipe text" with "pipe .NET objects".

### Functional, logic and array traditions are little used whole and widely borrowed

**Functional programming** treats functions as ordinary values and prefers combining them to changing shared state. Its lineage runs from Lisp (1958) through ML (1973 to 1978, Robin Milner) to Haskell (report 1990), with Ericsson's Erlang (1986) as the industrial branch. ML contributed **type inference** (the compiler works out types for you); the Standard ML history says it popularized "datatypes with pattern matching, Hindley-Milner type inference, and parametric polymorphic types" ([History of Standard ML](https://smlfamily.github.io/history/SML-history.pdf)). The doctrine of purity and laziness stayed niche (Haskell is 49th on TIOBE), but the tools migrated everywhere: lambdas, pipelines, garbage collection, generics, pattern matching and optional types. The cleanest case is Tony Hoare's null reference (1965), his "billion-dollar mistake", now being designed out of Rust, Kotlin, Swift and C# 8 in favor of optional types ([Hoare at InfoQ](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/); [Rust Book](https://doc.rust-lang.org/book/ch06-01-defining-an-enum.html)).

Whether static typing improves quality is less settled than either camp claims. The cleanest study took 400 real, already-public JavaScript bugs and found that Flow or TypeScript would have flagged about **15%** of them (a range of 11.5% to 18.5%), which measures detectability, not cost ([Gao, Bird and Barr, ICSE 2017](https://earlbarr.com/publications/typestudy.pdf)). A famous GitHub-wide correlation between languages and defects shrank on replication to effects the original authors agreed were small ([Berger et al. 2019](https://arxiv.org/abs/1901.10220)). Industry is adopting types anyway because of tooling and, GitHub argues, because typed contracts help AI-assisted teams.

**Logic programming** gave us Prolog (1972) and a cautionary tale. Japan's Fifth Generation Computer Systems project (1982 to 1992) bet that logic programming on massively parallel custom hardware would define the next computer generation; one secondary source reports about 57 billion yen spent and "ultimately commercial failure", and the Lisp machine market collapsed in 1987 as the expert-system boom ended in the "AI winter" ([Wikipedia, Fifth Generation](https://en.wikipedia.org/wiki/Fifth_Generation_Computer_Systems); [Wikipedia, AI winter](https://en.wikipedia.org/wiki/AI_winter)). Small declarative engines (SQL, regular expressions, `make`) won instead. The **array** line runs from Iverson's APL through MATLAB (commercial 1984), R (1993), NumPy and Julia (2012); Fortran never left, and Julia has not broken through as a general-purpose language, per TIOBE's September 2026 commentary ([TIOBE](https://www.tiobe.com/tiobe-index/)).

### Mobile created two platform languages in a decade

The smartphone produced two new platform languages. Apple's **Swift** (work begun July 2010 by Chris Lattner, announced 2 June 2014) replaced Objective-C, the Smalltalk-flavored C superset that came to Apple with NeXT; Swift is compiled, statically typed and memory safe, using automatic reference counting, and Swift 6.4 shipped on 15 September 2026 ([Swift book](https://raw.githubusercontent.com/swiftlang/swift-book/main/TSPL.docc/GuidedTour/AboutSwift.md); [Swift 6.4](https://www.swift.org/blog/swift-6.4-released/)). JetBrains' **Kotlin** (1.0 in February 2016) displaced Java on Android after Google declared Android "Kotlin-first" at I/O 2019, and Google says over 60% of professional Android developers use it, a company claim ([Android Developers](https://developer.android.com/kotlin/first)). Mobile itself collapsed into an Android and iOS duopoly, wiping out Symbian, BlackBerry OS and Windows Phone (chapter 11 gives the shares).

### Legacy workhorses: survival follows switching cost, not popularity

**COBOL** is embedded in banking and government, and the figures you will see for it need care. IBM says COBOL "serves as the foundation for more than 40% of all online banking systems", "supports 80% of in-person credit card transactions" and "handles 95% of all ATM transactions" ([IBM](https://www.ibm.com/think/topics/cobol)), but the notes found **no audited, method-documented figure**: IBM's own page footnotes the numbers to a 2023 magazine article, other repetitions echo each other, and "COBOL runs somewhere in the chain" is not the same as "COBOL executes the transaction" ([Wealthsimple](https://www.wealthsimple.com/en-ca/magazine/cobol-controls-your-money)). COBOL's genuine technical strength is exact decimal arithmetic for money: JavaScript prints `0.1 + 0.2` as `0.30000000000000004`, while a COBOL field declared `PIC 9V99` gives exactly 0.30 (both verified runs). **Ada**, designed from 1977 to 1983, was mandated for new mission-critical Defense software from 1983, but the National Research Council found in 1997 that Ada systems "continued to be in the minority" and that the policy was "frequently counterproductive in application areas that have strong commercial support" ([NRC, Ada and Beyond](https://nap.nationalacademies.org/read/5463/chapter/3)). Ada found its lasting niche in certified safety-critical work, with the provable SPARK subset.

### What did not work among languages

The failures here cluster into four patterns. Browser plug-ins lost their host: Java applets, Flash (Adobe ended Flash Player support on 31 December 2020) and Silverlight (end of support October 2021) were replaced by JavaScript and, for heavy code, WebAssembly, a W3C Recommendation since December 2019 ([Adobe](https://web.archive.org/web/20220101000808/https://www.adobe.com/products/flashplayer/end-of-life.html); [W3C](https://www.w3.org/press-releases/2019/wasm/)). Middleware was over-built: CORBA, which Michi Henning blamed on "design by committee and political maneuvering", EJB 2 and SOAP lost to simpler rivals (Spring, REST and JSON) ([Henning, ACM Queue](https://web.archive.org/web/20241205101322/https://queue.acm.org/detail.cfm?id=1142044)). Platforms lost ecosystem wars (chapter 11). And some languages lost to successors or to their own delays: CoffeeScript (its best ideas absorbed by ES2015), Google's Dart-in-Chrome (abandoned in 2015), and Perl 6's fifteen-year delay before it was renamed Raku.

Beyond those, four deeper bets failed. The Fifth Generation project and the Lisp machines lost to commodity chips that kept improving; Ada's mandate lost to commercial ecosystems; "pure" object-oriented maximalism lost to pragmatic composition; and visual programming never became a general method. Fred Brooks's 1986 judgment, "Nothing even convincing, much less exciting, has yet emerged from such efforts. I am persuaded that nothing will", still describes general-purpose visual programming, although Scratch, LabVIEW and ladder logic persist in teaching, instrumentation and industrial control ([Brooks, "No Silver Bullet"](https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf)). In almost every case the ideas survived inside other tools.

## 3. C is a thin layer over the machine, and C++ is C plus abstractions that cost nothing unless used

### How a Bell Labs side project became the language of operating systems

C descends from Martin Richards's typeless BCPL (1966) through Ken Thompson's B (1969 to 1970), which Dennis Ritchie squeezed into a typed language between 1971 and 1973 ([Ritchie, "The Development of the C Language"](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/chist.html)). Unix began in 1969 on a little-used PDP-7, and in the summer of 1973 its kernel was rewritten in C, which Ritchie called "perhaps the most important watershed" because it showed a high-level language could carry an operating system ([Ritchie, "The Evolution of the Unix Time-sharing System"](https://www.nokia.com/bell-labs/about/dennis-m-ritchie/hist.html)). His own verdict on why C won puts Unix's success first, then C's smallness and types "well-grounded in those provided by real machines", and a closing line worth remembering: "C is quirky, flawed, and an enormous success." *The C Programming Language* by Kernighan and Ritchie (1978, "K&R") served as the definition for a decade. Standards followed: ANSI C in 1989, ISO C90, C99, C11, C17 and **C23** (formally ISO/IEC 9899:2024), with C2y in draft in 2026 ([WG14 status page](https://www.open-std.org/jtc1/sc22/wg14/www/projects); [cppreference history of C](https://en.cppreference.com/w/c/language/history)).

Around C grew the ecosystem that still defines "systems programming": the **Unix philosophy** of small tools that each do one thing well and pass text to one another (first written down in the 1978 Bell System Technical Journal, [BSTJ foreword](https://archive.org/stream/bstj57-6-1899/bstj57-6-1899_djvu.txt)); **pipes** (1972); **POSIX** (portability standards begun in 1984); **BSD** (Berkeley's Unix, with the sockets that put Unix on the Internet); Richard Stallman's **GNU** project (announced 27 September 1983) with its compiler **GCC** (1987); and **Linux**, announced by Linus Torvalds on 25 August 1991 as "just a hobby, won't be big and professional like gnu" ([Torvalds' post](https://www.cs.cmu.edu/~awb/linux.history.html)). The sources disagree on when BSD began (FreeBSD's documentation says tapes began in 1976, Wikipedia says 1978), so "the mid-to-late 1970s" is the safe statement. The vendor compilers you remember (Turbo C, Microsoft C, a Unix `cc`) have been joined by two free, interchangeable families, GCC and Clang/LLVM (first released September 2007), alongside Microsoft's own compiler.

### Reading C: five ideas and a hello world

A reader who knows BASIC or Pascal can read most C after grasping five things: the preprocessor and header files, the compile-then-link pipeline, fixed-size types, the array-pointer equivalence, and manual memory management. Every listing in this chapter was compiled and run by the researchers with clang 21.1.0 on 2026-09-30, and the outputs shown are real. The traditional first program:

```c
#include <stdio.h>

int main(void) {
    printf("Hello, world\n");
    return 0;
}
```

The first line is not C proper: the **preprocessor** replaces it with the text of the header `stdio.h`, which declares that `printf` exists somewhere. `main` is the entry point and returning 0 means success. Real programs are split into headers (declarations, the promises) and source files (definitions, the code); each source file is compiled separately into an object file and a **linker** joins them. In a three-file test the preprocessor expanded a 10-line file to 1,542 lines by pasting in `stdio.h`, and forgetting to link one object file produced the modern form of an old message, `undefined symbol: square` (the researchers' own experiment; the stages follow the C standard's translation phases, [cppreference](https://en.cppreference.com/w/c/language/translation_phases)).

C's types map onto hardware, and their sizes are not fixed by the language: `int` is typically 32 bits, but `long` is 4 bytes on 64-bit Windows and 8 on 64-bit Linux and macOS, which the researchers confirmed from the compilers' predefined macros ([cppreference arithmetic types](https://en.cppreference.com/w/c/language/arithmetic_types)). Unsigned arithmetic wraps around, integer division truncates (`-7 / 2` is `-3`), and C23 made two's complement the only allowed representation for signed integers.

An **array** is a fixed run of same-typed elements, indexed from 0, with no stored length and no bounds check:

```c
#include <stdio.h>
#define N 5

int main(void) {
    int scores[N] = {72, 85, 90, 64, 78};
    int sum = 0;
    int best = scores[0];
    for (int i = 0; i < N; i++) {      /* i runs 0,1,2,3,4 */
        sum += scores[i];
        if (scores[i] > best) best = scores[i];
    }
    printf("sum=%d average=%.1f best=%d\n", sum, (double)sum / N, best);
    return 0;
}
```

It prints `sum=389 average=77.8 best=90`. C has **no string type**: `"cat"` is the four-element array `{'c','a','t','\0'}`, and the length is found by scanning for the zero byte. A **pointer** is a variable holding an address. In most expressions an array name is treated as a pointer to its first element, so `a[i]` is defined as `*(a + i)` and pointer arithmetic is scaled by the element size; Ritchie calls this rule "the crucial jump in the evolutionary chain between typeless BCPL and typed C". This program, run for the report, shows four spellings of one element and the classic trap that a function parameter declared as an array is really a pointer:

```c
#include <stdio.h>

static void show(int arr[], size_t n) {   /* "int arr[]" here really is "int *arr" */
    printf("inside function: sizeof arr = %zu, n = %zu\n", sizeof arr, n);
}

int main(void) {
    int a[4] = {10, 20, 30, 40};
    int *p = a;                           /* the array name decays to &a[0] */
    printf("%d %d %d %d\n", a[2], *(a + 2), *(p + 2), 2[a]);
    printf("sizeof a = %zu, sizeof p = %zu\n", sizeof a, sizeof p);
    show(a, 4);
    return 0;
}
```

Output: `30 30 30 30`, then `sizeof a = 16, sizeof p = 8`, then `inside function: sizeof arr = 8, n = 4`. Clang warned at compile time that `sizeof` on an array parameter returns the pointer's size, which is why C functions that take an array also take a separate length. A **struct** groups named fields in memory in declaration order:

```c
#include <stdio.h>
#include <stddef.h>

struct Point { double x, y; };

struct Employee {
    char name[16];
    int  id;
    struct Point desk;                     /* a struct inside a struct */
};

static void promote(struct Employee *e) { /* pass a pointer so the caller's copy changes */
    e->id += 1000;                        /* e->id is shorthand for (*e).id */
}

int main(void) {
    struct Employee e = { "Ada", 7, { 1.5, 2.0 } };
    promote(&e);
    printf("%s #%d at (%.1f, %.1f)\n", e.name, e.id, e.desk.x, e.desk.y);
    printf("sizeof(struct Employee)=%zu offsetof(id)=%zu offsetof(desk)=%zu\n",
           sizeof e, offsetof(struct Employee, id), offsetof(struct Employee, desk));
    return 0;
}
```

Output: `Ada #1007 at (1.5, 2.0)` and `sizeof(struct Employee)=40 offsetof(id)=16 offsetof(desk)=24`. The fields add up to 36 bytes, but the compiler inserted 4 bytes of **padding** after `id` so the following `double` begins on an 8-byte boundary. Dynamic memory is manual: `malloc(n)` returns space on the **heap** (or a null pointer on failure), and every successful allocation must be released exactly once with `free`. The four classic heap bugs follow: a leak, a double free, a use-after-free and a buffer overflow. Function pointers (`int (*op)(int, int) = add;`) give C callbacks, which is how `qsort` calls your comparison function, and they are the hand-built ancestor of the "virtual functions" C++ automated.

### The same decision makes C fast and dangerous

Nothing in C checks bounds, pointer validity or lifetimes at run time, and the standard calls the result of violating the rules **undefined behavior**: the compiler is then free to do anything, and it assumes your program never does. Chris Lattner's explanation is blunt: "C is not a 'high level assembler' like many experienced C programmers... like to think" ([Lattner](https://blog.llvm.org/2011/05/what-every-c-programmer-should-know.html)). The researchers' demonstration is `check(int x) { return x + 1 > x; }` called with the largest int. Built with no optimization it printed 0 (the addition wrapped), built with `-O2` it printed 1 (the optimizer assumed overflow cannot happen and folded the test to true), and built with sanitizers on it aborted: three builds, three behaviors, one source file. For a returning reader this is the biggest conceptual change since 1990: the profession now treats memory-unsafe code as a measurable security liability, as the memory-safety section below shows.

### C++ is C plus mechanisms for making abstractions free

Bjarne Stroustrup began "C with Classes" in April 1979 at Bell Labs as a preprocessor adding Simula-style classes to C; he built a real compiler, **Cfront**, in 1983 to 1985, added templates and exceptions (accepted 1990), adopted Alexander Stepanov's **Standard Template Library** (accepted 1994) and saw the first ISO standard in 1998 ([Stroustrup, HOPL-III](https://www.stroustrup.com/hopl-almost-final.pdf)). His design bet is "zero-overhead abstraction": "What you don't use, you don't pay for. What you do use, you couldn't hand-code any better" ([Stroustrup, HOPL-IV](https://www.stroustrup.com/hopl20main-p5-p-bfc9cd4--final.pdf)). Since **C++11** (`auto`, lambdas, move semantics, smart pointers, `constexpr`) the language has shipped every three years: C++14, 17, 20 (concepts, modules, coroutines, ranges), 23, and C++26, whose technical work finished on 28 March 2026 and adds static reflection, contracts, a hardened standard library and a rule that reading an uninitialized local variable is no longer undefined behavior ([Sutter's trip report](https://herbsutter.com/2026/03/29/c26-is-done-trip-report-march-2026-iso-c-standards-meeting-london-croydon-uk/)). Treat that source with care: Herb Sutter is a committee veteran and advocate, and the notes found no source confirming ISO's final publication of C++26, with isocpp.org still naming C++23 as current on 2026-09-30.

C++ is not a strict superset of C. Stroustrup says "C++ and C99 are siblings," and the C++ standard's own annex lists the differences ([Stroustrup FAQ](https://www.stroustrup.com/bs_faq.html)). The researchers tested 15 snippets as C17 and as C++20; a sample shows the flavor.

| Snippet | As C17 | As C++20 |
|---|---|---|
| `int *p = malloc(4 * sizeof *p);` (no cast) | compiles | error: cannot convert `void *` to `int *` |
| `struct S {int a;}; S s = {1};` | error: needs the `struct` keyword | compiles |
| `char *s = "hello";` | compiles | error: string literals are `const` |
| `int a[argc + 2];` (variable length array) | compiles | error: not standard C++ |
| `sizeof('a')` | 4 (a character literal is an `int`) | 1 (it is a `char`) |
| `int f(int)` and `int f(double)` together | error: conflicting types | compiles (overloading, via name mangling) |

In practice, C++ added classes, templates, overloading, references, exceptions, namespaces and **RAII** (a scoped object acquires a resource in its constructor and releases it in its destructor), and tightened C's typing. This verified program shows several of those ideas together:

```cpp
#include <algorithm>
#include <cstdio>
#include <memory>
#include <vector>

class File {                                  // RAII: constructor acquires, destructor releases
    std::FILE *f_;
public:
    explicit File(const char *path) : f_(std::fopen(path, "r")) {}
    ~File() { if (f_) { std::fclose(f_); std::puts("file closed"); } }
    File(const File &) = delete;              // copying would lead to a double close
    bool ok() const { return f_ != nullptr; }
};

template <typename T>                         // one definition, many element types
T largest(const std::vector<T> &v) { return *std::max_element(v.begin(), v.end()); }

int main() {
    {
        File f("raii_stl.cpp");
        std::printf("open ok: %d\n", f.ok());
    }                                         // the destructor runs here automatically
    std::vector<int> nums{3, 9, 4};
    nums.push_back(11);
    std::printf("largest int = %d\n", largest(nums));
    auto up = std::make_unique<int>(42);      // unique ownership; freed automatically
    auto sq = [](int x) { return x * x; };    // a lambda (C++11)
    std::printf("%d squared = %d\n", *up, sq(*up));
}
```

The output lines are `open ok: 1`, `file closed`, `largest int = 11` and `42 squared = 1764`. "File closed" appears early because the destructor ran at the closing brace of the inner block, with no `fclose` written by the user, which replaces the manual `goto cleanup` idiom of C programmers. If you left around 1990, your C++ was Cfront-era "C with classes" with raw `new` and `delete`, `char*` strings and deep inheritance hierarchies; modern C++ uses value types, containers, smart pointers, lambdas and ranges.

### Why C and C++ are still ranked second and third

In TIOBE's September 2026 index, Python leads at **17.76%**, C is second at **10.28%** (up from third a year earlier), C++ third at **8.67%**, Java fourth at 7.54% and C# fifth at 4.22%; TIOBE says the index "is not about the best programming language or the language in which most lines of code have been written" ([TIOBE](https://www.tiobe.com/tiobe-index/)). The best primary statement of why C persists comes from SQLite's authors: C is "sometimes described as 'portable assembly language'", nearly every system can call libraries written in C ("this is not true of other implementation languages"), the minimum build needs only seven standard library routines, and "the C language is old and boring" ([SQLite](https://sqlite.org/whyc.html)). The Linux kernel remains C (GNU C11), with Rust added under a build option ([kernel docs](https://docs.kernel.org/process/programming-language.html)).

### Memory safety is the argument that reshaped the field

Since 2019, Microsoft, Google and others have reported the same finding. Microsoft said in July 2019 that about **70%** of the vulnerabilities it fixes and assigns a CVE number are memory-safety issues ([MSRC](https://www.microsoft.com/en-us/msrc/blog/2019/07/we-need-a-safer-systems-programming-language)); Chromium reported around 70% of its high-severity bugs are memory-unsafety problems ([Chromium](https://www.chromium.org/Home/chromium-security/memory-safety/)); and Google's Android team reported memory-safety bugs falling from **76%** of Android vulnerabilities in 2019 to 24% in 2024 and below **20%** in 2025 as new code shifted to Rust and other safe languages ([Google Security Blog, Sept 2024](https://security.googleblog.com/2024/09/eliminating-memory-safety-vulnerabilities-Android.html); [Nov 2025](https://security.googleblog.com/2025/11/rust-in-android-move-fast-fix-things.html)). These are Google's own measurements of its own code, not an independent study, but they point the same way as the others. Governments followed: a February 2024 White House report said "the highest leverage method to reduce memory safety vulnerabilities is to secure one of the building blocks of cyberspace: the programming language" ([ONCD report](https://bidenwhitehouse.archives.gov/wp-content/uploads/2024/02/Final-ONCD-Technical-Report.pdf)), and CISA's product-security guidance calls new critical-infrastructure products in C or C++ "dangerous" where safe alternatives exist ([CISA](https://www.cisa.gov/resources-tools/resources/product-security-bad-practices)). The notes could not verify how the current U.S. administration treats those documents.

The language answer is **Rust**, begun by Graydon Hoare in 2006, at version 1.0 in May 2015, and now at 1.98.1 (September 2026). Its rules are that every value has one owner, a value is dropped when its owner goes out of scope, and references may be shared and read-only or exclusive and writable but never both at once; the compiler enforces this and no garbage collector runs ([The Rust Book](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html)). Use-after-free, double free and dangling references become compile errors, and out-of-bounds indexing becomes a defined panic rather than undefined behavior (the researchers confirmed all four with rustc 1.98.1). In December 2025 the Linux maintainers' summit concluded, in LWN's words, that "the experiment is indeed a success," and Torvalds said the "experimental" tag should come off after nearly five years ([LWN](https://lwn.net/Articles/1050174/)). Skeptics deserve a hearing: SQLite's authors argue that recoding in a safe language "would probably introduce far more bugs than would be fixed," and Sutter notes that vulnerability statistics "almost always conflate C and C++" ([SQLite](https://sqlite.org/whyc.html); [Sutter, Dec 2025](https://herbsutter.com/2025/12/30/software-taketh-away-faster-than-hardware-giveth-why-c-programmers-keep-growing-fast-despite-competition-safety-and-ai/)). The evidence is strong that new code in a safe language reduces vulnerabilities and weaker on whether rewriting old code is worth its cost.

The other languages that tried to replace C or C++ each changed one big thing. Go (public November 2009, 1.0 in March 2012, by Griesemer, Pike and Thompson at Google) simplified the language and added goroutines; Zig (2016) kept C's explicitness and added compile-time execution. Only Rust has clearly broken into C and C++'s core territory (the Linux kernel, Android, Chromium's parsers, Windows components), and it still sits well below them in rankings, at 1.34% against 10.28% and 8.67% in TIOBE.

### What failed here, and the pattern behind it

The ecosystem's failures share a cause: complexity added without matching implementer capacity or benefit. Intel's **Itanium** (1989 to 2021) bet that a "sufficiently smart compiler" could schedule instructions in parallel; its compiler proved "much more difficult to implement than originally thought", it underperformed and AMD's 64-bit extension of x86 won ([Wikipedia, Itanium](https://en.wikipedia.org/wiki/Itanium)). Systems Hungarian notation (prefixing `dw` or `l` to variable names) was, by Joel Spolsky's account, a misreading of Charles Simonyi's original idea and is now largely abandoned, with the Linux style guide calling it "asinine" ([Spolsky](https://www.joelonsoftware.com/2005/05/11/making-wrong-code-look-wrong/); [kernel coding style](https://docs.kernel.org/process/coding-style.html)). The same test explains why Rust is the one successor that succeeded: its improvement, from 76% to under 20% in one measured codebase, was large enough to justify switching.

## 4. Data is bits with a name, and most classic bugs live where the bits meet the idea

### A variable is a label, and each language picks a different default for what it labels

A **variable** is a name that refers to a value held in memory, and a **type** tells the machine how to read the bits stored there. In C, `int x;` creates a named object of fixed type and size. In Python every value is an object with "an identity, a type and a value", and a name is closer to a label stuck on an object than to a box that contains a value ([Python data model](https://docs.python.org/3/reference/datamodel.html)). The researchers' running theme, supported by the experiments below, is that bugs appear at the boundaries where two representations meet: a clean mathematical idea (a whole number, a tenth, a letter, "nothing") against its fixed-size binary form.

Integers show the first boundary. C integers have a fixed width and unsigned arithmetic wraps around; Python's integers are unlimited; and JavaScript has only a 64-bit floating-point `Number`, exact for integers only up to 2^53 − 1 ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures)). These lines were all run:

```python
print(2**100)                 # 1267650600228229401496703205376  (no overflow, ever)
print(-7 // 2, -7 % 2)        # -4 1   (Python floors; C and JavaScript truncate toward zero: -3 -1)
```

```javascript
console.log(2 ** 53, 2 ** 53 + 1);        // 9007199254740992 9007199254740992  (the +1 is lost)
console.log(9007199254740993n + 1n);       // 9007199254740994n  (BigInt is exact)
```

The real-world cost is not hypothetical. The maiden flight of Europe's Ariane 5 rocket on **4 June 1996** failed because of "a data conversion from 64-bit floating point to 16-bit signed integer value" in guidance software reused from Ariane 4, 37 seconds after main-engine ignition ([Ariane 501 inquiry report](https://www-users.cse.umn.edu/~arnold/disasters/ariane5rep.html)). In February 1991 a Patriot missile battery failed to intercept a Scud that killed 28 soldiers; the GAO attributed it to a tenth-of-a-second clock tick held in a 24-bit fixed-point register, which cannot hold 1/10 exactly, so after about 100 hours the error reached roughly 0.34 seconds, enough for a Scud to move more than half a kilometer ([Arnold's summary of the GAO report](https://www-users.cse.umn.edu/~arnold/disasters/patriot.html)); the researchers could not retrieve the GAO PDF itself.

**Floating point** is the second boundary. Before 1985 each vendor had its own float format; IEEE 754 (1985, shaped by William Kahan's work with Intel from 1976) made one standard, and a "double" now has 64 bits ([Kahan's history](https://people.eecs.berkeley.edu/~wkahan/ieee754status/754story.html)). Because computers store numbers in binary, the decimal 0.1 "cannot be represented exactly as a base 2 fraction", and Python's tutorial stresses this "is not a bug in Python, and it is not a bug in your code either" ([Python tutorial](https://docs.python.org/3/tutorial/floatingpoint.html)). The standard remedies are tolerance comparisons, exact decimals for money, or storing money as integer cents:

```python
import math
from decimal import Decimal
print(0.1 + 0.2)                        # 0.30000000000000004
print(0.1 + 0.2 == 0.3)                 # False
print(math.isclose(0.1 + 0.2, 0.3))     # True
print(Decimal("0.1") + Decimal("0.2"))  # 0.3
```

This is exactly why COBOL's fixed-point decimal fields were designed as they were, and why SQL databases offer a `NUMERIC` type that PostgreSQL's documentation "especially recommend[s]" for money ([PostgreSQL](https://www.postgresql.org/docs/current/datatype-numeric.html)).

### Text is bytes, code units and code points, so one string has four lengths

ASCII, first standardized in 1963, is a 7-bit code for 128 characters, and the space from 128 to 255 became a mess of incompatible "code pages". **Unicode** gives every character a number called a code point, and Unicode 18.0, released on 16 September 2026, contains 172,808 characters ([Unicode Consortium](http://www.unicode.org/versions/Unicode18.0.0/)). **UTF-8** writes any code point as one to four bytes, leaves plain ASCII text unchanged, and was designed "on a placemat in a New Jersey diner" in September 1992 by Ken Thompson and Rob Pike; W3Techs reports it is used by 99.1% of websites whose encoding is known ([Pike's account](https://www.cl.cam.ac.uk/~mgk25/ucs/utf-8-history.txt); [W3Techs](https://w3techs.com/technologies/details/en-utf8)). The practical consequence is that "length" is ambiguous: the text `héllo 😀` is **11 bytes** in UTF-8 (what C's `strlen` counts), **8 units** in UTF-16 (JavaScript's `.length`), **7 code points** (Python's `len`) and 7 user-perceived characters. In Python:

```python
s = "héllo 😀"
print(len(s), len(s.encode("utf-8")), len(s.encode("utf-16-le")) // 2)    # 7 11 8
```

A decoding mistake produces "mojibake" (`café` read as `cafÃ©`), and a flag emoji is two code points while a family emoji is five.

### Null, arrays and memory: why counting starts at zero

**Null**, the "no value" value, is the third boundary. Tony Hoare introduced null references in ALGOL W in 1965 "simply because it was so easy to implement" and called it "my billion-dollar mistake" ([Hoare at InfoQ](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/)). SQL's NULL means "unknown", so `NULL = NULL` is itself NULL, not true. Memory itself is plain: arrays are contiguous, so element `i` lives at "start address + i × element size". Zero-based indexing has a pointer-offset origin (Martin Richards's BCPL) and a mathematical defense in Dijkstra's note EWD 831, which prefers the half-open range `2 ≤ i < 13` because the range for N elements then reads `0 ≤ i < N` and "an element's ordinal (subscript) equals the number of elements preceding it in the sequence" ([Dijkstra, EWD 831](https://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD831.html)); Python's slices are half-open for the same reason, while Fortran and COBOL count from one. Two machine-level facts surprise returning programmers. Byte order matters: Danny Cohen's 1980 memo named the "little-endian" and "big-endian" camps after *Gulliver's Travels*, and on the researchers' x86-64 machine the four bytes of `0x01020304` are stored as `04 03 02 01`. And alignment adds padding: a C struct `{char c; int i; char d;}` takes 12 bytes, but reordering to `{int i; char c; char d;}` takes 8.

### Data structures: choose by access pattern, not by language

Programs organize data with a short list of building blocks. The **array** and its growable cousin, the dynamic array (Python's `list`, JavaScript's `Array`, C++'s `vector`), are contiguous. The **linked list**, where each node holds a value and the address of the next, was first implemented in 1955 to 1956 by Newell, Shaw and Simon (Lisp's cons cells are the same idea), but today's caches reward contiguous memory so strongly that Bjarne Stroustrup's advice is to "use std::vector by default" ([Stroustrup, "Are lists evil?"](https://isocpp.org/blog/2014/06/stroustrup-lists)). The **hash table** (dictionary, map), which Wikipedia credits to a January 1953 IBM memo by Hans Peter Luhn (the memo itself was not retrieved), turns a key into a slot number and gives O(1) average lookup. **Sets** are hash tables that store only keys; **stacks** (last in, first out) are why runaway recursion ends in a stack overflow; **queues** (first in, first out) drive breadth-first search and message systems. These lines ran:

```python
a = [10, 20, 30, 40, 50]
print(a[0], a[-1], a[1:3], a[:2] + a[2:] == a)    # 10 50 [20, 30] True
```

```python
from collections import deque
queue = deque(); queue.append("a"); queue.append("b"); print(queue.popleft())   # a  (first in, first out)
s1, s2 = {1, 2, 3}, {3, 4}
print(s1 | s2, s1 & s2, s1 - s2)       # {1, 2, 3, 4} {3} {1, 2}
```

The choice matters more than the language. On the researchers' one ordinary PC, 100 lookups of keys that are absent from a 100,000-item collection took 32.6 milliseconds in a Python list and 0.0069 milliseconds in a set, about 4,700 times faster; these timings show orders of magnitude, not benchmarks. In C you build these structures yourself, which is why counting word frequencies takes five lines of Python and about sixty of C.

### Algorithms: how the work grows with the data

An algorithm is a step-by-step method, and **Big-O** notation describes how its work grows as the input grows: O(1) is the same work at any size, O(log n) adds one step each time the data doubles (binary search), O(n) grows in step with the data, O(n log n) is the cost of good sorting, and O(n²) means doubling the data quadruples the work. The researchers' measurement is vivid: finding duplicates by comparing every pair took 38.5, 136.9 and 573.1 milliseconds for 2,000, 4,000 and 8,000 items (roughly four times slower each time the input doubled), while building a set took 0.081, 0.101 and 0.208 milliseconds. The classics are old but still in use: von Neumann's mergesort (1945), Hoare's quicksort (1959), and Tim Peters's **Timsort** (2002), an adaptive stable mergesort written for Python that also sorts arrays in Java SE 7, Android, V8 and Swift ([CPython listsort notes](https://raw.githubusercontent.com/python/cpython/main/Objects/listsort.txt)). You almost never write your own sort; you write the comparison or key function. Even the simplest classic can hide a bug: Joshua Bloch reported in 2006 that the textbook binary search, proved correct in Jon Bentley's *Programming Pearls* and present in Java's library for "nine years or so", computed the midpoint as `(low + high) / 2`, which overflows for arrays of about a billion elements ([Bloch](https://research.google/blog/extra-extra-read-all-about-it-nearly-all-binary-searches-and-mergesorts-are-broken/)). The safe form, which also appears in the C test code, is:

```c
static int find(const int *a, int n, int key) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;          /* not (lo + hi) / 2, which can overflow */
        if (a[mid] == key) return mid;
        if (a[mid] < key) lo = mid + 1; else hi = mid - 1;
    }
    return -1;
}
```

Wirth's 1976 book title, *Algorithms + Data Structures = Programs*, is the one-line summary of this whole area.

### Files and formats: from CSV to Parquet, and why untyped text pushes the bugs onto the reader

To save data or send it to another program, software **serializes** it into bytes. **CSV** (comma-separated values) is the lowest common denominator; RFC 4180 (2005) admits that "while this format is very common, it has never been formally documented", and the researchers' test showed the naive trap: splitting each line on commas gave `NaN` on a file with a quoted comma, so use a real CSV parser. **XML** became a W3C Recommendation on 10 February 1998 and dominated enterprise exchange until JSON overtook it for web interfaces. **JSON**, specified by Douglas Crockford in the early 2000s, became an Internet Standard in December 2017 (RFC 8259) because it maps directly onto JavaScript and Python dictionaries and lists ([RFC 8259](https://www.rfc-editor.org/rfc/rfc8259.txt)); but JavaScript reads every JSON number as a double, so `{"id": 9007199254740993}` comes back as `9007199254740992` in Node while Python keeps it exact. **YAML** is popular for configuration files and has a famous trap, the "Norway problem": under older rules, the country code `NO` becomes the boolean `False`:

```python
import yaml   # PyYAML 6.0.3
print(yaml.safe_load("country: NO\nanswer: yes\nversion: 1.10\nzip: 01234\nname: 'NO'"))
# {'country': False, 'answer': True, 'version': 1.1, 'zip': 668, 'name': 'NO'}
```

**Parquet** (version 1.0 in 2013) stores a table by columns rather than rows; for the same synthetic million-row table the researchers measured 24.2 megabytes as CSV and 5.1 as Parquet, though the data were artificially repetitive ([Apache Parquet](https://parquet.apache.org/docs/overview/)). A plain file offers no transactions, indexes or concurrency control, which is the gap databases fill.

### The remaining basics: scope, errors, memory management and concurrency

Ten ideas form the shared vocabulary of nearly every language: variables, constants, scope, functions, recursion, loops, errors, modules, closures and iterators. Most were settled by the early 1960s (recursion and conditional expressions in Lisp) or by 1970s data-abstraction research. What changed since your era is mostly the defaults: block-level scope almost everywhere; immutable unless marked (Rust); errors as ordinary values (Go, Rust) while C# and Kotlin rejected Java's checked exceptions; and closures and generators as routine tools.

Every program must also decide when borrowed memory is returned. There are five answers: the programmer says so (C's `malloc` and `free`); a counter on each object says so (reference counting, used by Python and Swift); a collector finds what is unreachable (garbage collection, invented for Lisp in 1958 to 1960 and used by Java and JavaScript); the compiler proves it from ownership rules (Rust); or a whole region is released at once (arenas). The strongest evidence for leaving manual management is the security data in chapter 3.

**Concurrency** means structuring a program as several activities in progress at once, and **parallelism** means using several processors at the same instant. Herb Sutter's 2005 essay "The Free Lunch Is Over" argued that processor clock speeds had stopped rising (Intel reached 2 GHz in August 2001, not the 10 GHz that earlier trends implied), so only concurrent programs would keep getting faster ([Sutter](http://www.gotw.ca/publications/concurrency-ddj.htm)). Amdahl's 1967 law bounds the gain: a program that is 95% parallel can never go more than 20 times faster, however many cores it gets. The models differ on whether activities share memory (threads and locks, which bring deadlocks and race conditions; two Node.js threads each doing a million increments of one shared integer produced 1,334,644 instead of 2,000,000), exchange only messages (Erlang's actors, Go's channels, descended from Hoare's 1978 CSP), or take turns on one thread (async/await). No model won outright.

## 5. Databases won by letting programs say what they want, not how to fetch it

### From navigating pointers to asking questions: the relational revolution

A **database** is an organized collection of data managed by a **database management system** (DBMS), the software that takes care of storage, querying, concurrent access, integrity and crash recovery so that each application does not have to. In your era, programs read and wrote their own files and every program knew the exact layout and order of the records; Edgar Codd's 1970 paper named the resulting dependencies: "ordering dependence, indexing dependence, and access path dependence" ([Codd 1970](https://www.engineering.upenn.edu/~zives/03f/cis550/codd.pdf)). The 1960s answers were **navigational**. IBM's hierarchical **IMS**, begun for the Apollo program (first shipped in 1967), stores data as trees; IBM says seven of the top ten financial-sector companies were still running it in the late 2010s ([IBM history of IMS](https://www.ibm.com/history/information-management-system)). Charles Bachman's Integrated Data Store (1963) became the basis of the **CODASYL** network model, in which a programmer follows chains of pointers record by record, and Bachman's 1973 Turing lecture was titled "The Programmer as Navigator". The Wikipedia pseudo-code for finding the Sales department's employees shows the style:

```text
get department with name = 'Sales'
get first employee in set department-employees
until end-of-set do {
    get next employee in set department-employees
    process employee
}
```

```sql
-- the relational way: ask for the result, not the route
SELECT e.name
FROM employee AS e JOIN department AS d ON d.code = e.department_code
WHERE d.name = 'Sales';
```

In June 1970 Codd, at IBM's San Jose laboratory, published "A Relational Model of Data for Large Shared Data Banks". Its idea: describe data as **relations** (tables, "a set of n-tuples"), keep users "protected from having to know how the data is organized in the machine", and let the system work out how to fetch it. The reception was cool; Bob Yost, then working on IMS, recalled "we thought it's going to take at least ten years before there's going to be anything. And it was ten years" ([1995 SQL Reunion transcript](https://www.mcjones.org/System_R/SQL_Reunion_95/sqlr95-Prehisto.html)). IBM's **System R** project (1973 onward) produced the query language: Donald Chamberlin and Raymond Boyce designed SEQUEL, "Structured English Query Language", in 1974, and it was renamed SQL after a legal challenge ([System R reunion](https://www.mcjones.org/System_R/SQL_Reunion_95/sqlr95-System.html)). The commercial race had a twist: **Oracle** (founded 1977 by Larry Ellison, Bob Miner and Ed Oates) shipped SQL first, in 1979; as Oracle's Roger Bamford put it at the 1995 reunion, "IBM invented the language, but Oracle shipped it first" ([Oracle reunion](https://www.mcjones.org/System_R/SQL_Reunion_95/sqlr95-Oracle.html)). IBM followed with SQL/DS (1981) and DB2 (announced 7 June 1983). Michael Stonebraker's Ingres project at Berkeley used a rival language, QUEL, and lost; its descendants include Sybase, Microsoft SQL Server (1989, built on Sybase code) and PostgreSQL. SQL became an ANSI standard in 1986 and an ISO standard in 1987 and has been revised through SQL:2023, though "virtually no implementations in existence adhere to it fully" ([Wikipedia, SQL](https://en.wikipedia.org/wiki/SQL)). Desktop databases (dBase II in 1980, FoxPro, Access 1.0 in 1992) filled the personal-computer era.

Three free databases then changed who could afford a serious database. **MySQL** (first version 23 May 1995) powered the early dynamic web as the "M" of the LAMP stack; Sun bought its company for $1 billion in 2008 and Oracle acquired Sun in 2010, which prompted the MariaDB fork. **PostgreSQL** descends from Stonebraker's Berkeley POSTGRES (begun 1986), was renamed in 1996, and spent two decades earning a reputation for correctness and extensibility ([PostgreSQL history](https://www.postgresql.org/docs/current/history.html)). **SQLite** (D. Richard Hipp, released August 2000) is the embedded engine: a library rather than a server, whole database in one ordinary file, public domain, and in its developers' own unauditable estimate in "over one trillion" active databases because it ships in every smartphone, browser and major operating system ([SQLite](https://www.sqlite.org/mostdeployed.html)).

### Programming against a database: a small SQL example called from Python

Every language follows the same pattern: open a connection, send a SQL statement with placeholders, bind the values separately, fetch rows, commit or roll back, and close. Python's standard library includes SQLite, so this complete example needs nothing installed. The researchers ran it on Python 3.14 and SQLite 3.50; the printed rows are shown as comments.

```python
import sqlite3

conn = sqlite3.connect(":memory:")          # use a file name such as "langs.db" to keep the data
conn.execute("PRAGMA foreign_keys = ON")    # SQLite leaves foreign-key checking off by default
conn.executescript("""
    CREATE TABLE creators (
        id   INTEGER PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
    );
    CREATE TABLE languages (
        id         INTEGER PRIMARY KEY,
        name       TEXT NOT NULL UNIQUE,
        year       INTEGER NOT NULL CHECK (year BETWEEN 1940 AND 2100),
        creator_id INTEGER NOT NULL REFERENCES creators(id)
    );
""")

creators = ["John Backus", "John McCarthy", "Niklaus Wirth", "Dennis Ritchie",
            "Guido van Rossum", "Brendan Eich", "Yukihiro Matsumoto"]
languages = [("Fortran", 1957, "John Backus"), ("Lisp", 1958, "John McCarthy"),
             ("Pascal", 1970, "Niklaus Wirth"), ("C", 1972, "Dennis Ritchie"),
             ("Modula-2", 1978, "Niklaus Wirth"), ("Oberon", 1987, "Niklaus Wirth"),
             ("Python", 1991, "Guido van Rossum"), ("JavaScript", 1995, "Brendan Eich"),
             ("Ruby", 1995, "Yukihiro Matsumoto")]

with conn:                                  # one transaction: commit on success, roll back on error
    conn.executemany("INSERT INTO creators(name) VALUES (?)", [(c,) for c in creators])
    conn.executemany(
        "INSERT INTO languages(name, year, creator_id) "
        "SELECT ?, ?, id FROM creators WHERE name = ?", languages)

for row in conn.execute("""
        SELECT c.name, COUNT(*) AS n, MIN(l.year) AS first_year
        FROM languages AS l JOIN creators AS c ON c.id = l.creator_id
        GROUP BY c.id ORDER BY n DESC, c.name LIMIT 3"""):
    print(row)
# ('Niklaus Wirth', 3, 1970)
# ('Brendan Eich', 1, 1995)
# ('Dennis Ritchie', 1, 1972)
```

Several lessons are packed into that listing. A table holds one kind of fact; each row is a fact; a **primary key** identifies a row, and a **foreign key** (`REFERENCES creators(id)`) ties it to a row in another table; **constraints** (`NOT NULL`, `UNIQUE`, `CHECK`) let the database refuse bad data. The `?` marks are **placeholders**, and the `with conn:` block is a **transaction**: all the changes succeed or none do. The four ACID guarantees (atomicity, consistency, isolation, durability) trace to Jim Gray's 1981 paper on the transaction concept and a 1983 paper by Härder and Reuter. In a test, an update pair that would have overdrawn an account violated a `CHECK` constraint, the `with` block rolled back both updates, and the balances were left intact. The "normalization" idea, from Codd's 1970 paper, is to store each fact once: when one table repeated a customer's city on every order, updating just one of two orders left two cities for the same person, whereas after splitting into `customers` and `orders` tables one update fixed every order ([Kent 1983](https://www.bkent.net/Doc/simple5.htm) gives the rule "the key, the whole key, and nothing but the key").

Performance comes from **indexes**, the B-trees of Bayer and McCreight (1970). On a million-row table, 50 lookups by customer took 878 milliseconds with a full table scan and 0.5 milliseconds after one `CREATE INDEX`, about 1,750 times faster, which the database's `EXPLAIN` command shows as the plan changing from `SCAN orders` to `SEARCH orders USING INDEX`; treat the timings as order-of-magnitude figures from one PC. Correctness depends on one habit above all, **bound parameters**. SQL injection, in which user input pasted into a SQL string becomes part of the query, was described in *Phrack* in December 1998 and is still in the OWASP Top 10 for 2025. The researchers' demonstration, using the table above:

```python
evil = "x' OR '1'='1"
sql = f"SELECT name FROM creators WHERE name = '{evil}'"      # DANGEROUS: data pasted into SQL text
print(len(conn.execute(sql).fetchall()), "rows leaked")        # 7 rows leaked
print(len(conn.execute("SELECT name FROM creators WHERE name = ?", (evil,)).fetchall()))   # 0
```

Python's `sqlite3` documentation says to "always use placeholders instead of string formatting", and OWASP says injection "is best prevented through the use of parameterized queries" ([OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html)). Placeholders protect values only, so table and column names must come from a fixed list. The incidents are real: the Albert Gonzalez ring stole more than 170 million card numbers from 2005 to 2007, partly through SQL injection, and the CL0P gang's 2023 attack on the MOVEit file-transfer product exploited an injection flaw ([CISA advisory AA23-158A](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-158a)). The attack persists because injection is a property of how programs build strings, not of any one database.

Between your program and the database sit **drivers** and, often, **ORMs**. Microsoft's ODBC (September 1992) and Sun's JDBC (1997) gave a common call interface, and Python's DB-API (PEP 249, 1999) does the same for Python. An **object-relational mapper** (Hibernate for Java in 2001, SQLAlchemy for Python in 2006, ActiveRecord for Rails, Entity Framework) converts rows to objects, but the mismatch between objects (graphs of references) and tables (sets of tuples) invites the "N+1" trap: fetching each of seven creators' languages with its own query issued 8 statements where a single join issued 1 ([Fowler on ORM hate](https://martinfowler.com/bliki/OrmHate.html)). A **migration** is a small, ordered, version-controlled change to the schema applied the same way in every environment; Rails, Django and Alembic automate it.

### NoSQL and its aftermath: the challengers mostly got absorbed

Between 2003 and 2010 Google and Amazon published designs (the Google File System, MapReduce, Bigtable, Dynamo) for storing web-scale data across thousands of cheap machines, and open-source imitators (Hadoop, Cassandra, HBase, MongoDB, Redis) were grouped under the label "NoSQL" in 2009. The label bundled two claims, that SQL and joins are too slow and that ACID transactions are unnecessary, and both retreated. In the words of Stonebraker and Pavlo's 2024 survey, "by the end of the 2010s, almost every NoSQL DBMS added a SQL interface", many added ACID transactions, and Google itself "discarded eventual consistency in favor of real transactions with Spanner in 2012" ([Stonebraker and Pavlo, SIGMOD Record 2024](https://db.cs.cmu.edu/papers/2024/whatgoesaround-sigmodrec2024.pdf)); that source is opinionated, since Stonebraker founded Ingres, Postgres and Vertica. Independent evidence on early NoSQL durability is stark: Kyle Kingsbury's 2013 Jepsen test of MongoDB found that during a network partition, of 5,700 acknowledged writes only 3,319 survived, so **2,381 acknowledged writes were lost**, and a 2020 Jepsen report on MongoDB 4.2.6 still found it "may lose data by default" ([Jepsen 2013](https://aphyr.com/posts/284-call-me-maybe-mongodb); [Jepsen 2020](https://jepsen.io/analyses/mongodb-4.2.6)). MongoDB's default write concern is now "majority". Defaults decide durability for most users, and "web scale" claims need independent testing.

The same pattern repeats across the other challengers. Object databases of the 1990s (GemStone, ObjectStore, Versant) tied data to one programming language and were absorbed into SQL:1999's object-relational features; XML databases lost to JSON; **Hadoop** (released 2006) cratered in the 2010s, and Google announced in 2014 that MapReduce "had no place in their technology stack"; and blockchain databases are, in Stonebraker and Pavlo's words, "an inefficient technology looking for an application" (their opinion, not a measurement). The belief that "schemaless" means "no schema" fails because the schema moves into application code: the researchers stored three JSON documents in a text column, and a typo (`colour` for `color`) silently returned NULL, whereas a declared `STRICT` table rejected a text value in an integer column outright. SQL kept absorbing the challengers' best ideas: recursive queries and arrays (SQL:1999), window functions and XML (2003), JSON (2016) and property-graph queries (SQL:2023).

Analytics moved on separately, from row-store appliances such as Teradata to cloud column stores (Redshift, BigQuery, Snowflake), then to open-file "lakehouses" built on Parquet, and in 2023 to 2026 to **vector search** for AI embeddings, which PostgreSQL's pgvector extension absorbed within a year. As of September 2026, DB-Engines' popularity ranking lists Oracle, MySQL, Microsoft SQL Server, PostgreSQL, MongoDB, Snowflake, Databricks, Redis, IBM Db2 and SQLite as its top ten, with PostgreSQL the only top-four system gaining score year on year ([DB-Engines](https://db-engines.com/en/ranking)). In the 2025 Stack Overflow survey (the 2026 edition was not found), PostgreSQL is the most used database at **55.6%** of respondents, ahead of MySQL (40.5%), SQLite (37.5%) and SQL Server (30.1%) ([Stack Overflow 2025](https://survey.stackoverflow.co/2025/technology)). Both measures capture interest and self-reported use, not revenue or installations. For a returning reader the story is familiar: the 1970s CODASYL-versus-relational debate re-ran as NoSQL-versus-SQL with the same arguments ("too slow", "too rigid") and, so far, the same winner.

## 6. A matrix is a recipe for transforming space, and Python won science by wrapping Fortran-era libraries

### What a matrix is, in plain terms

A **scalar** is one number, a **vector** is a list of numbers, a **matrix** is a rectangular grid of numbers, and a **tensor**, in machine-learning code, is simply an n-dimensional grid. NumPy's own beginner guide uses exactly these names for 0-D, 1-D, 2-D and N-D arrays but warns against leaning on the mathematical terms, "because the mathematical objects with these names behave differently than arrays (e.g. 'matrix' multiplication is fundamentally different from 'array' multiplication)" ([NumPy docs](https://numpy.org/doc/stable/user/absolute_beginners.html)). In strict mathematics a tensor is a more specific, coordinate-independent object, and the ML usage borrows the word loosely. The word "matrix" was first used by James Joseph Sylvester in 1850, and Arthur Cayley's 1858 memoir gave the first abstract definition ([MacTutor](https://mathshistory.st-andrews.ac.uk/HistTopics/Matrices_and_determinants/)).

The intuition that unlocks everything else is that **a matrix is a transformation of space**. Its columns say where the unit vectors along the axes land, and multiplying a matrix by a vector takes the corresponding combination of those columns ([3Blue1Brown](https://www.3blue1brown.com/lessons/linear-transformations)). Multiplying two matrices means doing one transformation and then the other, so order matters: rotating then shearing differs from shearing then rotating. The **dot product** measures how much two vectors point the same way. The **determinant** is the factor by which the transformation scales areas (zero means space collapses onto a lower dimension). The **inverse** undoes the transformation, which exists only when the determinant is nonzero, and solving `A x = v` means applying the inverse to `v`. **Eigenvectors** are the special directions that are only stretched, not turned, and the stretch factors are the eigenvalues. One concept covers an astonishing range of work. A 3D graphics engine writes each point with four numbers so that rotation, scaling and translation are all 4×4 matrices that can be multiplied into one ([LearnOpenGL](https://learnopengl.com/Getting-started/Transformations)). Google's original PageRank "corresponds to the principal eigenvector of the normalized link matrix of the web" ([Brin and Page 1998](http://infolab.stanford.edu/~backrub/google.html)). And a neural-network layer is a matrix multiplication followed by a simple function: NVIDIA's guide calls such products "a fundamental building block" of fully connected, recurrent and convolutional layers ([NVIDIA](https://docs.nvidia.com/deeplearning/performance/dl-performance-matrix-multiplication/index.html)).

Here is the hand-checked worked example. Let A = [[1,2,3],[4,5,6]] (2 rows, 3 columns) and B = [[7,8],[9,10],[11,12]]. Entry (i,j) of A times B is the dot product of row i of A with column j of B, so the product is [[58, 64], [139, 154]]. The matrix M = [[2,1],[1,2]] has determinant 3, inverse [[0.667,-0.333],[-0.333,0.667]], eigenvalues 3 and 1 (with eigenvectors [1,1] and [1,-1]), and solving `M x = [3,3]` gives x = [1,1]. In NumPy:

```python
import numpy as np
A = np.array([[1, 2, 3], [4, 5, 6]])
B = np.array([[7, 8], [9, 10], [11, 12]])
C = A @ B                      # [[ 58,  64], [139, 154]]
M = np.array([[2, 1], [1, 2]])
np.linalg.det(M)               # about 3.0
np.linalg.inv(M)               # [[ 0.667, -0.333], [-0.333, 0.667]]
np.linalg.eigvalsh(M)          # [1., 3.]  (eigenvalues of a symmetric matrix)
np.linalg.solve(M, [3, 3])      # [1., 1.]
```

A note on verification: no Python was installed on the researchers' machine for this section, so the NumPy lines were not executed. The numbers were derived by hand and cross-checked with a separate Node.js script, so the values are reliable but the last decimal digits of `det` and `inv` are as written, not as printed. The `@` operator for matrix multiplication was added in Python 3.5 by PEP 465 (2014) ([PEP 465](https://peps.python.org/pep-0465/)). In memory a matrix is just a flat run of numbers plus metadata: C and NumPy order them row by row ("row-major"), while Fortran, MATLAB, Julia and R order them column by column, and NumPy records this as "strides" ([Harris et al., Nature 2020](https://doi.org/10.1038/s41586-020-2649-2)). Sparse matrices store only the nonzero entries, which saves almost all the memory for a ratings matrix that is 99 percent empty.

### Fortran-era libraries still sit under every matrix program

Numerical software was built in layers that still exist. Fortran (1957) numerical libraries, EISPACK (eigenvalues, 1970s) and LINPACK (linear equations, users' guide 1979), were rewritten around the **Basic Linear Algebra Subprograms**, the BLAS: level 1 for vector operations (1979), level 2 for matrix-vector (1988) and level 3 for matrix-matrix (1990) ([netlib BLAS](https://www.netlib.org/blas/)). **LAPACK** (first released 29 February 1992; latest release 3.12.1 in January 2025) reorganized the work into blocks that fit in cache because the older libraries, in the project's words, spent "too much time moving data instead of doing useful floating-point operations" ([netlib LAPACK](https://www.netlib.org/lapack/)). Every serious matrix program today ends up calling a tuned BLAS (OpenBLAS, Intel MKL, Apple Accelerate, NVIDIA cuBLAS). **MATLAB**, written by Cleve Moler in the late 1970s so that his students could use LINPACK and EISPACK "without writing Fortran programs", made the matrix the native type of an interactive language; Jack Little and Steve Bangert rewrote it in C and founded MathWorks in 1984 ([Moler](https://www.mathworks.com/company/technical-articles/the-origins-of-matlab.html)).

Python became a scientific language by wrapping those compiled libraries. Jim Hugunin's **Numeric** (1995) and its rival Numarray, which "divided the community", were unified into **NumPy** in 2005 (version 1.0 in 2006, led by Travis Oliphant); **SciPy** (2001) added optimization, sparse algebra and statistics ([Harris et al.](https://doi.org/10.1038/s41586-020-2649-2); [Virtanen et al., SciPy 1.0](https://doi.org/10.1038/s41592-019-0686-2)). In 2020 SciPy's code base was "approximately 50% Python, 25% Fortran, 20% C, 3% Cython and 2% C++", and its roadmap states the goal of removing all Fortran code ([SciPy roadmap](https://docs.scipy.org/doc/scipy/dev/roadmap-detailed.html)). NumPy 2.0 (June 2024) was "the first major release since 2006" and broke binary compatibility.

Why wrap compiled code at all? A Python loop is slow because types are dynamic and each statement is interpreted. MIT's performance-engineering course measured the multiplication of two 4096×4096 matrices on a 2.9 GHz server ([MIT 6.172, Lecture 1](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/d0c73dd51c79b95196a2e6faa824e1b4_MIT6_172F18_lec1.pdf)):

| Version | Time | Speedup over Python |
|---|---|---|
| Python, nested loops | 21,042 s (about 6 hours) | 1x |
| C, nested loops | 1,156 s | 18x |
| C with cache-friendly loop order | 178 s | 118x |
| plus compiler optimization flags | 55 s | 385x |
| plus parallel loops on 18 cores | 3.0 s | 6,921x |
| hand-written vector (AVX) instructions | 0.39 s | 53,292x |
| Intel MKL library | 0.41 s | 51,497x |

The slides caution that "you won't generally see the magnitude of performance improvement we obtained for matrix multiplication", but the pattern holds: a vectorized NumPy expression replaces a Python loop with compiled code, and in another measurement a million reciprocals took 2.91 seconds in a Python loop and 4.6 milliseconds vectorized, about 630 times faster ([VanderPlas](https://jakevdp.github.io/PythonDataScienceHandbook/02.03-computation-on-arrays-ufuncs.html)). GPUs (CUDA, 2007) and Google's TPUs (deployed since 2015) are, at heart, matrix-multiply machines, and **Julia** (announced 2012) is the main attempt to remove the "two-language problem" of prototyping in one language and rewriting in another.

### The Python packages that matter, by job

PyPI, the Python Package Index that `pip install` downloads from, served about **127.6 billion downloads** in September 2026 across roughly 932,000 projects, up 53 percent and 38 percent on September 2025 ([ClickHouse PyPI dataset query, retrieved by the researchers](https://sql-clickhouse.clickhouse.com/)). Download counts include CI systems and machines resolving dependencies, so they measure installs rather than users, and counts swing 30 to 40 percent from month to month. The top of the chart is plumbing that other packages pull in (boto3, packaging, typing-extensions, urllib3, requests), with NumPy at #23 and pandas at #40. The map by job is:

| Job | Package (what it is) | Origin and 2026 note |
|---|---|---|
| Arrays and numerics | **NumPy**, the n-dimensional array; **SciPy**; **SymPy** (symbolic math) | NumPy 802M downloads, #23; needs Python 3.12 or newer |
| Tables of data | **pandas** (the DataFrame); **Polars** (Rust); **DuckDB** (embedded analytical SQL); **PyArrow**; **Dask** | pandas begun 2008 at AQR by Wes McKinney, 547M; DuckDB and Polars up from near zero in 2021 |
| Plotting | **Matplotlib** (John Hunter, about 2002 to 2003); **Plotly**; **Altair**; **Seaborn**; **Bokeh** | Matplotlib 162M |
| Notebooks | **IPython** (Fernando Pérez, 2001); **Jupyter** (2014); **Google Colab** (2017) | 2.42 million GitHub repositories contained a notebook in 2025 |
| Classical machine learning | **scikit-learn** (first public release 1 February 2010); **XGBoost**; **LightGBM** | scikit-learn 188M |
| Deep learning | **PyTorch** (Meta, 2016); **TensorFlow** (Google, open-sourced 9 November 2015); **Keras**; **JAX** | torch 62M against TensorFlow 12M, about five to one |
| LLM era | **Hugging Face Transformers**; **LangChain**; **vLLM**; client libraries `openai` (294M) and `anthropic` (147M) | `openai` was 0.2M in September 2021 |
| Web backends | **FastAPI** (2018), **Flask** (2010), **Django** (open-sourced 2005) | FastAPI 377M, which passed Flask's 137M |
| HTTP and scraping | **requests** (Kenneth Reitz, 2011), **httpx**, **Beautiful Soup**, **Playwright**, **Selenium** | requests 1,208M |
| Data validation and databases | **pydantic**, **SQLAlchemy** (2006), **psycopg**, standard-library **sqlite3** | pydantic 843M, from 10.7M in 2021 |
| Testing and code quality | **pytest**, **coverage**, **Hypothesis**; **Ruff**, **mypy**, **Black** | pytest 780M; Ruff 301M, from 5.6M in 2023 |
| Packaging and environments | **pip**, **venv**, **conda**, **Poetry**, **uv** | uv, announced February 2024, 129M |

The pattern of 2020 to 2024 is the rewrite in a compiled language behind a Python front end: Polars, Ruff, uv and pydantic-core are written in Rust, DuckDB in C++. Their speed claims (Ruff "10-100x faster" than older linters, uv "8-10x faster than pip" uncached) are the creators' own and were not benchmarked by the researchers. Chapter 7 explains the packaging tools and why Python has so many.

### From the perceptron to open-weight models

Neural networks date to Frank Rosenblatt's perceptron (1958) and the backpropagation training rule (Rumelhart, Hinton and Williams, 1986). They became practical only when GPUs made huge matrix multiplications cheap and open Python frameworks let researchers define networks as ordinary code. In 2012 AlexNet won the ImageNet contest with a top-5 error of **15.3% against 26.2%** for the runner-up, trained for five to six days on two consumer GTX 580 GPUs ([Krizhevsky et al.](https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf)). Frameworks followed: Theano (2010, now dead), TensorFlow (2015), and PyTorch (2016), whose imperative, line-by-line style won research (69 percent of CVPR 2019 papers used it, per [The Gradient](https://thegradient.pub/state-of-ml-frameworks-2019-pytorch-dominates-research-tensorflow-dominates-industry/)). The 2017 **Transformer** paper (Vaswani et al., Google) built its architecture "solely on attention mechanisms", noting that attention is implementable "using highly optimized matrix multiplication code", which is why the design scales ([Vaswani et al.](https://arxiv.org/abs/1706.03762)). Scale then became a recipe: BERT (2018), GPT-3 (May 2020, 175 billion parameters), published scaling laws (Kaplan et al., 2020), and ChatGPT on 30 November 2022. Open-weight models (trained parameters you can download) followed: LLaMA (February 2023), Mistral 7B (September 2023, Apache-2.0), DeepSeek-R1 (January 2025, MIT) and OpenAI's gpt-oss-120b (August 2025). In plain words, **training** shows the network examples, measures the error, works out by backpropagation how each weight should change, nudges every weight a little, and repeats millions of times; **inference** freezes the weights and runs new inputs forward through the same matrix multiplications. Every layer of the stack reduces to matrix multiplication on GPUs.

### Notebooks, reproducibility and the pains of the Python stack

Notebooks, web pages that mix code cells, their output and prose, made exploratory computing the default for science and machine learning: IPython (2001), Jupyter (2014) and Colab (2017). The reproducibility record is poor. Cells can run in any order, so in a sample of 936 notebooks that could be executed in principle, **73%** "would not be reproducible with straightforward approaches" ([Wang et al., ASE 2020](https://doi.org/10.1145/3324884.3416585)); in a biomedical study of 22,578 Python notebooks tied to publications, only **879** re-ran with identical results, about 3.9 percent ([Samuel and Mietchen](https://arxiv.org/abs/2209.04308)). GitHub reports repositories containing a notebook rose from 1.4 million to 2.42 million in 2025 ([Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)). The other recurring pains are dependency and environment management and the global interpreter lock, which Python 3.14's free-threaded build is finally removing. What did not last: Numeric and Numarray, Python 2 stacks, Theano, Caffe, Lua Torch, Microsoft's CNTK, MXNet, TensorFlow 1.x graph mode, and the free Anaconda defaults for large companies.

## 7. Version control, build tools and package managers: from locking files to resolving the world's code

### Version control moved from locks to merges, and Git made branching a daily habit

**Version control** is software that records every change to a set of files, who made it and why, so any earlier state can be recovered and several people can work on the same files without overwriting each other. In your era it was the grown-up version of copying `PROJECT` to `PROJECT_OLD`, `PROJECT_OLD2` and `PROJECT_FINAL_REALLY` on a floppy. The lineage runs from single-file, lock-based tools (SCCS at Bell Labs, 1972; RCS at Purdue, 1982) to centralized "copy-modify-merge" systems: **CVS** began in 1986 as Dick Grune's shell scripts so that he and two students could cooperate on a compiler, and **Subversion** (started 2000, version 1.0 in February 2004) set out "not to break new ground" but to fix CVS ([Grune](https://dickgrune.com/Programs/CVS.orig/); [Subversion book](https://svnbook.red-bean.com/en/1.7/svn.intro.whatis.html)). The Subversion book states the basic divide: lock-modify-unlock lets only one person change a file at a time (and "Harry will lock a file and then forget about it ... And then Harry goes on vacation"), while copy-modify-merge lets everyone work privately and merges afterward, with "a human being ... responsible for making it happen correctly" ([Subversion book](https://svnbook.red-bean.com/en/1.7/svn.basic.version-control-basics.html)).

**Git** exists because of a licensing dispute. The Linux kernel had used the proprietary BitKeeper since 2002, but its maker withdrew the free version in April 2005 after Andrew Tridgell's reverse-engineering work. Linus Torvalds began Git on 3 April 2005, it was self-hosting within a day, and its first commit is dated 7 April 2005 ([Linux Foundation interview](https://www.linuxfoundation.org/blog/blog/10-years-of-git-an-interview-with-git-creator-linus-torvalds); [first commit](https://github.com/git/git/commit/e83c5163316f89bfbde7d9ab23ca2e25604af290)). Mercurial appeared on 19 April 2005; by April 2020 Bitbucket reported "almost 90% of developers use Git, while Mercurial is the least popular version control system with only about 3%" and shut Mercurial down ([Atlassian](https://www.atlassian.com/bitbucket/blog/sunsetting-mercurial-support-in-bitbucket)). The current release was Git 2.56.0 on 28 September 2026, and planned "Git 3.0" changes include `main` as the default branch and SHA-256 instead of the aging SHA-1 hash ([Git docs](https://git-scm.com/docs/BreakingChanges)). The researchers believe Git won through two things together, cheap branches and local operations plus GitHub's network effects, since Mercurial matched much of the design and still lost.

Git's model is simple to state. Where older tools store a set of files plus their changes, Git "thinks of its data more like a series of snapshots of a miniature filesystem". Everything is checksummed and referred to by a SHA-1 hash, a 40-character fingerprint that changes completely if any content changes, so tampering is detectable. Each commit points at its parent commit or commits, so history forms a graph in which arrows point only backward. A branch is "simply a lightweight movable pointer to one of these commits", as cheap as "writing 41 bytes to a file", in "sharp contrast to the way most older VCS tools branch, which involves copying all of the project's files" ([Pro Git](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)). Almost every operation is local, and every clone is a complete backup. The researchers ran this session on Git 2.54.0 on 2026-09-30; the hashes differ on every machine.

```
git init -b main hello && cd hello        # create an empty repository; the first branch is called main
git config user.name "Ada Example"        # tell Git who you are (one-time setup)
git config user.email "ada@example.com"
echo "Hello" > hello.txt                  # create a file
git add hello.txt                         # stage it: mark it for the next snapshot
git commit -m "Add hello.txt"             # take the snapshot  -> b745cf4
echo "Hello, world" > hello.txt           # edit the file
git diff                                  # shows:  -Hello  /  +Hello, world
git commit -am "Make the greeting friendlier"   # -> 297bcb4
git switch -c feature/farewell            # create and move to a new branch (a new 41-byte label)
echo "Goodbye" > bye.txt
git add bye.txt && git commit -m "Add bye.txt"          # -> 54e1d68, only on the feature branch
git switch main                           # go back to main
echo "Hello, world!" > hello.txt
git commit -am "Add exclamation mark"     # -> c53eda4; history has now diverged
git merge --no-edit feature/farewell      # combine: a merge commit with TWO parents -> 8df0382
git log --oneline --graph --all
# *   8df0382 Merge branch 'feature/farewell'
# |\
# | * 54e1d68 Add bye.txt
# * | c53eda4 Add exclamation mark
# |/
# * 297bcb4 Make the greeting friendlier
# * b745cf4 Add hello.txt
```

For a shared remote such as GitHub the extra steps are `git remote add origin <url>`, `git push -u origin main` and later `git pull`. The alternative to a merge is a **rebase**, which replays your commits on top of another branch for a straight history; the golden rule is "do not rebase commits that exist outside your repository", because it creates new commits with new hashes ([Pro Git](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)). **GitHub** (launched 10 April 2008, bought by Microsoft for $7.5 billion in 2018) turned Git into the pull-request workflow that is now the default: a proposal to merge changes, with a discussion thread, a diff view and review; its Octoverse 2025 reports "180 million-plus developers" and 43.2 million pull requests merged monthly ([Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)).

On branching, the best-cited evidence favors short-lived branches. Vincent Driessen, author of the once-dominant Git Flow model, wrote in 2020 that for continuous delivery "I would suggest to adopt a much simpler workflow", and DORA's analysis associated "three or fewer active branches" and merging to trunk at least daily with higher performance, though that is correlation, not experiment ([nvie.com](https://nvie.com/posts/a-successful-git-branching-model/); [DORA](https://dora.dev/capabilities/trunk-based-development/)). At the extremes, Google keeps most source in one **monorepo** for roughly 50,000 engineers in its own system, Piper ([Software Engineering at Google, ch. 16](https://abseil.io/resources/swe-book/html/ch16.html)).

### Build systems and the make model

A **build system** turns source into runnable artifacts and works out which steps are out of date. Stuart Feldman's `make` (Bell Labs, 1976) set the model that endures: targets, prerequisites and file timestamps. Each later generation fixed one pain: Autotools addressed portability; **Maven** (2001 to 2004) and **Gradle** (2008) addressed JVM conventions; **CMake** or Meson feeding the fast executor **Ninja** serves C and C++; **Bazel** and Buck build large monorepos correctly with hermetic, cached steps; and in front-end JavaScript, task runners gave way to webpack and then native-speed tools (esbuild, Vite). Reproducible and hermetic builds are now security tools as well as speed tools, as the SolarWinds case below shows.

### Package managers: a central archive, a resolver and a lockfile

A **package** is a bundle of code plus a manifest of its name, version and the other packages it needs; a **package manager** finds, downloads, installs and upgrades packages and, crucially, their **dependencies** (and theirs, the transitive ones); the **registry** is the server it downloads from; and a **lockfile** records the exact versions used so a later install reproduces the same result. Doug McIlroy's 1968 call for a catalog of reusable components found its answer in the Comprehensive Perl Archive Network (CPAN, online October 1995), which, in the researchers' reading, set the template of "central archive plus automatic client plus test culture" that RubyGems (2004), PyPI, npm (first release 12 January 2010) and Cargo copied. There are three layers: operating-system managers (Debian's APT, 1999; RPM, 1995; Homebrew, 2009; Windows' winget), language managers (npm, pip, Cargo, Maven, NuGet), and deployment-unit managers (Docker images, Nix, Flatpak). Docker, open-sourced in March 2013, bundles an application with its libraries and runtime into one immutable image.

| Ecosystem | Main tool | Registry size, September 2026 (query dates 2026-09-30 to 10-01) | Note |
|---|---|---|---|
| JavaScript | npm (also Yarn, pnpm, Bun) | about 4.44 million package documents | npm used by 56.8% of respondents in Stack Overflow 2025; GitHub bought npm in 2020 |
| Python | pip and PyPI (also uv, Poetry, conda) | about 0.9 million projects | pip is the PyPA's "standard tool"; uv rising fast |
| Java | Maven Central, Maven, Gradle | not retrievable | Maven 16.4%, Gradle 14.4% in Stack Overflow 2025 |
| .NET | NuGet | 492,566 package IDs | 18.9% in Stack Overflow 2025 |
| Rust | Cargo and crates.io | 343,176 crates; 465.6 billion downloads | Cargo 14.4%; the tool builds and manages dependencies |
| PHP | Composer and Packagist | 469,642 packages | created 2012 by Nils Adermann and Jordi Boggiano |
| Ruby | RubyGems and Bundler | 268.95 billion downloads | RubyGems Trusted Publishing announced 14 December 2023 |
| Go | built-in modules (Go 1.11, 2018) | proxy and checksum database since 2019 | Minimal Version Selection |

Python's packaging tells you why the field is confusing. pip arrived in 2008 (Ian Bicking), virtualenv popularized per-project environments, and the standard-library `venv` followed in Python 3.3; **conda** installs non-Python binaries such as compilers and CUDA; Poetry, PDM and Hatch added lockfiles and publishing. **uv**, announced 15 February 2024 by Charlie Marsh's company Astral, is "an extremely fast Python package installer and resolver, written in Rust", reported by its makers as 8 to 10 times faster than pip without caching, a figure the researchers did not benchmark ([Astral](https://astral.sh/blog/uv)). Python only got a standard lockfile format, `pylock.toml`, with PEP 751 in 2025, and PEP 668 now blocks `pip install` into an operating system's own Python by default because pip "can unintentionally delete packages installed by the OS package manager, potentially corrupting the entire system" ([PEP 751](https://peps.python.org/pep-0751/); [PEP 668](https://peps.python.org/pep-0668/)).

### Dependency hell: versions are a promise that tools cannot verify

On DOS and early Windows, programs shared one folder of common library files, and installing a newer copy for one program could silently break another. A 2006 thesis named this "DLL hell" ("an unmanaged global namespace being used to store shared dependencies") ([Dolstra thesis](https://edolstra.github.io/pubs/phd-thesis.pdf)). The modern remedies are per-project isolation (virtual environments, `node_modules`, containers), machine-readable version promises, and content-addressed immutable installs (Nix, Go's checksum database). **Semantic versioning**, written down by GitHub co-founder Tom Preston-Werner (2.0.0 in June 2013), says MAJOR.MINOR.PATCH, where incrementing MAJOR means incompatible API changes ([semver.org](https://semver.org/)). It is a useful but imperfect signal. Google calls it "a lossy-compression shorthand estimate for 'How risky does a human think this change is?'", and a study of 119,879 Maven Central upgrades found 83.4% complied with semantic versioning and only 7.9% of clients were affected by breaking changes ([Software Engineering at Google, ch. 21](https://abseil.io/resources/swe-book/html/ch21.html); [Ochoa et al.](https://arxiv.org/abs/2110.07889)). The hard case is the **diamond**: your code needs A and B, which need incompatible versions of C. Russ Cox showed that version selection is NP-complete, so tools use SAT solvers or special rules: Go's Minimal Version Selection picks "the maximum of all minimum version requirements" ([Cox, Version SAT](https://research.swtch.com/version-sat); [Cox, MVS](https://research.swtch.com/vgo-mvs)).

### Trust is transitive, and the supply chain is now the attack surface

Ken Thompson's 1984 Turing lecture showed a compiler that inserted a backdoor into the Unix login program and re-inserted the trick when compiling itself, so the source looked clean; his moral was "you can't trust code that you did not totally create yourself" ([Thompson 1984](https://www.cs.cmu.edu/~rdriley/487/papers/Thompson_1984_ReflectionsonTrustingTrust.pdf)). The 2019 npm study found that installing an average package "introduces an implicit trust on 79 third-party packages and 39 maintainers" ([Zimmermann et al.](https://arxiv.org/abs/1902.09217)). The incident catalogue reads as an escalation. In March 2016, a developer deleted 273 packages from npm, including the eight-line `left-pad`, and "hundreds of failures per minute" followed for about 2.5 hours ([npm blog](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm)). The SolarWinds compromise (discovered December 2020) tampered with the vendor's build so that signed Orion updates carried a backdoor; the company notified about 33,000 customers and believed fewer than 18,000 had the vulnerable installation ([SolarWinds filing](https://www.sec.gov/Archives/edgar/data/1739942/000162828020017451/swi-20201214.htm)). Log4Shell (December 2021) was a flaw in one logging library that the US Cyber Safety Review Board called "endemic", and none of the organizations the board consulted had used software bills of materials to find vulnerable deployments ([CSRB report](https://www.cisa.gov/sites/default/files/publications/CSRB-Report-on-Log4-July-11-2022_508.pdf)). The **xz** backdoor (disclosed 29 March 2024) was a patient, multi-year takeover of a one-person project through sock-puppet pressure on its burned-out maintainer; it was found by Andres Freund, who noticed ssh logins taking about 0.8 seconds instead of 0.3, not by any security scanner ([Cox's timeline](https://research.swtch.com/xz-timeline); [Freund](https://www.openwall.com/lists/oss-security/2024/03/29/4)).

The 2025 to 2026 wave is the least certain evidence in this report, because the researchers read much of it through news and security-vendor summaries rather than primary advisories. CISA's own alert is the primary source for one of them: in September 2025 the self-replicating "Shai-Hulud" worm compromised over 500 packages by stealing publishing tokens and re-publishing the victim's other packages ([CISA alert, 23 September 2025](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem)). As reported by the news outlet BleepingComputer, 2026 brought further waves, including poisoned versions of the `axios` package on 31 March (about 400 million monthly downloads, found after about three hours) and a May attack on TanStack packages that shipped "valid SLSA provenance attestations", which suggests provenance proves where something was built, not that the pipeline was uncompromised ([BleepingComputer](https://www.bleepingcomputer.com/news/security/hackers-compromise-axios-npm-package-to-drop-cross-platform-malware/); [BleepingComputer](https://www.bleepingcomputer.com/news/security/shai-hulud-attack-ships-signed-malicious-tanstack-mistral-npm-packages/)).

The responses shaped current practice. Regulation arrived: US Executive Order 14028 (12 May 2021) and the EU Cyber Resilience Act, whose reporting obligations apply from 11 September 2026. Standards followed: SBOMs (SPDX, CycloneDX), the SLSA framework, and Sigstore keyless signing. Registries hardened publishing: PyPI, RubyGems and crates.io moved to short-lived "trusted publishing" credentials, npm permanently revoked its classic tokens on 9 December 2025, and npm 12 (July 2026) blocks dependency install scripts by default, a rule GitHub said would have stopped several recent attacks ([GitHub changelog](https://github.blog/changelog/2025-12-09-npm-classic-tokens-revoked-session-based-auth-and-cli-token-management-now-available/); [npm CLI v12.0.0](https://github.com/npm/cli/releases/tag/v12.0.0)). A "cooldown" idea spread because, as BleepingComputer put it, "security tools often detect malicious npm packages within minutes": Dependabot's default delays non-security updates by three days, uv and pnpm offer release-age settings, and PyPI in July 2026 began rejecting new files uploaded to releases older than 14 days ([BleepingComputer](https://www.bleepingcomputer.com/news/security/github-pypi-add-time-absed-defenses-against-supply-chain-attacks/); [PyPI blog](https://blog.pypi.org/posts/2026-07-22-releases-now-reject-new-files-after-14-days/)).

### What the evidence says does not work

The researchers rate each of these themselves, and caution that "proven" is strong, since most evidence is incident reports rather than controlled experiments. **Floating on the newest dependency version** is strongly supported as harmful: Google notes that "a build that worked one day might be broken the next with no easy way to detect what changed" ([Software Engineering at Google, ch. 18](https://abseil.io/resources/swe-book/html/ch18.html)), and CISA's Shai-Hulud advice was to pin to versions before 16 September 2025. The supported practice is to pin exactly (lockfiles, hashes, commit hashes for CI actions), then update deliberately and with a delay; permanent pinning also fails, producing "technical lag" because patched versions are not installed. **Vendoring and forgetting** is moderately supported as a failure, since embedded forgotten copies of Log4j were expensive to find. **Deep micro-dependency trees** enlarge the attack surface, **long-lived publishing credentials and install-time code execution** are now being retired, and **treating an SBOM or provenance as a complete answer** failed in Log4j and TanStack. One popular claim is weaker than it sounds: "homegrown build systems always fail" is not supported, since Blaze/Bazel, Buck and Ninja are all homegrown at big companies. What fails is ad hoc scripts without declared dependencies and incremental builds.

## 8. Quality tooling: lint was a 1978 second opinion, and where a finding appears matters more than how clever it is

### Lint began as a slower, stricter checker for C

In 1978 Stephen C. Johnson at Bell Labs wrote **lint**, a program that "examines C source programs, detecting a number of bugs and obscurities" and enforces "the type rules of C more strictly than the C compilers" ([Johnson, "Lint, a C Program Checker"](https://wolfram.schneider.org/bsd/7thEdManVol2/lint/lint.pdf)). He made it separate because compilers must be fast and so "do not do sophisticated type checking, especially between separately compiled programs", whereas lint "takes a more global, leisurely view". That split between a quick compiler and a slower, thorough checker is still the structure of the field. Lint flagged unused variables, unreachable statements, functions that return a value on some paths and not others, and traps such as `if (x&077 == 0)`; it admitted that some questions are equivalent to the halting problem, so "most of the lint algorithms are a compromise"; and it stated the **warning-fatigue** problem exactly: messages that "might be a bug" are "acceptable only in proportion to the fraction of real bugs they uncover", or they "serve merely to clutter up the output". Rice's theorem (1951) explains why no tool escapes the trade-off: every non-trivial question about what a program does is undecidable, so a checker must be unsound (miss some bugs), imprecise (raise false alarms) or restricted (require types and annotations).

The word now covers about ten classes of tool. The researchers' taxonomy, ordered by how much each knows about the program, is below.

| Class | What it looks at | Typical catch | Examples |
|---|---|---|---|
| 1. Style and "smell" linters | text and syntax tree, one file | unused variable, `==` versus `===`, bare `except` | ESLint (2013), Pylint (2001), Ruff, RuboCop, Clippy |
| 2. Formatters | syntax tree, rewritten to one layout | indentation, line breaks, quotes | gofmt, Prettier, Black, rustfmt |
| 3. Type checkers | types across the program | wrong argument type, misuse of null | mypy, Pyright, TypeScript, Flow |
| 4. Bug-finding analyzers | data and control flow across functions | null dereference, leak, bad format string | Coverity, Infer, Clang Static Analyzer, Error Prone, `go vet` |
| 5. Security scanners (SAST) | source for exploitable patterns | SQL injection, hard-coded secrets | Bandit, Semgrep, CodeQL, SonarQube |
| 6. Dependency, license and secrets scanners | manifests, lockfiles, git history | known-vulnerable library, leaked key | Dependabot, Renovate, `npm audit`, Trivy, Gitleaks |
| 7. Complexity, duplication, architecture | metrics and dependency graph | too-complex function, copy-paste | radon, jscpd, ArchUnit |
| 8. Domain linters | one file format | unquoted shell variable, bad Dockerfile | ShellCheck, hadolint, yamllint, actionlint |
| 9. Dynamic analysis | a running program | buffer overflow, data race, crash on odd input | AddressSanitizer, Valgrind, fuzzers (libFuzzer, OSS-Fuzz) |
| 10. Formal verification | a mathematical model or whole program | design race, proof a bug class is absent | TLA+, Rocq, Lean, SPARK, seL4, Rust's borrow checker |

Formatters (class 2) are the cleanest success: because a formatter makes no claim about correctness, it cannot produce a false positive, and it ends style arguments. Go's team wrote in 2013 "never have a debate about spacing or brace position ever again!", and Google says "too much time was spent in review arguing over formatting" and "the robots are better on average than the humans by a significant amount" ([Go blog](https://go.dev/blog/gofmt); [Software Engineering at Google, ch. 8](https://abseil.io/resources/swe-book/html/ch08.html)). Type checkers have modest but real evidence behind them (the 15% figure from chapter 2), and Python's optional type hints (PEP 484, Python 3.5) come with the authors' statement that they "have no desire to ever make type hints mandatory". A recent wave of speed comes from rewriting these tools in compiled languages: vendor-reported gains include TypeScript 7.0 (8 July 2026), a native port written in Go, which cut a full build of VS Code from 125.7 to 10.6 seconds, in Microsoft's own announcement ([TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)). Dynamic tools flip the trade-off and see only code that actually ran: AddressSanitizer averages a 73% slowdown and found over 300 previously unknown bugs in Chromium ([Serebryany et al.](https://www.usenix.org/system/files/conference/atc12/atc12-final39.pdf)), and fuzzing, named after Barton Miller's 1988 class project, crashed 25 to 33 percent of the Unix utilities he tested in 1990. At the formal end, Amazon engineers used the TLA+ specification language on 10 large systems since 2011 and reported it found "subtle bugs that we are sure we would not have found by other means", including a DynamoDB data-loss scenario needing 35 steps, though they add candidly that nobody knows "that the executable code correctly implements the verified design" ([Newcombe et al., AWS](https://lamport.azurewebsites.net/tla/formal-methods-amazon.pdf)). Dijkstra's 1972 line still frames the choice: testing shows the presence of bugs, never their absence.

### The best evidence is about where and when a finding appears

Three large organizations converged on the same lessons. Coverity, which commercialized a Stanford bug finder in 2002, reported that "more than 30% [false positives] easily cause problems. People ignore the tool", and that when a tool finds more bugs than can be fixed, many companies independently "record the current bugs, don't fix them but do fix any new bugs", the practice called **baselining** ([Bessey et al., CACM 2010](https://web.stanford.edu/~engler/BLOC-coverity.pdf)). Google's attempts to use FindBugs failed three times between 2006 and 2011: a dashboard nobody used; a May 2009 company-wide "Fixit" week in which engineers reviewed 3,954 warnings, filed 1,746 bugs and saw only **640** (16 percent) fixed; and a code-review integration discontinued in 2011. What worked was Tricorder, which shows analyzer results inside code review under a rule that a check must produce "less than 10% effective false positives", and which by January 2018 analyzed about 50,000 changes a day ([Sadowski et al., CACM 2018](https://storage.googleapis.com/gweb-research2023-media/pubtools/4365.pdf)). Facebook's experiment is the most quoted data point: its Infer analyzer run as a batch job produced a fix rate "near zero", and the same analysis switched on at "diff time", as a comment during code review, saw the fix rate rocket to over 70% ([Distefano et al., CACM 2019](https://doi.org/10.1145/3338112)). Google also removed per-user settings and severity ratings after developers abandoned a tool on discovering teammates committing code that violated it.

### Testing: kinds, lineage and what the evidence supports

A **unit test** runs one small piece of code in isolation in milliseconds; an **integration test** runs real pieces together; an **end-to-end test** drives the assembled product like a user, slow and fragile but closest to reality; a **regression test** guards old behavior. More exotic kinds include **property-based** tests (state a rule such as "reversing a list twice returns the original" and let the tool generate hundreds of inputs; QuickCheck, 2000) and **mutation** tests (inject small deliberate bugs and see whether the tests notice). The **xUnit** family began with Kent Beck's SUnit for Smalltalk, and Fowler records that "JUnit was born on a flight from Zurich to the 1997 OOPSLA in Atlanta", pair-programmed by Beck and Erich Gamma "test first"; nearly every language has a port, and Python's pytest uses plain `assert` statements ([Fowler, xUnit](https://martinfowler.com/bliki/Xunit.html)).

The evidence on **test-driven development** (write a failing test, then the code, then refactor; Beck's 2002 book) is mixed. Nagappan and colleagues found pre-release defect density 40 to 90 percent lower in four industrial teams, with a 15 to 35 percent longer development time, but compared against similar projects rather than in a controlled trial ([Nagappan et al. 2008](https://doi.org/10.1007/s10664-008-9062-z)). A later study of 39 professionals found "sequencing, the order in which test and production code are written, had no important influence"; what mattered was short cycles and a steady rhythm ([Fucci et al.](https://arxiv.org/abs/1611.05994)). Rails creator David Heinemeier Hansson declared "TDD is dead" in 2014. A fair reading is that short feedback loops and writing tests with the code are supported; test-first as ritual is not.

Three more findings deserve emphasis. First, **coverage** (the share of lines tests execute) works as a diagnostic but fails as a target: Brian Marick warned in 1997 that coverage numbers "are dangerous because they're objective but incomplete", and a study of 31,000 test suites found only "a low to moderate correlation between coverage and effectiveness" once suite size was controlled, concluding coverage "should not be used as a quality target" ([Inozemtseva and Holmes 2014](https://www.cs.ubc.ca/~rtholmes/papers/icse_2014_inozemtseva.pdf)). Second, **flaky tests**, which both pass and fail on the same code, erode trust: Google reported in 2016 that about 1.5% of test runs were flaky and almost 16% of its tests had some flakiness, and in 2017 that flakiness rose with test size, from 0.5% of small tests to 14% of large ones ([Micco 2016](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html); [Listfield 2017](https://testing.googleblog.com/2017/04/where-do-our-flaky-tests-come-from.html)). That is why Google recommends a test mix of roughly 70 percent unit, 20 integration and 10 end-to-end (the "test pyramid"). Third, **code review** is less about catching defects than people assume: at Microsoft only 14 percent of 570 review comments concerned defects, with knowledge transfer, awareness and maintainability the main benefits ([Bacchelli and Bird, ICSE 2013](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ICSE202013-codereview.pdf)).

### CI/CD and DevOps: integrate daily, deploy in small, reversible steps

**Continuous integration** (CI) means each team member merges into the shared mainline at least daily, with an automated, self-testing build; Martin Fowler's article dates to September 2000 and credits colleagues at ThoughtWorks for CruiseControl, "the first CI Service" ([Fowler](https://martinfowler.com/articles/continuousIntegration.html)). Hudson became Jenkins after Oracle claimed the Hudson trademark in December 2010; GitHub Actions reached general availability on 13 November 2019. A study of 34,544 GitHub projects and 1.5 million builds found that "CI helps projects release more often" ([Hilton et al., ASE 2016](https://api.semanticscholar.org/graph/v1/paper/DOI:10.1145/2970276.2970358?fields=title,year,venue,authors,abstract,citationCount)). **Continuous delivery** (Humble and Farley, 2010) means every passing change is always releasable; its slogan is "if it hurts, do it more often, and bring the pain forward." At the extreme, the game company IMVU reported in 2009 that "on average we deploy new code fifty times a day", gated by a canary step that rolls back automatically ([Fitz](https://timothyfitz.com/2009/02/10/continuous-deployment-at-imvu-doing-the-impossible-fifty-times-a-day/)). Supporting techniques include **feature flags** (ship incomplete code switched off), **blue-green** deployment (two production environments and a router switch) and **canary** releases (roll out to a small subset first).

**DevOps**, a word from the 2009 DevOpsDays conference in Ghent, joined development with operations. The DORA research program (*Accelerate*, 2018, by Nicole Forsgren, Jez Humble and Gene Kim) tracks four key measures: lead time for changes, deployment frequency, change failure rate and time to recover. Its findings are correlational and survey-based, and DORA warns that setting them as goals invites Goodhart's law, "which leads teams to game the metrics". **Infrastructure as code** (declarative configuration files, from CFEngine in 1993 to Terraform in 2014) has its own licensing drama, told in chapter 10. **Containers** and **Kubernetes** (announced June 2014, version 1.0 on 21 July 2015, descended from Google's Borg) manage deployment units, and **observability** tools descend from Google's 2010 Dapper tracing paper. **Site Reliability Engineering**, in Google's phrase, "is what happens when you ask a software engineer to design an operations team", replacing the goal of 100 percent reliability with an error budget.

### Editors and IDEs: from vi to the language server

You remember either a line editor or an integrated environment such as Borland's Turbo Pascal (20 November 1983, $49.95, with an editor, compiler and linker in memory so that compiling was nearly instant). The terminal editors survived: vi (Bill Joy, 1976 to 1977), Emacs (MIT, 1976; GNU Emacs 1984 and 1985), and Vim (1991) with its fork Neovim (2014). Microsoft's Visual Studio began in 1997, IntelliJ IDEA and Eclipse in 2001, but the dominant tool today is **Visual Studio Code**, announced on 29 April 2015 and used by **75.9%** of respondents in Stack Overflow's 2025 survey, followed by Visual Studio (29%), IntelliJ IDEA (27.1%), Vim (24.3%) and Cursor, an AI-centered VS Code fork, at 17.9% ([Stack Overflow 2025](https://survey.stackoverflow.co/2025/technology)). The technical change that made small editors competitive is the **Language Server Protocol**, announced on 27 June 2016: language intelligence (completion, go-to-definition, diagnostics) moved out of each editor into a separate process, so M editors and N languages need only M plus N integrations ([VS Code blog](https://code.visualstudio.com/blogs/2016/06/27/common-language-protocol)).

### What worked, what failed, and how sure we are

The practices with the best evidence are automatic, show their results while the author is still working, and keep false alarms rare. The researchers' own evidence ratings, which they flag as judgments, are below.

| Practice | Evidence | Direction |
|---|---|---|
| Findings in code review or at compile time, with a false-positive budget | Strong (two large companies' production data) | Works |
| Batch or dashboard static-analysis reports | Strong (multiple failures) | Fails |
| Automatic formatting | Strong practitioner consensus, no controlled trial | Works |
| Gradual types | Moderate (15% of real bugs) | Works modestly |
| Continuous integration | Moderate (correlational, large samples) | Works |
| Test-first ordering | Weak and mixed | Neutral |
| Coverage percentage as a target | Strong against | Fails |
| Large end-to-end suites | Strong evidence of flakiness | Fails at scale |
| Memory-safe languages | Strong (production vulnerability data) | Works |
| Per-user tool settings and severity ratings | Google's experience | Fails |

## 9. Methods, evidence and failures: no method has been tested whole, but the failures are well documented

### Methodologies swing between two bets, discipline and feedback

Software methods have alternated between two bets: that projects fail for lack of up-front discipline (structured analysis, waterfall, the Capability Maturity Model) and that they fail for lack of fast feedback (spiral, Extreme Programming, Agile, DevOps). The first caution is that **no randomized trial has ever compared whole methodologies**; almost all evidence for named methods is anecdote, vendor-run survey data or correlation. The most famous method, **waterfall**, is also the most misread. Winston Royce's 1970 paper "Managing the Development of Large Software Systems", usually cited as its origin, never uses the word "waterfall". After drawing a simple analysis-coding-testing sequence he writes: "I believe in this concept, but the implementation described above is risky and invites failure", and he adds five features, among them designing before analysis, "do it twice" and involving the customer, to reduce the risk ([Royce 1970, archived copy](https://web.archive.org/web/2023/http://www-scf.usc.edu/~csci201/lectures/Lecture11/royce1970.pdf)). His son Walker Royce said his father "was always a proponent of iterative, incremental, evolutionary development"; the label "waterfall" may first appear in a 1976 paper by Bell and Thayer, according to Wikipedia ([Larman and Basili, IEEE Computer 2003](https://www.craiglarman.com/wiki/downloads/misc/history-of-iterative-larman-and-basili-ieee-computer.pdf); [Wikipedia, Waterfall model](https://en.wikipedia.org/wiki/Waterfall_model)). Iterative development is older than waterfall: NASA's Project Mercury ran time-boxed iterations in the early 1960s.

The rest of the lineage is quickly told. Barry Boehm's **spiral model** (1986 to 1988) made each loop attack the riskiest unknown. **CASE tools** (computer-aided software engineering, 1968 to the mid-1990s) promised to generate code from diagrams and died with the mainframe-centered alliance behind them. The **Capability Maturity Model** grew from a 1986 Defense-funded study at Carnegie Mellon's Software Engineering Institute and remains alive in defense and outsourcing procurement. **Extreme Programming** (Kent Beck, 1996 to 1999, from Chrysler's C3 payroll project) gave the industry continuous integration, unit tests, refactoring and user stories, though C3 itself never managed another release and DaimlerChrysler stopped it in February 2000 ([Wikipedia, C3 project](https://en.wikipedia.org/wiki/Chrysler_Comprehensive_Compensation_System)). **Agile** began when seventeen practitioners met at the Snowbird ski resort in Utah on 11 to 13 February 2001, "united against documentation driven, heavyweight software development processes", and wrote four values (individuals and interactions over processes and tools; working software over comprehensive documentation; customer collaboration over contract negotiation; responding to change over following a plan) ([Agile Manifesto history](https://agilemanifesto.org/history.html)). **DevOps** (2009), **Site Reliability Engineering** (Google, 2003) and the 2020s **platform engineering** extended iteration into operations; DORA's 2024 report found internal developer platforms raise individual productivity "however, it can also lead to decreased change stability and throughput" ([DORA 2024](https://dora.dev/research/2024/dora-report/)). Agile became a mass brand, and signatory Dave Thomas wrote in 2014 that the word "has been subverted to the point where it is effectively meaningless" ([Thomas](https://pragdave.me/thoughts/active/2014-03-04-time-to-kill-agile.html)). Be careful with adoption numbers: the best-known survey, Digital.ai's State of Agile, is run by a tooling vendor with self-selecting respondents.

### Classic ideas: the structural limits aged well, the slogans less so

The ideas that have aged best describe structural limits of people and abstraction, and none rests on controlled experiments. Fred Brooks's *The Mythical Man-Month* (1975) argued that adding people to a late project makes it later. His 1986 essay "No Silver Bullet" held that "there is no single development, in either technology or management technique, which by itself promises even one order-of-magnitude improvement within a decade", because the essence of software (complexity, conformity, changeability, invisibility) cannot be removed; he endorsed buying rather than building, prototyping because "the hardest single part of building a software system is deciding precisely what to build", and growing software incrementally ([Brooks 1986](http://worrydream.com/refs/Brooks-NoSilverBullet.pdf)). In the researchers' assessment, forty years of libraries, package managers, cloud services and high-level languages comfortably exceed a tenfold gain in aggregate, which fits his own caveat that skepticism "is not pessimism". **Conway's Law** (Melvin Conway, 1968) states that organizations "will inevitably produce a design whose structure is a copy of the organization's communication structure" ([Conway](http://www.melconway.com/Home/Committees_Paper.html)). **Hyrum's Law** says that with enough users of an API "all observable behaviors of your system will be depended on by somebody", and **Goodhart's Law** ("when a measure becomes a target, it ceases to be a good measure") explains the corruption of nearly every metric below. Eric Raymond's "given enough eyeballs, all bugs are shallow" was tested by Heartbleed, a missing bounds check that sat in the widely used OpenSSL library from December 2011 to April 2014, which shows the open model works only when someone is funded and motivated to look ([Heartbleed.com](https://heartbleed.com/)).

### Evidence versus folklore: replications mostly deflate popular claims

The most trustworthy results in software engineering are replications and randomized trials, and they have mostly deflated popular claims. Consider the **Standish "CHAOS" report**, whose 1994 headline (16% of projects successful, 53% challenged, 31% failed) has been repeated for three decades. Eveleens and Verhoef of the Vrije Universiteit Amsterdam applied Standish's own definitions to 5,457 forecasts from 1,211 real projects and found the definitions misleading and one-sided, the resulting figures meaningless: a best-in-class firm with unbiased forecasts would be rated "successful" on only 35% of its projects, while an organization that steered by the definitions overestimated its projects tenfold to a hundredfold and scored about 70% "successes" ([Eveleens and Verhoef, IEEE Software 2010](https://www.cs.vu.nl/~x/the_rise_and_fall_of_the_chaos_report_figures.pdf)). The numbers are still quoted; treat them as discredited. The "10x programmer" traces to a small 1968 experiment (about a dozen programmers, designed to compare online with offline debugging, not to measure productivity); the researchers could not retrieve the original or its critics, so details are unverified, but individual variation is real and a precise "10x" is folklore. The GitHub-wide study linking languages to defects (Ray et al., 2014: 729 projects, 17 languages) shrank on reanalysis: Berger et al. found "only four languages ... have a statistically significant association with defects, and even for those the effect size is exceedingly small" ([Berger et al.](https://arxiv.org/pdf/1901.10220)). What holds up is modest. Code review's main payoff is knowledge sharing; types would catch about one in seven public JavaScript bugs; TDD's benefit may come from small steps rather than test-first ordering; and DORA's research finds that speed and stability go together ("speed and stability are not tradeoffs"), though it is correlational, survey-based and sponsored by Google Cloud ([DORA](https://dora.dev/guides/dora-metrics-four-keys/)).

The most newsworthy randomized trial concerns AI. In 2025 METR gave 16 experienced open-source developers 246 real tasks in mature repositories, randomly allowing or forbidding AI tools; developers took **19% longer** with AI (95% confidence interval +2% to +39%), although they had forecast a 24% speedup and still believed afterward that AI had sped them up by about 20% ([METR, July 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)). METR itself says the study does not show AI fails to help most developers, and its February 2026 follow-up was inconclusive; chapter 12 returns to it. The gap between perceived and measured productivity is itself the finding.

### Famous failures share a small set of causes

The best-documented failures cluster around a few mechanisms, and official inquiries consistently blame process and organization more than individual coding errors.

| Failure | Mechanism and cost | Lesson | Source |
|---|---|---|---|
| Therac-25 (1985 to 1987) | Race conditions and removed hardware interlocks in a radiation machine, with reused software; at least six overdose accidents | reuse needs re-validation; never rely on software alone for safety | [Wikipedia](https://en.wikipedia.org/wiki/Therac-25) |
| Ariane 5 flight 501 (4 June 1996) | unprotected 64-bit float to 16-bit integer conversion in reused Ariane 4 code; identical redundant units both shut down | unvalidated reuse; identical redundancy is not diversity | [Inquiry report](https://www.ima.umn.edu/~arnold/disasters/ariane5rep.html) |
| Mars Climate Orbiter (1999) | thruster data in pound-force seconds instead of newton-seconds (a factor of 4.45); lost 23 September 1999 | check interfaces and units end to end | [NASA board](https://llis.nasa.gov/llis_lib/pdf/1009464main1_0641-mr.pdf) |
| Netscape rewrite (1998 to 2000) | decision to start over; Netscape 6 shipped nearly three years after version 4 | Spolsky: "the single worst strategic mistake" | [Spolsky](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/) |
| UK NHS National Programme for IT (2002 to 2011) | estimate grew from £2.3 billion to £12.4 billion; the National Audit Office said £2.7 billion spent "does not represent value for money" | top-down procurement, weak user involvement | [NAO](https://www.nao.org.uk/reports/the-national-programme-for-it-in-the-nhs-an-update-on-the-delivery-of-detailed-care-records-systems/) |
| Windows Longhorn (2001 to 2004) | feature creep; restarted in August 2004 from the shipping Server 2003 code base | restart from shipping code, not from scratch | [Wikipedia](https://en.wikipedia.org/wiki/Development_of_Windows_Vista) |
| Knight Capital (1 August 2012) | $460 million lost in about 45 minutes after a deployment missed one of eight servers and revived an old flag | automate deployment, delete dead code, kill switches | [SEC order](https://www.sec.gov/litigation/admin/2013/34-70694.pdf) |
| Heartbleed (April 2014) | missing bounds check in OpenSSL; about 17% of certified secure web servers believed vulnerable | memory-unsafe C in critical infrastructure with few maintainers | [heartbleed.com](https://heartbleed.com/) |
| Equifax (2017) | unpatched Apache Struts flaw; 147.9 million Americans' data stolen | asset inventory, patch verification, accountability | [House report](https://oversight.house.gov/wp-content/uploads/2018/12/Equifax-Report.pdf) |
| Boeing 737 MAX (2018, 2019) | single-sensor MCAS design; 346 dead | systems and certification failure, culture of concealment | [House report](https://democrats-transportation.house.gov/imo/media/doc/2020.09.15%20FINAL%20737%20MAX%20Report%20for%20Public%20Release.pdf) |
| CrowdStrike (19 July 2024) | 21 template fields versus 20 supplied; about 8.5 million Windows devices crashed (Microsoft's estimate) | staged rollouts even for "data" updates | [CrowdStrike RCA](https://www.crowdstrike.com/wp-content/uploads/2024/08/Channel-File-291-Incident-Root-Cause-Analysis-08.06.2024.pdf) |
| Post Office Horizon (1999 to 2015) | more than 900 subpostmasters wrongfully convicted after phantom shortfalls | institutional refusal to believe the system could be wrong | [Wikipedia](https://en.wikipedia.org/wiki/British_Post_Office_scandal) |

Where the source is Wikipedia, the researchers did not read the primary report; they flag in particular that the definitive Leveson and Turner analysis of Therac-25 was unread and that costs for Ariane 5 and Mars Climate Orbiter come from background knowledge. The Year 2000 problem is a special case: companies predicted global repair costs of $400 to 600 billion, few major failures occurred, supporters credit a decade of remediation and critics note that countries that did little also saw few problems, so the counterfactual cannot be measured ([Wikipedia, Year 2000 problem](https://en.wikipedia.org/wiki/Year_2000_problem)). Reading across the table, reuse without re-validation (Ariane 5, Therac-25) and rewrites without a shipping path (Netscape, Longhorn) are two sides of one discipline problem.

### Ideas shown not to work, and what replaced them

Three patterns recur: silver-bullet promises, proxy metrics turned into targets, and fashions applied by default. **Lines of code as a productivity measure** is discredited yet persistent; in 1982 Apple's Lisa managers asked engineers to report lines written, and Bill Atkinson, who had just made QuickDraw's region engine roughly six times faster by deleting about 2,000 lines, reported "-2000" ([Folklore.org](https://www.folklore.org/Negative_2000_Lines_Of_Code.html)). **Big-bang rewrites** failed at Netscape, Apple (Copland, cancelled August 1996), and Microsoft's Longhorn, and the replacement is incremental refactoring. **Strict single-pass waterfall** for uncertain requirements fails by Royce's own account. **Code coverage targets, story points as performance measures and DORA metrics set as goals** all fall to Goodhart's law. **Heavyweight middleware** (CORBA, EJB 2, SOAP) lost to simpler designs, as chapter 2 described. **CASE tools, round-trip UML code generation and fourth-generation languages** promised to remove programmers; CASE died, UML survives as a sketching notation, and "4GL" is now a marketing relic.

Two more recent cases are partly vendor-reported. Amazon Prime Video's tech team reported in 2023 that moving one video-monitoring service from distributed microservices back into a single process cut its cost by 90%, though this is Amazon's own claim about one internal service, and Martin Fowler's long-standing "Monolith First" advice is that "almost all the cases where I've heard of a system that was built as a microservice system from scratch, it has ended up in serious trouble" ([Prime Video, archived](https://web.archive.org/web/2023/https://www.primevideotech.com/video-streaming/scaling-up-the-prime-video-audio-video-monitoring-service-and-reducing-costs-by-90); [Fowler](https://martinfowler.com/bliki/MonolithFirst.html)). And the "no-code will replace developers" claim has recurred in every wave: COBOL's English-like syntax, 4GLs and CASE in the 1980s, rapid application development in the 1990s, low-code in the 2010s, and now AI coding assistants. Each wave widened who could build software without removing professional developers; whether AI differs is not settled by the evidence retrieved so far.

### What worked, and why

What earned lasting adoption shortens feedback, contains change, or turns failure into learning, and most of it won in practice long before research measured it. **Structured programming**, **information hiding**, **high-level languages with automatic memory management**, **version control**, **automated tests plus continuous integration**, **code review**, **open-source components and package registries** (Brooks's "buy, don't build"), **small batches and trunk-based development** (DORA: "working in small batches is an essential principle in any discipline where feedback loops are important"), **blameless post-mortems**, **static typing in large codebases**, **infrastructure as code** and **containers** all belong on the list. Research later found, more than once, that the benefit came from a different mechanism than advocates claimed: small steps rather than test-first in TDD, knowledge sharing rather than defect-finding in review. The common thread is that none requires a branded methodology.

## 10. Companies, institutions and people: labs invent, platforms capture, and foundations now hold the commons

### Three layers of organizations moved software forward

Three layers of organizations explain most of the history. **Platform vendors** of the mainframe, minicomputer and PC eras (IBM, DEC, Microsoft, Apple, Sun, Oracle) defined what programmers targeted. **Research labs** (Bell Labs, Xerox PARC) produced ideas such as Unix, C, the graphical interface, Ethernet and Smalltalk that outlived their sponsors' business models. And since about 2005, **cloud, open-source and AI-era companies** (Google, Amazon, Meta, GitHub, Docker, HashiCorp, Databricks, OpenAI, Anthropic) set tool and infrastructure standards. The pattern, in the researchers' words, is that "labs invent and others commercialize": Bell Labs gave away Unix and C because a 1956 consent decree barred AT&T from selling computers, Xerox PARC's Alto and Smalltalk reached the public through Apple, Adobe and 3Com, and Google's Borg and MapReduce papers reached the world through Kubernetes and Hadoop. A caution on evidence: the corporate histories here rest mostly on Wikipedia summaries and background knowledge, and all 2026 financial figures are "as reported" rather than checked against primary filings.

| Organization | What it contributed | Fate or status |
|---|---|---|
| IBM | FORTRAN (1957), System/360 (7 April 1964), the relational model and SQL, the IBM PC (1981), unbundling software from hardware (1969) | Thriving as a hybrid-cloud and consulting vendor; bought Red Hat ($34 billion, completed July 2019) and HashiCorp (completed 27 February 2025) |
| Bell Labs (AT&T) | Unix (1969), C, pipes, yacc, make, awk, lint, C++, UTF-8, Plan 9 | Broken up in 1984 and 1996; now Nokia Bell Labs, no longer a major software source |
| Xerox PARC | Alto (1973), Smalltalk, Ethernet, laser printer, WYSIWYG editing | Became part of SRI International in January 2024 |
| Digital Equipment (DEC) | PDP-11 (where Unix and C matured), VAX and VMS | Missed the PC and workstation waves; Compaq bought it in 1998, HP bought Compaq in 2002 |
| Microsoft | MS-DOS, Windows, Office, .NET, C#, TypeScript, VS Code; bought GitHub for $7.5 billion (completed 26 October 2018) | Thriving; large OpenAI stake (about 27 percent per the October 2025 restructuring, as reported) |
| Apple | Macintosh (1984), NeXTSTEP into macOS and iOS, the App Store (10 July 2008), Swift | Thriving; reported leadership change on 1 September 2026 |
| Sun Microsystems | NFS, SPARC, Solaris, Java | Undercut by cheap x86 and Linux; Oracle completed the purchase in January 2010 |
| Oracle | first commercial SQL database (1979), Java stewardship, Cerner | Thriving; lost Google v. Oracle 6-2 at the Supreme Court on 5 April 2021 (Google's copying of about 11,500 lines of Java API code was fair use) |
| Borland, Lotus, WordPerfect, Novell | Turbo Pascal, Lotus 1-2-3, word processing, NetWare | All lost the move to Windows to Microsoft's bundling; absorbed by IBM, Corel, Micro Focus and OpenText |
| Netscape and Mozilla | the commercial browser, JavaScript, open-sourcing in 1998 | Lost to bundled Internet Explorer; Firefox is about 3.3 percent of browser usage (July 2026, as reported) |
| Google | GFS, MapReduce, Bigtable, Spanner, Kubernetes, Go, Chrome, Android, Transformer paper | Thriving |
| Amazon Web Services | S3 and EC2 (2006): infrastructure as a metered API | Thriving; reported revenue of $128.7 billion in 2025 |
| GitHub | Git hosting, pull requests, Actions, Copilot (2021 preview) | Owned by Microsoft; Octoverse 2025 reports over 180 million developers |
| NVIDIA | GPUs and CUDA (2007), the hardware of deep learning | reported market value of $5 trillion on 29 October 2025 |

Surviving platform power in 2026 sits with Microsoft, Apple, Google, Amazon, NVIDIA and the AI labs, while IBM and Oracle persist partly by buying open-source and infrastructure franchises. If a returning reader keeps ten names for 2026, the notes recommend Bell Labs (Unix and C), IBM, Microsoft, Apple, Google, AWS, Linus Torvalds and Linux, GitHub, NVIDIA, and OpenAI with Anthropic ([Wikipedia: IBM](https://en.wikipedia.org/wiki/IBM); [Wikipedia: Bell Labs](https://en.wikipedia.org/wiki/Bell_Labs); [Wikipedia: Microsoft](https://en.wikipedia.org/wiki/Microsoft); [Wikipedia: AWS](https://en.wikipedia.org/wiki/Amazon_Web_Services)).

### Why influential firms faded, and which business models worked

Influential firms rarely died of bad technology. They lost to platform transitions they led or ignored (the GUI, the PC, the smartphone, the cloud), to **bundling** by a platform owner, to management that could not commercialize research, or to debt-funded acquisitions. Microsoft's bundling of Internet Explorer and Office shrank Netscape, Lotus, WordPerfect, Novell and Borland, and Netscape's decision to rewrite its browser cost years. Nokia's Symbian accounted for 39.18% of mobile web traffic in 2009 and 0.53% by 2016 (StatCounter), and Nokia chose Windows Phone on 11 February 2011 after its chief executive wrote that rivals "are taking our market share with an entire ecosystem" ([StatCounter](https://gs.statcounter.com/os-market-share/mobile/worldwide); [Engadget](https://www.engadget.com/2011-02-08-nokia-ceo-stephen-elop-rallies-troops-in-brutally-honest-burnin.html)). Open-sourcing late (Symbian in 2010, Solaris and Java in 2005 to 2007) did not rescue declining platforms; open-sourcing early (Linux, Apache, Kubernetes, PyTorch) built ecosystems that outlived any single sponsor. The business models that worked for developer tools are support subscriptions (Red Hat), open core (GitLab), managed cloud services, usage-priced APIs (Stripe, Twilio, AWS) and platform fees (the App Store's 30 percent commission). The recurring fight is licensing: MongoDB moved to the Server Side Public License in October 2018; Elastic did in January 2021, prompting AWS's OpenSearch fork; HashiCorp moved Terraform to the Business Source License on 10 August 2023, prompting OpenTofu; and Redis relicensed in March 2024, prompting the Valkey fork under the Linux Foundation. Redis and Elastic later added the AGPL as an option, so the pattern is: a vendor relicenses to stop cloud resellers, the cloud vendors fork under a foundation, and the vendor partly retreats ([Wikipedia: HashiCorp](https://en.wikipedia.org/wiki/HashiCorp); [Wikipedia: Redis](https://en.wikipedia.org/wiki/Redis); [Wikipedia: Elasticsearch](https://en.wikipedia.org/wiki/Elasticsearch)).

### Universities, agencies and standards bodies seeded the field

Universities and government agencies paid for and produced the first systems. ARPA funded MIT's time-sharing (CTSS, first shown in 1961), ARPANET (first message 29 October 1969) and Berkeley's BSD, whose 4.2BSD (1983) brought TCP/IP sockets to Unix. Cambridge's EDSAC gave us the subroutine library; ETH Zurich under Niklaus Wirth produced Pascal, Modula-2 and Oberon; Berkeley produced Ingres, Postgres, RISC and, later, RISC-V; Carnegie Mellon's Software Engineering Institute produced the Capability Maturity Model and the CERT Coordination Center; and CERN released the World Wide Web royalty-free on 30 April 1993 (the notes could not reach CERN's pages, so this rests on background knowledge) ([Wikipedia: ARPANET](https://en.wikipedia.org/wiki/ARPANET); [Wikipedia: BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution)). Standards bodies then turned vendor products into shared languages and protocols: ISO and ANSI committees for C and C++, Ecma's TC39 for JavaScript (from 1997), the IETF ("rough consensus and running code") for TCP/IP, HTTP and TLS, and the W3C (1994) and WHATWG (2004) for the web. The notes observe a shift from decades-long committee work toward "living standards" and de facto standards born inside companies (Kubernetes, React, the Model Context Protocol) that are then donated to foundations.

The free-software and open-source movements supplied the licensing and governance norms. Richard Stallman announced GNU on 27 September 1983, founded the Free Software Foundation in 1985, and wrote the GNU General Public License, whose "copyleft" requires derivatives to stay free; Linux supplied the missing kernel. After Netscape's 23 January 1998 announcement that its browser would be free with source code, a strategy meeting on 3 February 1998 coined "open source", and the Open Source Initiative followed ([OSI history](https://opensource.org/history)). Today governance runs through foundations: the Linux Foundation (formed 2007, hosting the Cloud Native Computing Foundation, PyTorch, OpenSSF, OpenTofu and, since December 2025, the Agentic AI Foundation), the Apache Software Foundation, the Eclipse Foundation, the Python Software Foundation and the Rust Foundation (8 February 2021) ([Wikipedia: Linux Foundation](https://en.wikipedia.org/wiki/Linux_Foundation)). Five lineages explain most of the map: Multics to Unix to BSD to NeXTSTEP to macOS and iOS (with Linux beside it); Alto and Smalltalk to the Mac, Windows and Objective-C; CERN and NCSA to Netscape, Mozilla, Apache and the W3C; Google's papers to Hadoop and Kubernetes; and the acquisition chain by which open-source franchises were absorbed (Sun to Oracle, GitHub to Microsoft, Red Hat and HashiCorp to IBM).

### The people: four waves, many of them women and non-Americans

The people who mattered fall into four waves. The founders of computing and the first languages include Ada Lovelace, Konrad Zuse, Alan Turing, John von Neumann, the six ENIAC programmers (Kay McNulty, Betty Jennings, Betty Snyder, Marlyn Wescoff, Ruth Lichterman and Frances Bilas, who programmed it by rewiring and went uncredited for decades), Maurice Wilkes, David Wheeler, Kathleen Booth, Grace Hopper, John Backus, John McCarthy, Edsger Dijkstra, Tony Hoare, Donald Knuth and Niklaus Wirth. The systems generation adds Dennis Ritchie, Ken Thompson, Brian Kernighan, Barbara Liskov, Fred Brooks, David Parnas, Edgar Codd, Leslie Lamport and Alan Kay; the PC and open-source builders are Bill Gates and Paul Allen, Steve Jobs and Steve Wozniak, Richard Stallman, Linus Torvalds and Tim Berners-Lee; and the language and practice creators include Guido van Rossum, James Gosling, Anders Hejlsberg, Brendan Eich, Larry Wall, Yukihiro Matsumoto, Rasmus Lerdorf, Kent Beck, Martin Fowler, Jeff Dean and Sanjay Ghemawat, Graydon Hoare and Rob Pike. Tony Hoare died on 5 March 2026 and Niklaus Wirth on 1 January 2024 ([Wikipedia: Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare)). The "great man" framing hides teams: FORTRAN was a 13-person team, Apollo flight software a large group under Margaret Hamilton, Unix a four-person Bell Labs group, and the ENIAC programming was done by six women. The table gives one line for each person whose work the other chapters rely on.

| Person | What the report credits them with (chapter) |
|---|---|
| Ada Lovelace | Note G (1843), a method for computing Bernoulli numbers, often called the first published program, though "first programmer" is disputed (10) |
| John von Neumann | The stored-program computer design of 1945 (1) |
| David Wheeler | EDSAC's Initial Orders, the forerunner of the assembler, and the subroutine library (1) |
| Grace Hopper | The A-0 system (1952), adviser to COBOL, and the 1955 warning against "automatic programming" hype (1, 2) |
| John Backus | Led the FORTRAN team and wrote the 1959 paper behind BNF (1) |
| John McCarthy | Lisp, 1958 to 1960 (2) |
| Edsger Dijkstra | The GOTO letter and structured programming; "The Humble Programmer" (1) |
| Tony Hoare | The null reference, quicksort, CSP and program proofs (2, 4) |
| Donald Knuth | The 1974 reply on GOTO and the warning about premature optimization (1) |
| Niklaus Wirth | Pascal, Modula-2 and Oberon; *Algorithms + Data Structures = Programs* (2, 4) |
| Dennis Ritchie, Ken Thompson | C and Unix; Thompson also co-designed UTF-8 and wrote "Reflections on Trusting Trust" (3, 4, 7) |
| Edgar Codd | The relational model of data (1970) (5) |
| Fred Brooks | *The Mythical Man-Month* and "No Silver Bullet" (9) |
| David Parnas | Information hiding (1972) (1) |
| Alan Kay | Smalltalk and the narrower meaning of "object-oriented" (2) |
| Bjarne Stroustrup | C++ and "zero-overhead abstraction" (3) |
| Richard Stallman | GNU and the General Public License (3, 10) |
| Linus Torvalds | Linux (1991) and Git (2005) (3, 7) |
| Tim Berners-Lee | The 1989 proposal for the World Wide Web (11) |
| Guido van Rossum | Python (2) |
| Brendan Eich | JavaScript (2) |
| Anders Hejlsberg | The compiler behind Turbo Pascal, then C# and .NET (2) |
| Kent Beck | Extreme Programming, SUnit and test-driven development (8, 9) |
| Michael Stonebraker | Ingres and Postgres (5) |
| Chris Lattner | LLVM and Swift (1, 2) |
| Graydon Hoare | Rust (3) |

Many of the famous stories about these people are false or simplified, and the notes flag them. Hopper did not "find the first bug": the moth taped into the Harvard Mark II logbook on 9 September 1947 was real, but she was not the finder, and engineers had said "bug" since the 1870s. "Apple and Microsoft stole the GUI from Xerox" oversimplifies a visit Apple paid for after Xerox invested in it, and PARC engineers such as Larry Tesler moved to Apple. Winston Royce did not use the word "waterfall" and warned against the model attributed to him. Keep the verified words: Thompson's 1984 lecture "Reflections on Trusting Trust", Dijkstra's "Program testing can be used to show the presence of bugs, but never their absence", and Knuth's "Beware of bugs in the above code; I have only proved it correct, not tried it" ([Wikipedia: Grace Hopper](https://en.wikipedia.org/wiki/Grace_Hopper); [EWD archive](https://www.cs.utexas.edu/~EWD/)).

## 11. Platforms: Unix descendants run almost everything, and the browser became the universal runtime

### The operating system lends the hardware safely, and Unix-family systems won everywhere except the desktop

An **operating system** (OS) owns the hardware and lends it safely to other programs through a **kernel**, **processes** with protected memory, **virtual memory**, a **file system**, **drivers** and **system calls** (the controlled doorway through which a program asks the kernel to open a file or start a process). Under DOS one program ran at a time and could write anywhere in memory; modern systems run many processes with hardware-enforced isolation, user accounts and permissions. Dennis Ritchie's history of early Unix names the pillars as "the file system, the process-control mechanism, and the idea of pipelined commands" ([Ritchie, "The Evolution of the Unix Time-sharing System"](https://www.read.seas.harvard.edu/~kohler/class/aosref/ritchie84evolution.pdf)). Almost every surviving general-purpose OS descends from, or deliberately copies, Unix: BSD, Linux, macOS (via NeXTSTEP, Mach and BSD), iOS and Android. The exception is Windows, which began as a shell over DOS (Windows 1.0, 20 November 1985), gained a protected-kernel line with Windows NT (1993, led by Dave Cutler, who came from DEC and VMS), and survived through its installed base ([Wikipedia, Microsoft](https://en.wikipedia.org/wiki/Microsoft)).

The PC origin story is worth knowing in three facts. Tim Paterson at Seattle Computer Products wrote QDOS ("Quick and Dirty Operating System") because the 16-bit CP/M was late; Microsoft licensed it in December 1980 for $25,000 and bought all rights in summer 1981 for $50,000; and PC-DOS 1.0 shipped with the IBM PC in August 1981 ([Computer History Museum](https://computerhistory.org/blog/microsoft-ms-dos-early-source-code/)). **Linux** began when Linus Torvalds announced a hobby kernel on 25 August 1991. In January 1992 Andrew Tanenbaum, author of the teaching system MINIX, posted "LINUX is obsolete": "Microkernels have won", and "writing a monolithic system in 1991 is a truly poor idea"; Torvalds conceded that "from a theoretical (and aesthetical) standpoint linux looses" but replied that "Linux wins heavily on points of being available now" ([Tanenbaum-Torvalds debate, O'Reilly](https://www.oreilly.com/openbook/opensources/book/appa.html)). In May 2025 Microsoft open-sourced the Windows Subsystem for Linux, which shows the OS war is over: Windows now competes as a friendly host for Linux workloads ([Microsoft](https://blogs.windows.com/windowsdeveloper/2025/05/19/the-windows-subsystem-for-linux-is-now-open-source/)). The numbers today: in September 2026 StatCounter has Windows at **76.36%** of desktop use, Apple's two labels together at about 16.8%, Linux at 4.54% and ChromeOS at 2.31%; W3Techs finds Unix-family systems on 92.1% of websites with a known OS; and on phones Android has 69.17% and iOS 30.81% ([StatCounter desktop](https://gs.statcounter.com/os-market-share/desktop/worldwide); [W3Techs](https://w3techs.com/technologies/overview/operating_system); [StatCounter mobile](https://gs.statcounter.com/os-market-share/mobile/worldwide)). The two sources count different things (page views versus detected servers) and say nothing about embedded devices.

### The Internet: open, simple, good-enough protocols beat official ones

The first ARPANET nodes came online in September 1969, and Steve Crocker began the Request for Comments (RFC) series that year, which is still how Internet standards are written. On 1 January 1983, the "flag day", every ARPANET host switched at once from the older NCP to **TCP/IP**, which by the network's 1990 decommissioning "had supplanted or marginalized most other wide-area computer network protocols worldwide" ([Internet Society, "A Brief History of the Internet"](https://www.internetsociety.org/internet/history-internet/brief-history-internet/)). IP delivers packets on a best-effort basis; TCP builds a reliable, ordered stream on top; and the Domain Name System (1983 to 1984) replaced a single hand-maintained host file. The ISO's seven-layer OSI stack, IBM's SNA, DEC's DECnet and X.25 were more "official" but lost, because TCP/IP was free, simple and already running, in the spirit of the IETF motto "rough consensus and running code".

The **World Wide Web** added three small inventions: the URL (a text address), HTTP (the request-and-response conversation) and HTML (tagged text with links). Tim Berners-Lee's March 1989 CERN proposal argued that "a 'web' of notes with links ... is far more useful than a fixed hierarchical system"; the first server ran on a NeXT computer in November 1990; NCSA released Mosaic in February 1993; CERN declared the technology free for anyone on 30 April 1993; and the W3C was founded on 1 October 1994 ([W3C, "A Little History of the World Wide Web"](https://www.w3.org/History.html)). Today the newest transport, HTTP/3 over the UDP-based QUIC protocol, is used by 40.8% of all websites ([W3Techs, October 2026](https://w3techs.com/technologies/details/ce-http3)). For programmers the day-to-day change is that you call any machine on Earth by name over HTTPS with a few lines of code. API styles followed the same rule of the simple beating the elaborate: Roy Fielding's 2000 dissertation described REST as the architecture that let the Web scale ([Fielding](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)), and in practice industry "REST" means JSON over HTTP, which displaced the heavyweight SOAP and WS-* family because they were verbose, hard to debug and vendor-driven.

### The web stack: the browser is the most widely deployed runtime ever

A page is built from HTML (structure), CSS (appearance) and JavaScript (behavior, acting through the **DOM**, the browser's in-memory tree of the page), so a program is split into a front end in the browser and a back end on a server. The server side moved from CGI scripts (1993) to PHP, ASP and JSP, to MVC frameworks (Rails, July 2004; Django, 2005), to the AJAX pattern named in February 2005, to JavaScript single-page apps (React, 2013), and in the 2020s partly back to server rendering ("islands", HTMX). What runs the visible web differs from what developers say they like. PHP is used by **69.8%** of websites whose server-side language is known, WordPress runs 40.2% of all websites, and JavaScript overtook Ruby in July 2026 as the second most used server-side language ([W3Techs, 1 October 2026](https://w3techs.com/technologies/overview/programming_language)). In Stack Overflow's 2025 survey Node.js (48.7%) and React (44.7%) lead, with Next.js at 20.8%, Angular 18.2%, Vue 17.6% and FastAPI 14.8% ([Stack Overflow 2025](https://survey.stackoverflow.co/2025/technology)).

Technologies that depended on a single vendor's plugin all lost to features built into every browser (chapter 2 lists Java applets, Flash and Silverlight). The replacement portable target is **WebAssembly**, a binary format for a stack-based virtual machine whose Wasm 3.0 standard was announced complete on 17 September 2025, adding 64-bit memory, garbage collection and tail calls ([WebAssembly.org](https://webassembly.org/news/2025-09-17-wasm-3.0/)). Browser share in September 2026 is Chrome 66.36%, Safari 18.27%, Edge 6.04%, Firefox 2.80%, Samsung Internet 2.31% and Opera 1.77%; because Chrome, Edge, Samsung and Opera all use Google's Blink engine, the Chromium family is about 76.5% by the researchers' sum, so the "browser monoculture" worry of the Internet Explorer era has returned in new form ([StatCounter](https://gs.statcounter.com/browser-market-share)).

### Cloud and containers: renting computing by the hour

NIST's 2011 definition describes **cloud computing** as "a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources ... that can be rapidly provisioned and released with minimal management effort" ([NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final)). Infrastructure as a Service rents virtual machines, Platform as a Service rents a runtime to which you upload code, Software as a Service rents finished applications, and "serverless" runs one function per event. A virtual machine emulates a whole computer; a **container** is an ordinary process that the Linux kernel isolates, so it starts in under a second. Amazon launched S3 in March 2006 and EC2 in August 2006 ([Wikipedia, AWS](https://en.wikipedia.org/wiki/Amazon_Web_Services)). **Docker** was unveiled at PyCon in March 2013 and made containers easy to package and ship ([Wikipedia, Docker](https://en.wikipedia.org/wiki/Docker_(software))); Google's **Kubernetes**, descended from its internal Borg system, had its first commit on 6 June 2014 and version 1.0 in July 2015, and won through neutrality, because Google gave it to a foundation and every vendor could host it ([Kubernetes, "10 Years of Kubernetes"](https://kubernetes.io/blog/2024/06/06/10-years-of-kubernetes/)). In the third quarter of 2025 Amazon, Microsoft and Google together held 63% of a $106.9 billion quarter of cloud infrastructure spending, per Synergy Research ([Synergy](https://www.srgresearch.com/articles/cloud-market-share-trends-big-three-together-hold-63-while-oracle-and-the-neoclouds-inch-higher)).

Programmers now describe infrastructure in code (YAML, Terraform), package apps as container images and deploy through pipelines, and the 2023 to 2025 reassessment says the cloud is a tool, not a default. David Heinemeier Hansson reported that 37signals left the cloud after a $3.2 million annual cloud budget, expecting savings of "at least $1.5 million per year", while conceding that the cloud suits early-stage companies and highly variable workloads ([DHH, "We have left the cloud"](https://world.hey.com/dhh/we-have-left-the-cloud-251760fb)). Chapter 9 covers the Prime Video case.

### Mobile: two platforms, gated by stores

Before 2007 "smart" phones ran Symbian, Palm OS, Windows Mobile or BlackBerry OS, with stylus or keyboard and a thin mobile-web layer (WAP, J2ME). Apple announced the iPhone on 9 January 2007; at first it offered only web apps, and a native SDK followed in 2008. The **App Store** opened on 10 July 2008, and Apple reported "more than 10 million" downloads and over 800 native apps in its first weekend; Android's first phone shipped in October 2008 ([Apple, 14 July 2008](https://www.apple.com/newsroom/2008/07/14iPhone-App-Store-Downloads-Top-10-Million-in-First-Weekend/)). The result is a duopoly in which native apps are written in Swift or Kotlin, or with cross-platform toolkits. Platform failures follow one loop: a platform needs apps, apps need users, and latecomers could not break it. Large incumbents lost this war: Symbian's share of mobile web traffic fell from 39.18% in 2009 to 0.53% by 2016, BlackBerry OS from 17.64% in 2010 to 0.11% in 2018, and Nokia's chief executive wrote in February 2011 that rivals "are taking our market share with an entire ecosystem" ([StatCounter](https://gs.statcounter.com/os-market-share/mobile/worldwide); [Engadget on the Elop memo](https://www.engadget.com/2011-02-08-nokia-ceo-stephen-elop-rallies-troops-in-brutally-honest-burnin.html)).

### Security habits every developer now needs

For an application programmer security comes down to a few habits: authenticate (prove who is calling), authorize (check what they may do), encrypt traffic (TLS 1.3, 2018), never trust input, avoid or contain memory-unsafe code, keep secrets out of source code, and design as if the network were hostile ("zero trust"). The OWASP Top 10:2025 puts **Broken Access Control** first, "Software Supply Chain Failures" third and Injection fifth ([OWASP](https://top10.owasp.org/2025/)). Recurring causes show in dated incidents: the Morris worm (2 November 1988) exploited a buffer overflow in a Unix service, and SQL Slammer (25 January 2003) "doubled in size every 8.5 seconds" and infected most vulnerable machines within ten minutes using a single UDP packet against a buffer overflow in Microsoft SQL Server ([CAIDA](https://www.caida.org/catalog/papers/2003_sapphire/)); Heartbleed and Log4Shell appear in earlier chapters. The pattern is a small, widely deployed component with deep privileges becoming a global single point of failure, so dependency inventory and fast patching are security controls.

### Hardware shifts, and what won and lost

Hardware changed the programmer's job in three ways. Clock speeds stopped rising around 2004, so chips added cores and concurrency became everyday work (chapter 4); GPUs and CUDA became general parallel engines (chapter 6); and the processor itself stopped being one thing. Arm designs, which dominate phones, reached Macs when Apple announced on 22 June 2020 its move from Intel, with the M1 shipping in November 2020; RISC-V, open and royalty-free since 2010, is strong in microcontrollers. One program may now touch x86 or Arm cores, a GPU and a WebAssembly sandbox.

Six forces explain most platform outcomes: open specifications with free implementations beat licensed ones; simple, inspectable, text-based formats beat elaborate ones (Richard Gabriel's "worse is better"); backward compatibility beats clean-slate redesign (HTML5 over XHTML 2, AMD's 64-bit extension over Itanium); applications create platform winners (iOS and Android over Windows Phone); single-vendor control invites rebellion (Flash, Silverlight); and commodity economics beat bespoke hardware. Failures were rarely technical. CORBA, OS/2 and Windows Phone each worked, and each lost on ecosystem, governance or timing.

## 12. What is popular now, and what AI has changed so far

### No single "most popular language": each ranking counts something different

The September 2026 TIOBE index puts Python first at **17.76%**, followed by C (10.28%), C++ (8.67%), Java (7.54%), C# (4.22%), JavaScript (2.76%), Visual Basic (2.55%), SQL (2.16%), R (1.69%) and Rust (1.34%); Perl and Ruby left the top 20, while Ada and Objective-C re-entered it ([TIOBE](https://www.tiobe.com/tiobe-index/)). TIOBE counts search-engine queries about "skilled engineers, courses and third party vendors", and says it "is not about the best programming language or the language in which most lines of code have been written". Python's rating fell 8.22 points in a year while its rank held, and the researchers did not find TIOBE's own explanation. The other rankings tell different stories. Stack Overflow's 2025 survey of over 49,000 developers has JavaScript at 66%, HTML/CSS 61.9%, SQL 58.6%, Python 57.9%, Bash/Shell 48.7% and TypeScript 43.6% ([Stack Overflow 2025](https://survey.stackoverflow.co/2025/technology)). GitHub's Octoverse 2025 reports that in August 2025 TypeScript overtook Python and JavaScript as the language with the most monthly contributors (2,636,006), and GitHub itself offers the interpretation that "typed contracts scale AI-assisted teams" ([Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)). RedMonk's January 2026 list, which correlates GitHub pull requests with Stack Overflow tags, runs JavaScript, Python, Java, then PHP tied with C#, with TypeScript sixth, and admits both data sources have grown less representative ([RedMonk](https://redmonk.com/sogrady/2026/04/14/language-rankings-1-26/)). The stable picture is that Python and JavaScript/TypeScript, Java, C#, PHP and SQL are the application tier, with C and C++ underneath, and that a careful reader always quotes the metric with the ranking. A returning programmer will also find familiar names still on the board: Visual Basic, Delphi, Fortran, Ada, COBOL and Assembly are all in TIOBE's top 20.

For tools, the 2025 Stack Overflow survey gives a snapshot of what working developers use: Visual Studio Code (75.9%), Docker (71.1%), npm (56.8%), PostgreSQL (55.6%) and AWS (43.3%). Developers say they most admire Rust (72.4%, as a language) and the Rust-written Python package manager uv (74.2%). The Cloud Native Computing Foundation's January 2026 survey reports "82% of container users running Kubernetes in production", though its base is container users among CNCF-community respondents, not all companies ([CNCF](https://www.cncf.io/reports/the-cncf-annual-cloud-native-survey/)). Every one of these samples is self-selected, and the researchers flag that Stack Overflow's survey over-represents English-speaking web and cloud developers.

### AI-assisted programming moved from autocomplete to agents in five years

The timeline is short. Before large language models, editors offered statistical completion (Microsoft's IntelliSense is commonly dated to 1996 to 1997, an unverified date). GitHub announced **Copilot** as a technical preview on 29 June 2021, built on OpenAI's Codex model, and made it a paid service on 21 June 2022 at $10 a month, claiming "nearly 40% of code is being written by GitHub Copilot in popular coding languages, like Python", a vendor figure about files where Copilot was active ([GitHub blog](https://github.blog/news-insights/product-news/github-copilot-is-generally-available-to-all-developers/)). ChatGPT launched on 30 November 2022. Then came benchmarks on real work. The SWE-bench paper (10 October 2023) assembled 2,294 tasks from real GitHub issues in 12 Python repositories, and the best model resolved only **1.96%** of them ([Jimenez et al.](https://arxiv.org/abs/2310.06770)). Cognition's Devin reported 13.86% on a subset in March 2024 ([Cognition](https://cognition.com/blog/introducing-devin)), and Anthropic's Claude 3.7 Sonnet scored 63.7% on the human-validated SWE-bench Verified in February 2025, launching Claude Code as a research preview that can "search and read code, edit files, write and run tests, commit and push code to GitHub" ([Anthropic](https://www.anthropic.com/news/claude-3-7-sonnet)). Scale AI's harder SWE-Bench Pro, built from 41 professional repositories to counter data contamination (models memorizing solutions), is described in Scale's own text as "around 23%" for top models on its public set against "70%+" on SWE-Bench Verified, while the leaderboard snapshot retrieved shows top entries around 61% ([Scale](https://labs.scale.com/leaderboard/swe_bench_pro_public)). Benchmark authors themselves warn about contamination and realism limits, so the scores show direction, not capability on your codebase.

Shared plumbing followed. Anthropic introduced the **Model Context Protocol** (MCP), "an open standard that enables developers to build secure, two-way connections between their data sources and AI-powered tools", on 25 November 2024 ([Anthropic](https://www.anthropic.com/news/model-context-protocol)); Google announced an Agent2Agent protocol with more than 50 partners on 9 April 2025 ([Google Developers Blog](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)); and the AGENTS.md convention ("a README for agents") is reported to be used by more than 60,000 open-source projects, with MCP and AGENTS.md placed under a Linux Foundation fund, the Agentic AI Foundation, in December 2025 ([agents.md](https://agents.md/)). The researchers see these as resembling the Language Server Protocol: neutral, shared plumbing rather than lock-in. In 2025 the label "vibe coding" arrived: Andrej Karpathy's 2 February 2025 post described building with an AI while forgetting "that the code even exists", and Simon Willison's distinction is that code you have reviewed, tested and could explain to someone else is ordinary software development, whatever tool wrote it ([Willison](https://simonwillison.net/2025/Mar/19/vibe-coding/)). GitHub's Octoverse reports that coding agents opened more than 1 million pull requests between May and September 2025 and that 80% of new GitHub developers used Copilot in their first week. As reported for 2026, ownership of developer tools is moving to AI labs: Astral, maker of uv and Ruff, announced on 19 March 2026 that it "has entered into an agreement to join OpenAI as part of the Codex team", and Anthropic announced the acquisition of the Bun runtime in December 2025 ([Astral](https://astral.sh/blog/openai); [Anthropic](https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone)). A disclosure is due here: the researchers and the author of this report are Claude models made by Anthropic, so Anthropic-related items deserve the usual skepticism toward self-interested sources.

### The evidence on effects is mixed, and vendors produced much of it

The best-designed evidence is thin and conflicting. A 2022 GitHub and Microsoft experiment with 95 developers writing an HTTP server in JavaScript found the Copilot group finished **55% faster** (1 hour 11 minutes against 2 hours 41 minutes), a small, vendor-run, greenfield task ([GitHub](https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/)). METR's 2025 randomized trial of experienced open-source developers in their own mature repositories found AI-allowed tasks took **19% longer**, though the developers believed AI had sped them up by 20%, as chapter 9 described; METR's February 2026 follow-up produced estimates pointing the other way (returning developers about 18% less time, with a wide confidence interval from -38% to +9%) but concluded "our data is only very weak evidence for the size of this increase", because developers increasingly refused to work without AI and withheld tasks they wanted AI for ([METR, Feb 2026](https://metr.org/blog/2026-02-24-uplift-update/)). The 2025 DORA report found 90% of respondents use AI at work and more than 80% believe it raised their productivity, with AI now associated with higher throughput but still with lower delivery stability: "AI doesn't fix a team; it amplifies what's already there" ([Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report)). Reconciling the results, the researchers argue that large speedups appear on small, well-specified greenfield tasks and for less experienced developers, while slowdowns or small effects appear for experts in large codebases they know well, where reviewing and fixing AI output costs more than it saves; and perception is a poor measuring instrument.

On quality and security, the cautionary studies mostly come from vendors with commercial interests, and none is a randomized trial. Veracode's report found "AI-generated code introduced risky security flaws in 45% of tests" across more than 100 models and that "larger, newer AI models didn't improve security"; GitClear's analysis of 211 million changed lines reported copy-pasted lines rising from 8.3% to 12.3% and refactoring falling from about 25% to under 10% of changes between 2021 and 2024, which shows correlation with the AI era, not cause; and CodeRabbit, reported via Wikipedia, found AI co-authored code had about 1.7 times more major issues ([Veracode](https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/); [GitClear](https://www.gitclear.com/ai_assistant_code_quality_2025_research); [Wikipedia, vibe coding](https://en.wikipedia.org/wiki/Vibe_coding)). Trust is falling even as use rises: Stack Overflow's 2025 survey found 84% of respondents use or plan to use AI tools (76% in 2024) and 51% of professionals use them daily, yet 46% distrust the accuracy of the output against 33% who trust it, and 66% say the output is "almost right, but not quite" ([Stack Overflow 2025 AI](https://survey.stackoverflow.co/2025/ai)). Maintainers are bearing costs: curl's Daniel Stenberg reported in July 2025 that about 20% of that year's bug-bounty submissions were AI-generated "slop", with only about 5% genuine vulnerabilities ([Stenberg](https://daniel.haxx.se/blog/2025/07/14/death-by-a-thousand-slops/)). On jobs, the sources are mixed. The US Bureau of Labor Statistics reports a median pay of $135,980 for software developers in May 2025 and projects 10% growth from 2025 to 2035, but its projections are model-based and cannot observe 2026 AI effects ([BLS](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm)); JetBrains found 61% of junior and 54% of senior developers call the job market challenging; and Stack Overflow found only 24.5% of developers are happy at their current job. A Stanford payroll study, which the researchers could only recall from background knowledge, reported a roughly 13% fall in early-career employment in AI-exposed jobs ([Stanford Digital Economy Lab](https://digitaleconomy.stanford.edu/wp-content/uploads/2025/08/Canaries_BrynjolfssonChandarChen.pdf)); none of these sources can separate AI from interest rates and post-pandemic overhiring.

### Emerging practices are old discipline applied to a fast, fallible collaborator

The practices that have settled are traditional engineering habits. Give the agent a check it can run (tests, a build, a screenshot), because Anthropic's own documentation says that is "the difference between a session you watch and one you walk away from". Plan before coding. Keep standing instructions in a short repository file (AGENTS.md or CLAUDE.md), pruned like code, since "bloated CLAUDE.md files cause Claude to ignore your actual instructions". Run agents with limited permissions inside a sandbox, because after about ten approvals a human is "clicking through rather than reviewing", which is pushing tools toward classifier-based "auto" modes. Review results in a fresh context. Spec-driven development, where a written specification becomes "the shared source of truth", arrived with GitHub's Spec Kit on 2 September 2025. The main security worry is Willison's "lethal trifecta": an agent that can read private data, is exposed to untrusted content and can communicate externally can be steered by prompt injection into leaking data ([Claude Code docs](https://code.claude.com/docs/en/best-practices); [Willison, 2025 in LLMs](https://simonwillison.net/2025/Dec/31/the-year-in-llms/)). The honest caveat is that most of this guidance comes from tool vendors and practitioners' blogs; the researchers found no independent trial showing instruction files or spec-first workflows improve outcomes, so treat them as sensible conventions, not proven effects. Chapter 8's lesson applies unchanged: a check run where the author still works beats a report read later.

### New languages and tools: what looks durable, and what is unproven

The durable core is Python (3.14, released 7 October 2025, has an officially supported free-threaded build), TypeScript (7.0, a native port in Go, released 8 July 2026 and "often about 10 times faster"), Rust and Go, PostgreSQL and SQLite, and Docker and Kubernetes ([TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)). A pattern runs through the 2020s: the tools that make feedback loops fast (compilers, package managers, linters, test runners) are being rewritten in Rust, Go or Zig, a change reinforced because agents run those tools thousands of times. Promising but unproven items include Mojo (a Python-like language for GPU and AI work, which Modular says reached 1.0 on 11 August 2026 and whose compiler was open-sourced on 18 August 2026, per [Modular's blog](https://www.modular.com/blog); no adoption survey exists yet), Zig, Gleam, Carbon and WebAssembly components. Ownership is a new risk factor: Astral under OpenAI, and the relicensing forks of chapter 10, show that open-source tools can change hands quickly. Adoption signals are strongest where several independent surveys agree (Python, TypeScript, PostgreSQL, Docker, Kubernetes, uv, Cargo) and weakest for 2026 launches, which have release facts but no usage data.

### Regulation and culture: software is now a regulated product

Software is regulated like other products. The EU Cyber Resilience Act entered into force on 10 December 2024, its reporting obligations began on 11 September 2026 and its full requirements apply from 11 December 2027 ([European Commission](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act)). The EU AI Act, in force since 1 August 2024, phases in obligations through 2027 and 2028, with its high-risk rules for Annex III systems now delayed to 2 December 2027 ([AI Act timeline](https://artificialintelligenceact.eu/implementation-timeline/)). Delivery culture (trunk-based development, feature flags, observability, platform engineering) is studied by DORA, which says 90% of organizations have adopted at least one internal platform.

## What you will recognize at once, and what will surprise you

A returning programmer will recognize the vocabulary and the arguments but not the economics: software is now free to copy, mostly open source and delivered continuously instead of on disks. The first table lists what has barely moved, and the second what has changed most.

| Still familiar | Where to read more |
|---|---|
| C is second and C++ third on TIOBE, Java and C# fourth and fifth, and Visual Basic, Delphi, Fortran, Ada, COBOL and assembly are all still in the top 20 ([TIOBE](https://www.tiobe.com/tiobe-index/)) | Chapters 2 and 3 |
| SQL and relational databases remain the default, and PostgreSQL is used by 55.6% of Stack Overflow respondents | Chapter 5 |
| The Unix shell, pipes, regular expressions, vi and Emacs are still daily tools; 48.7% of respondents use Bash or shell | Chapters 2, 8 and 11 |
| Compilers still lex, parse, optimize and generate code, and C's pointers, manual memory and undefined behavior behave as you remember | Chapters 1 and 3 |
| Zero-based arrays, linked lists, hash tables, Big-O and sorting are the same ideas | Chapter 4 |
| COBOL (banking and government) and Fortran (numerical computing) are still in use, though no audited figure says how much COBOL runs | Chapters 2 and 6 |
| Brooks's 1986 claim that no single "silver bullet" gives a tenfold gain is the argument now being fought over AI | Chapters 9 and 12 |

| Surprising | Where to read more |
|---|---|
| Free and open source is the default: Visual Studio Code, which is free, is used by 75.9% of respondents, and GitHub reports more than 180 million developers and 43.2 million pull requests merged a month ([Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)) | Chapters 7, 8 and 12 |
| Python, begun as a Christmas-week hobby project in 1989, is now first; JavaScript left the browser, and TypeScript is GitHub's top language by contributors | Chapter 2 |
| Programs are assembled from third-party packages and attacked through them (left-pad, SolarWinds, Log4Shell, xz, Shai-Hulud) | Chapter 7 |
| Version control is distributed, branches are nearly free and a pull request is the unit of review | Chapter 7 |
| Memory safety is a policy issue: Android's memory-safety bugs fell from 76% of its vulnerabilities to under 20% as new code moved to Rust | Chapter 3 |
| Tests and continuous integration run on every change, and some teams deploy dozens of times a day | Chapter 8 |
| You rent computing by the hour, containers package programs, and three providers hold 63% of cloud spending | Chapter 11 |
| Two phone platforms, Android and iOS, sit behind app stores; Symbian and BlackBerry OS are gone | Chapter 11 |
| Text is not bytes: Unicode and UTF-8 make "length" ambiguous, and 0.1 plus 0.2 is not 0.3 in binary floating point | Chapter 4 |
| Matrices are the engine of machine learning, and Python wins numerics by wrapping Fortran-era libraries | Chapter 6 |
| Many famous statistics were deflated by replication, among them the Standish failure rates, the "10x programmer" and the language-versus-defects study | Chapter 9 |
| Software is regulated like other products: the EU Cyber Resilience Act's reporting duties started on 11 September 2026 | Chapters 7 and 12 |
| AI assistants and agents write code, with a measured 19% slowdown for experts in one trial and falling trust | Chapter 12 |

## How far to trust this report: what is verified, what is reported, and what is folklore

This report synthesizes twelve research notes written by Claude agents ("the researchers") on 30 September and 1 October 2026. The researchers ran the code listings shown here on real compilers and interpreters, with two exceptions: the CODASYL pseudo-code in chapter 5 is an illustration taken from Wikipedia, and the NumPy example in chapter 6 was not executed because no Python was installed on that machine, so its values were derived by hand and cross-checked with a Node.js script and its last decimal digits are as written, not as printed. Facts the notes marked as verified from a retrieved source are given plainly with that source; facts that rest on Wikipedia, a secondary summary or the researchers' background knowledge are flagged where they matter. The researchers and the author of this report are Claude models made by Anthropic, and a few items concern Anthropic (Claude Code, the Model Context Protocol, the Bun acquisition), so treat those with the usual caution about self-interested sources.

Several cautions deserve repeating in plain words. There is **no audited figure** for how much COBOL runs: IBM's percentages trace to a 2023 magazine article (chapter 2). Winston Royce's 1970 paper, the supposed origin of "waterfall", **never uses the word** (chapter 9). Sources **disagree on when BSD began**, 1976 or 1978 (chapter 3), and on priority claims, such as Kathleen Booth's notation versus Wheeler's assembler, Glennie's Autocode versus Hopper's A-0, and Backus's memory of a 30,000-instruction compiler against the paper's 24,000 (chapter 1). **Items dated 2026** (TypeScript 7.0, Mojo 1.0, npm 12, the 2026 supply-chain incidents, current model names) were read through fetch tools that summarize pages, or through secondary summaries, so they appear as "reported", not audited. **Popularity rankings** measure different things: TIOBE counts search-engine queries, Stack Overflow's survey is a self-selected sample, Octoverse counts GitHub contributors, and RedMonk correlates pull requests with Stack Overflow tags (chapter 12). **Vendor figures**, such as the speedups claimed for Ruff and uv or Copilot's "nearly 40%" of code, are the vendors' own. **No randomized trial has compared whole methodologies**, and the best-known AI trial (METR's) involved 16 developers, with a follow-up its authors call only "very weak evidence" (chapters 9 and 12). Where a figure carries a date and a metric, quote both; where it does not, check it before relying on it.

## Conclusion: the winners kept feedback short and the past compatible

Reading across the twelve chapters, one pattern predicts outcomes better than any single technology. What won was cheap to try, kept old code working and shortened the time between a mistake and its discovery: FORTRAN's optimizing compiler, SQL's declarative queries, Unix pipes, TCP/IP over OSI, Git, containers and continuous integration. What lost demanded replacing everything at once or added complexity without matching benefit: PL/I, the Fifth Generation project, Itanium, big-bang rewrites and CORBA. The same test is the sharpest way to read the AI era. Its tools fit the winning pattern when they sit inside a verification loop (a test the agent can run, review before merging, least privilege), and they fit the losing pattern when they are sold as a way to skip the loop, which is Hopper's 1955 warning about "write my payroll checks" in new clothes.

A returning programmer's advantage is that the failure modes are old: reuse without re-validation (Ariane 5, Therac-25), metrics turned into targets, and perception outrunning measurement (the METR developers who felt 20% faster while measuring 19% slower) all predate the web. The quickest way to absorb the new workflow, offered as a suggestion rather than a tested method, is to build one small program that touches every layer in this report: a Python or C program, a SQLite table, a Git history, a package manager, a linter and a test run in continuous integration, and then to ask an assistant to change it and see what your checks catch.

## Appendix: glossary of terms used in this report

| Term | Plain meaning (chapter) |
|---|---|
| ABI | The binary calling convention that lets compiled code from different languages call one another (3) |
| ACID | Atomicity, consistency, isolation, durability: the four guarantees of a database transaction (5) |
| Agent (AI) | A model that reads a codebase, runs commands and tests, and proposes changes with limited human steps (12) |
| Agile | Iterative methods named by the 2001 Manifesto, valuing working software, collaboration and responding to change (9) |
| Array | A fixed run of same-typed elements, indexed from 0 in C and Python (3, 4) |
| Assembler | Program that turns assembly language, readable names for machine instructions, into machine code (1) |
| Big-O | Notation for how a method's work grows as its input grows (4) |
| BLAS, LAPACK | Standard Fortran-era libraries of vector and matrix routines under almost all numerical code (6) |
| Branch | A movable pointer to a commit in Git; creating one is nearly free (7) |
| Bytecode | A compact instruction list for an imaginary computer, run by a virtual machine (1) |
| Compiler | Translates a high-level language into assembly, machine code or bytecode (1) |
| Container | An ordinary process isolated by the Linux kernel, packaged with its libraries (11) |
| Continuous integration (CI) | Merging into the mainline at least daily, with an automated, self-testing build (8) |
| Conway's law | A system's design copies the communication structure of the organization that builds it (9) |
| Coverage | The share of code lines that tests execute; a diagnostic, not a target (8) |
| Dependency | A package your code needs; transitive dependencies are those your dependencies need (7) |
| DevOps, DORA | Joining development with operations; DORA is the research program measuring delivery speed and stability (8) |
| Floating point | The IEEE 754 binary format for fractional numbers; 0.1 cannot be represented exactly (4) |
| Formatter | A tool that rewrites code to one layout, ending style arguments (8) |
| Garbage collection | Automatic reclaiming of memory that is no longer reachable (4) |
| Git | The distributed version-control system begun by Linus Torvalds in 2005 (7) |
| Goodhart's law | When a measure becomes a target, it ceases to be a good measure (9) |
| GPU | A processor for massively parallel arithmetic, at heart a matrix-multiply machine (6) |
| Hash table | A structure that maps a key to a slot, giving O(1) average lookup (4) |
| Hyrum's law | With enough users, every observable behavior of a system will be depended on (9) |
| Index (database) | A B-tree that lets a query find rows without scanning the whole table (5) |
| Interpreter | Runs a program directly from source or bytecode, without saving a translated copy (1) |
| JIT compiler | Compiles bytecode or source to machine code while the program runs (1) |
| JSON | A lightweight text format for data, an Internet Standard since 2017 (4) |
| Kernel | The core of an operating system, which owns the hardware and lends it to programs (11) |
| Kubernetes | Google-descended system that runs fleets of containers (11) |
| Language Server Protocol | Lets one language tool serve many editors, so M editors and N languages need M plus N integrations (8) |
| Lint | A checker that reports suspicious code; the first was Johnson's 1978 program for C (8) |
| LLM | A neural network trained on text and code to generate text, behind modern assistants (12) |
| Linker, loader | The linker joins object files into one executable; the loader places it in memory to run (1) |
| Lockfile | A file recording the exact versions installed, so a rebuild is identical (7) |
| Machine code | The numbers a processor obeys directly (1) |
| Matrix, tensor | A rectangular grid of numbers that transforms space; a tensor is the n-dimensional version used in machine learning (6) |
| MCP | Model Context Protocol, an open standard connecting AI tools to data sources and other tools (12) |
| Memory safety | Freedom from bugs such as buffer overflows and use-after-free (3) |
| Monorepo | One repository holding most of an organization's code (7) |
| Normalization | Storing each fact once so copies cannot disagree (5) |
| Null | The "no value" value, which Hoare called his billion-dollar mistake (4) |
| ORM | Object-relational mapper, which converts database rows to objects (5) |
| Open-weight model | An AI model whose trained parameters can be downloaded (6) |
| Package, registry | A bundle of code with a manifest; the registry is the server that hosts packages (7) |
| Package manager | Finds, installs and upgrades packages and their dependencies (7) |
| Pointer | A variable holding a memory address (3) |
| Preprocessor | Replaces directives such as `#include` with text before compilation (3) |
| Primary key, foreign key | A column that identifies a row; a column that refers to a row in another table (5) |
| Prompt injection | Hostile text that steers an AI agent into leaking data or misbehaving (12) |
| Pull request | A proposal to merge changes, with discussion, a diff and review (7) |
| RAII | A scoped object acquires a resource in its constructor and releases it in its destructor (3) |
| Rebase | Replaying your commits on top of another branch for a straight history (7) |
| REST | An architecture for web APIs; in practice JSON over HTTP (11) |
| SBOM | Software bill of materials, a machine-readable list of a program's components (7) |
| Semantic versioning | MAJOR.MINOR.PATCH numbering in which a MAJOR change signals incompatibility (7) |
| SQL | The declarative language for querying relational databases (5) |
| SQL injection | User input pasted into a query becomes part of it; bound parameters prevent it (5) |
| Static versus dynamic typing | Types checked before the program runs, or while it runs (2) |
| Struct | A group of named fields laid out in memory (3) |
| Supply-chain attack | Compromising code upstream that many downstream users install (7) |
| Transaction | A group of database changes that all succeed or none do (5) |
| Transformer | The 2017 attention-based neural-network design behind modern LLMs (6) |
| Type inference | The compiler works out types without being told (2) |
| Undefined behavior | What the C standard leaves unspecified, so the compiler may do anything (3) |
| Unicode, UTF-8 | A number for every character; a one-to-four-byte encoding of those numbers (4) |
| Unit test | A test that runs one small piece of code in isolation (8) |
| Version control | Software that records every change to files, who made it and why (7) |
| Vibe coding | Building with an AI while not reviewing the code it writes (12) |
| Virtual machine | A language runtime that executes bytecode, or an emulated whole computer rented in the cloud (1, 11) |
| Waterfall | A strict analysis-coding-testing sequence; Royce's 1970 paper warned against it (9) |
| WebAssembly | A binary format for a browser virtual machine, standardized as Wasm 3.0 in 2025 (11) |
