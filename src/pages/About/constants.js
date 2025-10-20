export const aboutData = {
  identity: {
    name: "Atharva Nighot",
    headline: "Full‑Stack Developer focused on clean UI and reliable APIs",
    location: "Pune, India",
    avatarUrl: "/avatars/you.jpg",
    bio: "Computer Science graduate building React + Python applications with a focus on performance, accessibility, and maintainable code.",
  },
  specialty: {
    stack: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
      "Redux Toolkit",
    ],
    style: ["Responsive design", "A11y-first", "Animation polish", "Dark mode"],
    focus: [
      "Clean architecture",
      "API integration",
      "State management",
      "DX & docs",
      "Error handling",
    ],
  },
  journey: [
    {
      year: "2025",
      title: "WeatherWear — AI clothing suggestions",
      org: "Personal Project",
      summary:
        "React + FastAPI app combining weather APIs with Google Gemini for outfit recommendations; Clerk auth, RTK Query caching, and Leaflet maps.",
    },
    {
      year: "2025",
      title: "Quiz App — responsive",
      org: "Personal Project",
      summary:
        "Modern component architecture with timers, answer validation UI, SEO basics, and Lighthouse-friendly performance.",
    },
  ],
  process: [
    {
      phase: "Plan & Discover",
      points: [
        "Clarify requirements, success metrics, and constraints",
        "Draft API contracts and state/data flow",
      ],
    },
    {
      phase: "Prototype & Design",
      points: [
        "Map UI states (loading/empty/error/success)",
        "Define accessibility and responsive breakpoints",
      ],
    },
    {
      phase: "Build",
      points: [
        "Implement clean components with composition",
        "Integrate APIs with robust error handling and caching",
      ],
    },
    {
      phase: "Ship & Iterate",
      points: [
        "Deploy, monitor logs/metrics",
        "Iterate from user feedback and real usage",
      ],
    },
  ],
  achievements: [
    {
      label: "Improved LCP/CLS",
      detail:
        "Cut LCP by ~35% on WeatherWear through image policy and code‑splitting",
    },
    {
      label: "Robust error UX",
      detail: "Consistent loading/error/skeleton patterns across apps",
    },
    {
      label: "API resilience",
      detail: "Time‑outs, retries, and fallbacks for weather and auth flows",
    },
    {
      label: "Docs & DX",
      detail: "Readable README, env templates, and quickstart scripts",
    },
  ],
  skills: {
    expert: [
      "React (hooks, composition)",
      "JavaScript",
      "Tailwind v4",
      "REST APIs",
      "State management (RTK/RTKQ)",
    ],
    intermediate: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Auth (JWT/Clerk)",
      "GIS/maps (Leaflet)",
    ],
    learning: ["Server Components", "Edge functions", "Testing"],
  },
  story:
    "Started with design-to-code conversions and grew into full-stack projects that merge clean UI with practical API design. Enjoy turning complex flows into simple, accessible interfaces and documenting patterns that teams can reuse.",
  contacts: {
    github: "#",
    linkedin: "#",
  },
  values: [
    "Accessibility by default",
    "Clarity over cleverness",
    "Measure before optimizing",
    "Small PRs, strong reviews",
    "Radical candor",
  ],
  preferences: [
    "Async‑friendly collaboration",
    "Well‑defined APIs and contracts",
    "Design handoffs with states",
    "CI checks for quality gates",
  ],
};
