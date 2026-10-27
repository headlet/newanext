
import Link from "next/link";

const modules = [
  {
    number: "01",
    title: "Programming Foundations",
    topics: [
      "Problem-solving and computational thinking",
      "Variables, conditions, loops, and functions",
      "Functions and modular programming",
      "Understanding time and space complexity",
      "Introduction to Big O notation",
    ],
  },
  {
    number: "02",
    title: "Algorithm Analysis",
    topics: [
      "Time complexity and space complexity",
      "Best, average, and worst-case analysis",
      "Big O, Big Omega, and Big Theta",
      "Analyzing loops and nested loops",
      "Comparing algorithm efficiency",
    ],
  },
  {
    number: "03",
    title: "Arrays and Strings",
    topics: [
      "Array operations and traversal",
      "Searching and updating elements",
      "String manipulation and common patterns",
      "Two-pointer technique",
      "Sliding window technique",
    ],
  },
  {
    number: "04",
    title: "Searching and Sorting",
    topics: [
      "Linear search and binary search",
      "Bubble sort and selection sort",
      "Insertion sort",
      "Merge sort and quick sort",
      "Comparing sorting algorithms",
    ],
  },
  {
    number: "05",
    title: "Linked Lists",
    topics: [
      "Singly and doubly linked lists",
      "Creating and traversing linked lists",
      "Insertion and deletion",
      "Reversing a linked list",
      "Fast and slow pointer technique",
    ],
  },
  {
    number: "06",
    title: "Stacks and Queues",
    topics: [
      "Stack operations and implementations",
      "Queue and circular queue",
      "Deque fundamentals",
      "Balanced parentheses problems",
      "Monotonic stack patterns",
    ],
  },
  {
    number: "07",
    title: "Hashing and Hash Tables",
    topics: [
      "Hash functions and hash maps",
      "Sets and dictionaries",
      "Frequency counting",
      "Handling collisions conceptually",
      "Solving lookup and duplicate problems",
    ],
  },
  {
    number: "08",
    title: "Trees and Binary Search Trees",
    topics: [
      "Tree terminology and representations",
      "Binary trees and binary search trees",
      "Preorder, inorder, and postorder traversal",
      "Level-order traversal",
      "Tree height and recursive problem-solving",
    ],
  },
  {
    number: "09",
    title: "Heaps and Priority Queues",
    topics: [
      "Min-heaps and max-heaps",
      "Heap insertion and deletion",
      "Priority queue operations",
      "Heap sort fundamentals",
      "Top-K element problems",
    ],
  },
  {
    number: "10",
    title: "Graphs",
    topics: [
      "Graph terminology and representations",
      "Adjacency lists and adjacency matrices",
      "Breadth-first search (BFS)",
      "Depth-first search (DFS)",
      "Connected components and cycle detection",
      "Shortest-path fundamentals",
    ],
  },
  {
    number: "11",
    title: "Recursion and Backtracking",
    topics: [
      "Base cases and recursive calls",
      "Understanding the call stack",
      "Recursive array and string problems",
      "Permutations and combinations",
      "Maze and constraint-based problems",
    ],
  },
  {
    number: "12",
    title: "Greedy and Dynamic Programming",
    topics: [
      "Greedy strategy and decision-making",
      "Memoization and tabulation",
      "Overlapping subproblems",
      "Classic dynamic programming patterns",
      "Knapsack and longest common subsequence concepts",
    ],
  },
  {
    number: "13",
    title: "Interview Preparation and Capstone",
    topics: [
      "Pattern-based problem-solving practice",
      "Choosing appropriate data structures",
      "Writing clean and efficient solutions",
      "Explaining complexity and trade-offs",
      "Timed coding challenges and mock interviews",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "Search and Sort Toolkit",
    description:
      "Implement and compare classic algorithms using different input sizes.",
  },
  {
    number: "02",
    title: "Browser History Simulator",
    description:
      "Use stacks and linked lists to model navigation and history operations.",
  },
  {
    number: "03",
    title: "Contact Lookup System",
    description:
      "Apply hash maps and searching techniques to organize and find records efficiently.",
  },
  {
    number: "04",
    title: "Route Finder",
    description:
      "Represent locations as a graph and explore paths using BFS and DFS.",
  },
  {
    number: "05",
    title: "Algorithm Challenge Portfolio",
    description:
      "Solve, document, and analyze a collection of problems from beginner to advanced.",
  },
];

const outcomes = [
  "Choose suitable data structures for a problem",
  "Analyze time and space complexity",
  "Implement searching and sorting algorithms",
  "Solve problems using trees, stacks, queues, and graphs",
  "Apply recursion, backtracking, and dynamic programming",
  "Write clean and efficient code",
  "Explain algorithm choices and trade-offs",
  "Prepare for technical coding interviews",
];

const highlights = [
  {
    icon: "🧠",
    title: "Problem-Solving Mindset",
    description:
      "Learn to break complex problems into smaller, manageable steps.",
  },
  {
    icon: "⚙️",
    title: "Core Computer Science",
    description:
      "Understand the data structures and algorithms used across software development.",
  },
  {
    icon: "💻",
    title: "Practice by Coding",
    description:
      "Strengthen your understanding with implementation and coding challenges.",
  },
  {
    icon: "🎯",
    title: "Interview Readiness",
    description:
      "Practice explaining solutions, analyzing complexity, and improving performance.",
  },
];

export default function DataStructuresAlgorithmsPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080D18] text-white">
      {/* Hero */}
      <section className="relative border-b border-white/10">
        <div className="pointer-events-none absolute -left-32 -top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-24 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2 md:px-10 lg:py-32">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              NewaNext Academy · Computer Science
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Data Structures{" "}
              <span className="text-slate-500">&amp;</span>{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Algorithms
              </span>{" "}
              Course in Nepal
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Think like an engineer. Learn how to organize data, design
              efficient algorithms, solve challenging programming problems,
              and build a strong foundation for technical interviews.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-blue-500 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-400"
              >
                Enroll Now <span aria-hidden="true">→</span>
              </Link>

              <a
                href="#curriculum"
                className="rounded-xl border border-white/15 px-6 py-3.5 font-semibold transition hover:border-blue-400/60 hover:bg-white/5"
              >
                Explore Curriculum
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-xl font-bold sm:text-2xl">13 Modules</p>
                <p className="mt-1 text-sm text-slate-400">Structured path</p>
              </div>
              <div>
                <p className="text-xl font-bold sm:text-2xl">Hands-on</p>
                <p className="mt-1 text-sm text-slate-400">Coding practice</p>
              </div>
              <div>
                <p className="text-xl font-bold sm:text-2xl">All Levels</p>
                <p className="mt-1 text-sm text-slate-400">Progressive learning</p>
              </div>
            </div>
          </div>

          {/* Algorithm visual */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-blue-950/30 sm:p-7">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs text-slate-400">binary-search.js</span>
                </div>

                <div className="overflow-x-auto p-5 font-mono text-sm leading-8 sm:p-7">
                  <p className="text-slate-500">// Find a target efficiently</p>
                  <p className="mt-3">
                    <span className="text-purple-400">function</span>{" "}
                    <span className="text-blue-300">binarySearch</span>
                    <span className="text-slate-300">(arr, target) {"{"}</span>
                  </p>
                  <p className="pl-5">
                    <span className="text-purple-400">let</span> left ={" "}
                    <span className="text-amber-300">0</span>;
                  </p>
                  <p className="pl-5">
                    <span className="text-purple-400">let</span> right = arr.length -{" "}
                    <span className="text-amber-300">1</span>;
                  </p>
                  <p className="mt-2 pl-5">
                    <span className="text-purple-400">while</span>{" "}
                    <span className="text-slate-300">(left {"<="} right) {"{"}</span>
                  </p>
                  <p className="pl-10 text-cyan-300">
                    <span className="text-purple-400">const</span> mid = Math.floor(
                    (left + right) / <span className="text-amber-300">2</span>);
                  </p>
                  <p className="pl-10 text-slate-300">{"// Compare and narrow the search"}</p>
                  <p className="pl-5 text-slate-300">{"}"}</p>
                  <p className="text-slate-300">{"}"}</p>
                </div>

                <div className="border-t border-white/10 bg-white/[0.02] p-5">
                  <p className="text-xs text-slate-500">EFFICIENCY MATTERS</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="rounded-lg bg-blue-500/15 px-3 py-2 font-mono text-sm text-blue-300">
                      O(n)
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className="rounded-lg bg-emerald-500/10 px-3 py-2 font-mono text-sm text-emerald-300">
                      O(log n)
                    </span>
                    <span className="text-xs text-slate-400">
                      Fewer comparisons
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-center text-sm text-slate-400">
                Understand the solution, not just the code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
            Why Learn DSA?
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Build the thinking behind better software.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            Data structures and algorithms help developers solve problems
            systematically and understand the trade-offs behind different
            technical approaches.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-blue-400/40"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section
        id="curriculum"
        className="border-y border-white/10 bg-white/[0.02]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Learning Roadmap
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Complete course curriculum
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Progress from programming fundamentals to advanced algorithmic
              problem-solving, with practical coding exercises throughout.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {modules.map((module) => (
              <article
                key={module.number}
                className="rounded-2xl border border-white/10 bg-[#0B1220] p-6 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 font-bold text-blue-300">
                    {module.number}
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold">{module.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {module.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-400"
                        >
                          <span className="mt-1 text-amber-400">✓</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
            Practical Challenges
          </p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Turn algorithms into working solutions.
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            Practice implementation, compare approaches, and explain why one
            solution may perform better than another.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-amber-400/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-amber-400">
                  PROJECT {project.number}
                </span>
                <span className="text-xl text-slate-500 transition group-hover:text-amber-400">
                  ↗
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{project.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:px-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-400">
              Learning Outcomes
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Think clearly. Code efficiently.
            </h2>
            <p className="mt-5 leading-8 text-slate-400">
              Develop transferable problem-solving skills that help with
              software engineering, competitive programming, and technical
              interviews.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {outcomes.map((outcome) => (
              <div
                key={outcome}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0B1220] p-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-sm text-emerald-300">
                  ✓
                </span>
                <p className="text-sm leading-6 text-slate-300">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — no footer */}
      <section className="px-6 py-20 md:px-10">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-950/80 to-[#0D1526] px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[90px]" />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              Level Up Your Skills
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold sm:text-5xl">
              Strong fundamentals. Smarter solutions.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
              Strengthen your computer science foundations with NewaNext
              Academy and start solving problems with confidence.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Contact Us to Enroll <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
