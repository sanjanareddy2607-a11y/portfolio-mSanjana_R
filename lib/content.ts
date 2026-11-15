export type VisualVariant = "orbit" | "signal" | "graph" | "mesh" | "pulse";

export type ProjectStatusKind = "award" | "building" | "progress" | "completed";

export type Spec = { label: string; value: string };
export type Metric = { value: string; label: string };
export type Note = { label: string; body: string };
export type ProjectLink = { label: string; href: string; kind: "demo" | "repo" | "release" };

export type Project = {
  slug: string;
  code: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  statusKind: ProjectStatusKind;
  labCategory: string;
  start: string;
  updated: string;
  summary: string;
  overview: string;
  problem?: string;
  role?: string;
  technologies: string[];
  specs: Spec[];
  metrics: Metric[];
  capabilities?: { label: string; body: string }[];
  notes: Note[];
  links: ProjectLink[];
  visual: VisualVariant;
  accent: string;
  featured: boolean;
};

export const site = {
  name: "Mummaka Sanjana Reddy",
  shortName: "Sanjana Reddy",
  initials: "MSR",
  role: "AI/ML Engineer",
  email: "sanjanareddy2607@gmail.com",
  location: "Bengaluru, Karnataka, India",
  github: "https://github.com/sanjanareddy2607-a11y",
  githubLabel: "github.com/sanjanareddy2607-a11y",
  huggingface: "https://huggingface.co/SanjanaReddy999",
  huggingfaceLabel: "huggingface.co/SanjanaReddy999",
  linkedin: "https://www.linkedin.com/in/mummaka-sanjana-reddy-794089405",
  resume: "/api/resume",
  program: "B.Tech Computer Science and Engineering — AI & ML",
  university: "Jain (Deemed-to-be) University, Bengaluru",
  cohort: "Second year",
  intro:
    "I explore the engineering behind intelligent systems, turning technical ideas into practical projects and researching automated solutions for real-world problems.",
  heroIntro:
    "I'm Mummaka Sanjana Reddy, a computer science student exploring artificial intelligence, intelligent systems and software engineering. I enjoy turning technical ideas into practical projects and exploring the engineering behind them.",
};

export const sections = [
  { id: "top", label: "Overview", route: "/" },
  { id: "about", label: "About", route: "/about" },
  { id: "projects", label: "Projects", route: "/projects" },
  { id: "research", label: "Research", route: "/research" },
  { id: "lab", label: "Engineering Lab", route: "/engineering-lab" },
  { id: "beyond", label: "Beyond the Code", route: "/beyond-the-code" },
  { id: "contact", label: "Contact", route: "/contact" },
] as const;

export const heroFacts = [
  { label: "Program", value: "B.Tech CSE — AI & ML" },
  { label: "Institution", value: "Jain (Deemed-to-be) University" },
  { label: "Role", value: "Graphic Designer — Turing Club", accent: true },
  { label: "CGPA", value: "9.3 / 10", accent: true },
  { label: "Status", value: "Open to AI/ML opportunities", accent: true },
];

export const aboutValues = [
  {
    code: "01",
    label: "APPLIED INTELLIGENCE",
    title: "Systems that run",
    body: "Building practical AI systems that solve real-world problems — from GNSS-denied navigation to local-first language-model tooling.",
  },
  {
    code: "02",
    label: "RESEARCH DISCIPLINE",
    title: "Evidence over assertion",
    body: "Automated solutions researched with their uncertainty intact: confidence-ranked feature recognition, and simulated results labelled as simulated.",
  },
  {
    code: "03",
    label: "ENGINEERING CRAFT",
    title: "Fundamentals first",
    body: "Data structures and algorithms, GATE CSE 2028 preparation and competitive-programming optimisation behind every applied project.",
  },
];

export const projects: Project[] = [
  {
    slug: "navghost",
    code: "NG-24",
    index: "01",
    title: "NavGhost",
    subtitle: "Autonomous GNSS-denied dead reckoning navigation engine",
    category: "Autonomous Navigation",
    status: "Winner — SIH Internal Hackathon 2026",
    statusKind: "award",
    labCategory: "Currently Building",
    start: "January 2026",
    updated: "March 2026",
    summary:
      "Reliable position estimation when GNSS is unavailable or jammed, using inertial sensor fusion and machine learning.",
    overview:
      "NavGhost enables reliable position estimation for robotic and aerial platforms when GNSS signals are unavailable or jammed, using sensor fusion and machine learning in place of satellite fixes.",
    problem:
      "Satellite navigation fails indoors, underground and under jamming. In those conditions a platform must still know where it is, using only inertial measurements whose errors accumulate with every sample.",
    role:
      "Designed and implemented the dead-reckoning engine: the Extended Kalman Filter state estimator, the Lightweight GRU error model, and the Kotlin sensor pipeline that feeds both at high frequency.",
    technologies: ["Kotlin", "PyTorch", "Extended Kalman Filter", "Lightweight GRU", "Inertial sensors"],
    specs: [
      { label: "Language", value: "Kotlin" },
      { label: "ML framework", value: "PyTorch" },
      { label: "Navigation", value: "Extended Kalman Filter" },
      { label: "Neural network", value: "Lightweight GRU" },
      { label: "Sensor processing", value: "Inertial (IMU)" },
      { label: "Sensor features", value: "10 features" },
    ],
    metrics: [
      { value: "4,257", label: "Model parameters" },
      { value: "28.232%", label: "Drift across 60s GNSS blackout" },
      { value: "11,545", label: "Samples processed per second" },
      { value: "0.0866 ms", label: "Per-sample latency" },
    ],
    capabilities: [
      {
        label: "Sensor fusion",
        body: "Ten inertial features are fused through an Extended Kalman Filter for state estimation while a Lightweight GRU learns the residual error dynamics.",
      },
      {
        label: "Blackout resilience",
        body: "The engine continues to output dead-reckoning position estimates through prolonged GNSS blackouts rather than failing open.",
      },
      {
        label: "Throughput",
        body: "The pipeline processes 11,545 samples per second at 0.0866 ms per sample, sized for embedded deployment rather than offline analysis.",
      },
    ],
    notes: [
      {
        label: "Recognition",
        body: "Winner of the Smart India Hackathon internal round for the GNSS-denied navigation project.",
      },
    ],
    links: [
      { label: "Live Engine", href: "https://navghost-idr.vercel.app/", kind: "demo" },
      { label: "Release V2.4.0", href: "https://github.com/sanjanareddy2607-a11y/NavGhost/releases/tag/V2.4.0", kind: "release" },
      { label: "Repository", href: "https://github.com/sanjanareddy2607-a11y/NavGhost", kind: "repo" },
    ],
    visual: "orbit",
    accent: "#20E6D0",
    featured: true,
  },
  {
    slug: "nexus",
    code: "NX-01",
    index: "02",
    title: "N.E.X.U.S",
    subtitle: "AI-based emergency ambulance coordination and smart traffic prioritisation",
    category: "Emergency Coordination",
    status: "Winner — GRINOVA Ideathon 2026",
    statusKind: "award",
    labCategory: "In Progress",
    start: "June 2026",
    updated: "August 2026",
    summary:
      "Coordinating ambulances and prioritising traffic in real time to shorten emergency response.",
    overview:
      "N.E.X.U.S is an AI-based emergency ambulance coordination and smart traffic prioritisation system. It aims to reduce emergency response times through intelligent ambulance coordination and traffic-aware routing.",
    problem:
      "Emergency medical services face significant delays due to traffic congestion and inefficient ambulance dispatch. Current systems lack real-time traffic awareness and coordinated prioritisation at intersections.",
    role:
      "Designed the overall system architecture, implemented the FastAPI backend with WebSocket communication, developed traffic-aware routing algorithms, and built the React/Next.js frontend for real-time monitoring.",
    technologies: ["React", "Next.js", "FastAPI", "PostgreSQL", "WebSockets", "Traffic-aware routing"],
    specs: [
      { label: "Frontend", value: "React / Next.js" },
      { label: "Backend", value: "FastAPI" },
      { label: "Database", value: "PostgreSQL" },
      { label: "Transport", value: "WebSockets" },
      { label: "Routing", value: "Traffic-aware prioritisation" },
      { label: "Stage", value: "Working prototype" },
    ],
    metrics: [
      { value: "20–35%", label: "Estimated response-time improvement (prototype estimate)" },
      { value: "Real time", label: "Ambulance and intersection coordination" },
    ],
    capabilities: [
      { label: "Dispatch coordination", body: "Ambulances are coordinated from a single live operational view instead of independent dispatch calls." },
      { label: "Traffic-aware routing", body: "Routes respond to live traffic conditions and intersection prioritisation rather than static shortest paths." },
      { label: "Live monitoring", body: "WebSocket updates keep the React/Next.js monitoring interface synchronised with the FastAPI backend." },
    ],
    notes: [
      { label: "IP status", body: "Patent filing is in process. No granted patent is claimed." },
      {
        label: "Measurement note",
        body: "The 20–35% response-time improvement is a prototype estimate based on simulated conditions, not a measured real-world outcome.",
      },
    ],
    links: [
      {
        label: "Demo Prototype",
        href: "https://ab0cc153-b1fc-4041-b24e-a72d7e82f525-00-ftku0ivf33en.riker.replit.dev",
        kind: "demo",
      },
      { label: "Repository", href: "https://github.com/sanjanareddy2607-a11y/Nexus", kind: "repo" },
    ],
    visual: "signal",
    accent: "#5FD6C6",
    featured: true,
  },
  {
    slug: "jarvis",
    code: "JV-06",
    index: "03",
    title: "JARVIS",
    subtitle: "Personal AI operating system",
    category: "Personal AI",
    status: "MVP — GRINOVA 2026",
    statusKind: "award",
    labCategory: "Research",
    start: "September 2025",
    updated: "December 2025",
    summary:
      "A local-first intelligence platform that puts several language models and five analysis tools behind one interface.",
    overview:
      "A local-first personal intelligence platform that integrates multiple large language models and provides tools for file, PDF, CSV and directory analysis.",
    problem:
      "Useful local models are fragmented across separate runtimes and terminals. A personal assistant is only practical when the models, the tools and the automation layer share one interface.",
    role:
      "Built the six-module system: model serving through Ollama, the tool layer, the Flask REST API, n8n automation workflows, and the Dockerised deployment.",
    technologies: ["Ollama", "Open WebUI", "Mistral 7B", "Llama 2 7B", "Neural Chat 7B", "Flask REST API", "n8n", "Docker"],
    specs: [
      { label: "Inference", value: "Ollama (local)" },
      { label: "Interface", value: "Open WebUI" },
      { label: "Models", value: "Mistral 7B · Llama 2 7B · Neural Chat 7B" },
      { label: "API", value: "Flask REST" },
      { label: "Automation", value: "n8n workflows" },
      { label: "Deployment", value: "Docker" },
    ],
    metrics: [
      { value: "6", label: "Modules" },
      { value: "1,000+", label: "Lines of code" },
    ],
    capabilities: [
      { label: "File Reader", body: "Read and display various file types." },
      { label: "PDF Extractor", body: "Extract text and data from PDF documents." },
      { label: "CSV Analyser", body: "Analyse CSV data files." },
      { label: "Directory Lister", body: "List and explore directory structures." },
      { label: "Résumé Analyser", body: "Analyse and extract information from résumés." },
    ],
    notes: [
      {
        label: "Recognition",
        body: "Minimum Viable Product recognition at GRINOVA 2026 for the personal AI operating system concept.",
      },
      {
        label: "Architecture",
        body: "Ollama handles local inference while Open WebUI provides the interface. Multiple models are reachable through a Flask REST API, n8n workflows handle automation, and every component is containerised with Docker for consistent deployment.",
      },
    ],
    links: [{ label: "Repository", href: "https://github.com/sanjanareddy2607-a11y/Jarvis-v1", kind: "repo" }],
    visual: "graph",
    accent: "#E3B778",
    featured: true,
  },
  {
    slug: "echointel",
    code: "EI-09",
    index: "04",
    title: "EchoIntel",
    subtitle: "Autonomous YouTube comment intelligence engine",
    category: "NLP Intelligence",
    status: "Autonomous Engine",
    statusKind: "completed",
    labCategory: "Research",
    start: "October 2025",
    updated: "January 2026",
    summary:
      "Categorising and reading large comment streams with emotion detection, clustering and controversy scoring.",
    overview:
      "A system for intelligent categorisation and analysis of YouTube comments using NLP, clustering and controversy scoring, with LangChain agents producing strategy briefs.",
    problem:
      "Comment sections fail at scale: sentiment, spam and emerging controversy are buried in thousands of unstructured replies that no moderator can read linearly.",
    role:
      "Implemented the analysis pipeline — emotion detection, Isolation Forest anomaly detection, K-Means clustering, controversy scoring and the LangChain agent layer.",
    technologies: ["NLP emotion detection", "Isolation Forest", "K-Means", "LangChain", "Gemini", "Dockerised FastAPI"],
    specs: [
      { label: "Analysis", value: "NLP emotion detection" },
      { label: "Anomalies", value: "Isolation Forest" },
      { label: "Clustering", value: "K-Means" },
      { label: "Agents", value: "LangChain + Gemini" },
      { label: "Runtime", value: "Dockerised FastAPI" },
      { label: "Surface", value: "Render dashboard" },
    ],
    metrics: [
      { value: "5,000+", label: "Mock comment payloads supported" },
      { value: "35%", label: "Triage reduction (estimated, simulated)" },
    ],
    capabilities: [
      { label: "Emotion mapping", body: "Comment emotion is detected with NLP and grouped rather than reviewed one reply at a time." },
      { label: "Anomaly isolation", body: "Isolation Forest separates unusual comment behaviour from the mainstream conversation." },
      { label: "Strategy briefs", body: "LangChain agents and Gemini turn cluster output into short, readable strategy briefs." },
    ],
    notes: [
      {
        label: "Simulated results",
        body: "The reported 35% reduction in triage effort and 5,000+ mock comment payloads are based on simulated test data. These are not production measurements.",
      },
      {
        label: "Future scope",
        body: "Production deployment with the YouTube API, validated metrics, spam detection, sentiment trend analysis and automated reporting.",
      },
    ],
    links: [{ label: "Repository", href: "https://github.com/sanjanareddy2607-a11y/EchoIntel", kind: "repo" }],
    visual: "mesh",
    accent: "#7FD8FF",
    featured: false,
  },
  {
    slug: "nexusprobe",
    code: "NP-02",
    index: "05",
    title: "NexusProbe",
    subtitle: "Autonomous API health intelligence and self-healing monitor",
    category: "API Monitoring",
    status: "Self-Healing Monitor",
    statusKind: "completed",
    labCategory: "Research",
    start: "November 2025",
    updated: "January 2026",
    summary:
      "Continuous API health monitoring with anomaly detection and automated root-cause analysis.",
    overview:
      "An autonomous API health intelligence and self-healing monitor: continuous health checks, anomaly detection and automated root-cause analysis using AI.",
    problem:
      "API-dependent systems suffer from undetected outages, performance degradation and cascading failures. Manual incident response is time-consuming and prone to human error.",
    role:
      "Designed the modular scheduler backend, implemented API health check routines, developed anomaly detection using Isolation Forest, and integrated Gemini for root-cause analysis generation.",
    technologies: ["Gemini", "Anomaly detection", "Isolation Forest", "Modular scheduler", "REST API"],
    specs: [
      { label: "Intelligence", value: "Gemini" },
      { label: "Detection", value: "Isolation Forest" },
      { label: "Scheduling", value: "Modular scheduler" },
      { label: "Checks", value: "REST API health probes" },
      { label: "Recovery", value: "Self-healing routines" },
    ],
    metrics: [{ value: "40%", label: "Reduction in simulated incident response time" }],
    capabilities: [
      { label: "Continuous probes", body: "A modular scheduler runs health checks against registered API targets at a fixed cadence." },
      { label: "Anomaly detection", body: "Isolation Forest flags degradation before an endpoint fails outright." },
      { label: "Root-cause generation", body: "Gemini drafts a root-cause explanation from the collected health signals for faster human response." },
    ],
    notes: [
      {
        label: "Simulated results",
        body: "The reported 40% reduction in incident response time is based on simulated test conditions, not a production measurement.",
      },
      {
        label: "Future scope",
        body: "Real-world deployment against live API targets, validated metrics, and integration with production monitoring systems.",
      },
    ],
    links: [{ label: "Repository", href: "https://github.com/sanjanareddy2607-a11y/NexusProbe", kind: "repo" }],
    visual: "pulse",
    accent: "#8FE3C4",
    featured: false,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const research = {
  code: "RS-01",
  index: "01",
  venue: "ICAIMLE-2027",
  status: "Submitted abstract",
  title:
    "An Uncertainty-Aware Pipeline from CAD Models to Tool-Grouped CNC Programs Using Graph Neural Network Feature Recognition",
  authors: "Mummaka Sanjana Reddy, Sagar K G",
  venueFull:
    "International Conference on Artificial Intelligence and Machine Learning in Engineering — ICAIMLE-2027.",
  overview:
    "Automated machining-feature recognition and tool-grouped CNC program planning from STEP CAD models, using B-representation face-adjacency graphs and GATv2-based feature recognition.",
  approach: [
    "B-representation face-adjacency graphs for CAD model representation",
    "GATv2-based feature recognition for machining feature classification",
    "Face-level machining feature classification with confidence-based uncertainty ranking",
    "Tool-grouped machining operation planning from classified features",
  ],
  metrics: [
    { value: "8,949", label: "Models evaluated" },
    { value: "268,982", label: "Faces analysed" },
    { value: "25", label: "Feature classes" },
    { value: "98.63%", label: "Classification accuracy" },
  ],
  macroF1: "0.9775",
  findings: [
    "Least confident feature groups covered 3.0% of faces and contained 66.2% of classification errors",
    "Generated-plate experiments reported a 57.2% reduction in average tool changes",
    "Fifty generated G-code programs passed the reported automatic rule checks",
    "Three plates were simulated in CAMotics",
  ],
  limitations:
    "The abstract explicitly identifies the need for real CAD models and physical machining trials. These validations have not yet occurred. Future work includes real-world testing and expanding the feature set for more complex machining scenarios.",
  pipeline: ["STEP CAD", "B-rep graph", "GATv2", "Uncertainty rank", "Tool-grouped CNC"],
};

export const education = {
  institution: "Jain (Deemed-to-be) University, Bengaluru",
  degree: "B.Tech Computer Science and Engineering",
  specialization: "Artificial Intelligence & Machine Learning",
  cgpa: "9.3",
  cgpaScale: "/10",
  status: "Second year",
  graduation: "Graduation year pending confirmation",
  coursework: [
    "Data Structures & Algorithms",
    "Python",
    "OOP with Java",
    "SQL & Databases",
    "AI & Prompt Engineering",
    "Data Science Fundamentals",
    "Unix Shell Scripting",
    "Git & GitHub",
    "Trees & Graphs",
    "Operating Systems Fundamentals",
  ],
  highlights: [
    "Current CGPA 9.3/10, maintained through the second year",
    "Coursework spanning AI/ML, data structures, databases and systems fundamentals",
    "Practical lab work in Python, Java, SQL, shell scripting and Git workflows",
  ],
};

export type Internship = {
  code: string;
  org: string;
  role: string;
  period: string;
  location: string;
  state: string;
  summary: string;
  bullets: string[];
  stack: string[];
  outcome?: string;
};

export const internships: Internship[] = [
  {
    code: "IN-01",
    org: "SK Natural Farm",
    role: "API & Backend Developer Intern",
    period: "July 2026 – August 2026",
    location: "Bengaluru, India",
    state: "Completed",
    summary:
      "Backend and API internship building and deploying a production web application for a drone-agriculture company.",
    bullets: [
      "Built a production Next.js web application with a Node.js/Express backend for a drone-agriculture company.",
      "Developed responsive interfaces, real-time data visualisation and API integration for a fleet-management dashboard.",
      "Deployed the application to the cloud and applied monitoring and security practices.",
    ],
    stack: ["Next.js", "Node.js", "Express", "REST APIs", "Cloud deployment"],
    outcome: "Completion certificate · Employee ID SKNF/260701",
  },
  {
    code: "IN-02",
    org: "1M1B with IBM & AICTE",
    role: "AI for Sustainability Virtual Intern",
    period: "July 2026 – September 2026",
    location: "Virtual",
    state: "Completed",
    summary:
      "Virtual internship on agentic AI and retrieval-augmented generation applied to sustainability problems.",
    bullets: [
      "Worked with agentic AI systems and retrieval-augmented generation (RAG).",
      "Built a machine-learning project aligned with the UN Sustainable Development Goals.",
      "Completed the programme with AICTE and IBM SkillsBuild certification.",
    ],
    stack: ["Agentic AI", "RAG", "Machine Learning"],
    outcome: "AICTE and IBM SkillsBuild completion certificates",
  },
  {
    code: "IN-03",
    org: "Kamsale Entertainment",
    role: "Web Designer & Full-Stack Development Intern",
    period: "June 2026 – Present",
    location: "Bengaluru, India",
    state: "Current",
    summary:
      "End-to-end delivery of a company website, including a booking system and Kannada-language support.",
    bullets: [
      "Designed and built the company website end to end with React, TypeScript, a Node.js/Express backend and SQLite.",
      "Implemented a booking system and Kannada multilingual support.",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "SQLite"],
  },
];

export const trajectory = [
  {
    label: "Advanced AI/ML",
    body: "Deep learning architectures, foundation models, and novel training methodologies",
  },
  {
    label: "Data Structures and Algorithms",
    body: "GATE CSE 2028 preparation and competitive programming optimisation",
  },
  {
    label: "Intelligent Systems",
    body: "Building practical AI systems that solve real-world problems",
  },
  {
    label: "International Research & Internships",
    body: "Exploring opportunities connected with Japan and global AI research",
  },
  {
    label: "Japanese Language Learning",
    body: "Nihongo no manabi — language and cultural immersion",
  },
];

export const skills = [
  {
    code: "SK-01",
    group: "Programming & Development",
    items: [
      { name: "Python", level: "Proficient" },
      { name: "C", level: "Familiar" },
      { name: "Java", level: "Familiar" },
      { name: "SQL", level: "Proficient" },
      { name: "HTML & CSS", level: "Proficient" },
      { name: "Bash / Shell scripting", level: "Familiar" },
    ],
  },
  {
    code: "SK-02",
    group: "AI / ML",
    items: [
      { name: "Machine Learning", level: "Proficient" },
      { name: "Deep Learning", level: "Proficient" },
      { name: "NLP", level: "Proficient" },
      { name: "LLMs & RAG", level: "Proficient" },
      { name: "Agentic AI", level: "Proficient" },
      { name: "Prompt Engineering", level: "Proficient" },
      { name: "LangChain", level: "Familiar" },
      { name: "PyTorch", level: "Familiar" },
    ],
  },
  {
    code: "SK-03",
    group: "Backend & APIs",
    items: [
      { name: "FastAPI", level: "Proficient" },
      { name: "REST APIs", level: "Proficient" },
      { name: "Node.js / Express", level: "Proficient" },
      { name: "API integration", level: "Proficient" },
      { name: "JSON & HTTP", level: "Proficient" },
      { name: "WebSockets", level: "Familiar" },
    ],
  },
  {
    code: "SK-04",
    group: "Data & Databases",
    items: [
      { name: "Data Structures & Algorithms", level: "Advanced" },
      { name: "SQL", level: "Proficient" },
      { name: "PostgreSQL", level: "Proficient" },
      { name: "SQLite", level: "Proficient" },
      { name: "DBMS fundamentals", level: "Proficient" },
      { name: "Data analysis", level: "Familiar" },
    ],
  },
  {
    code: "SK-05",
    group: "Cloud, DevOps & Tools",
    items: [
      { name: "Docker", level: "Proficient" },
      { name: "Git & GitHub", level: "Proficient" },
      { name: "Vercel", level: "Proficient" },
      { name: "Ollama", level: "Proficient" },
      { name: "Render", level: "Familiar" },
      { name: "Netlify", level: "Familiar" },
      { name: "Google Cloud", level: "Familiar" },
      { name: "AWS", level: "Familiar" },
      { name: "n8n", level: "Familiar" },
      { name: "Postman", level: "Familiar" },
      { name: "Cursor / VS Code", level: "Proficient" },
    ],
  },
  {
    code: "SK-06",
    group: "Design & Documentation",
    items: [
      { name: "Graphic design", level: "Proficient" },
      { name: "UI / UX design", level: "Familiar" },
      { name: "Figma", level: "Familiar" },
      { name: "Canva", level: "Familiar" },
      { name: "Technical documentation", level: "Proficient" },
    ],
  },
  {
    code: "SK-07",
    group: "Professional",
    items: [
      { name: "Team leadership", level: "Proficient" },
      { name: "Communication", level: "Proficient" },
      { name: "Pitching & presentation", level: "Proficient" },
      { name: "Collaborative problem solving", level: "Proficient" },
    ],
  },
];

export const achievements = [
  {
    title: "Smart India Hackathon — Internal Winner",
    detail: "1st place across Jain University · ISRO-sponsored problem statement · 2026",
    kind: "win",
  },
  {
    title: "GRINOVA Ideathon Winner",
    detail: "150+ campus teams · Government of Karnataka · N.E.X.U.S · patent filing in process",
    kind: "win",
  },
  {
    title: "GRINOVA MVP — JARVIS",
    detail: "MVP recognition for the personal AI operating system concept",
    kind: "win",
  },
  {
    title: "Full Stack Development Workshop — 2nd Prize",
    detail: "FOSS Club, Jain (Deemed-to-be) University · 10-week workshop, 7 Feb – 7 May 2026",
    kind: "honour",
  },
  {
    title: "Adobe University Hackathon",
    detail: "Ideation round cleared · participation certificate, August 2026",
    kind: "entry",
  },
  {
    title: "Capgemini Brand Quest",
    detail: "Cleared Round 1",
    kind: "entry",
  },
  {
    title: "FantomCode 2026",
    detail: "24-hour national hackathon · RV Institute of Technology · 28 March 2026",
    kind: "entry",
  },
  {
    title: "Vibe2Ship",
    detail: "Coding Ninjas × Google for Developers · solution submitted",
    kind: "entry",
  },
  {
    title: "Google Solution Challenge",
    detail: "Solution and prototype presented in the virtual round",
    kind: "entry",
  },
  {
    title: "CometChat Agentic Engineer Take-Home",
    detail: "Real-time chat integration built with Cursor AI",
    kind: "entry",
  },
  {
    title: "Google Gemini Cloud Facilitator Program",
    detail: "In progress · Arcade prototyping with Claude, Hugging Face and Google AI Studio",
    kind: "entry",
  },
  {
    title: "Pitch and Ditch Ideathon",
    detail: "Idea pitching competition",
    kind: "entry",
  },
  {
    title: "Rezonix Research Innovation",
    detail: "Trained a machine-learning model under mentorship",
    kind: "entry",
  },
  {
    title: "Red Hat AI Seminar",
    detail: "Attended the campus AI seminar",
    kind: "entry",
  },
  {
    title: "Chemistry research paper",
    detail: "Co-authoring · in progress",
    kind: "entry",
  },
];

export const experience = [
  {
    code: "EX-01",
    org: "The Turing Club (TTC)",
    role: "Graphic Designer",
    state: "Current role",
    paragraphs: [
      "Contributing as a graphic designer for a student technical club — event identity, visual assets and promotional material.",
      "Supporting the design of technical workshops, hackathons and community-building events.",
      "Formal designation pending confirmation.",
    ],
  },
  {
    code: "EX-02",
    org: "Cultural Club, FET-JU",
    role: "Graphic Designer",
    state: "Campus community",
    paragraphs: [
      "Designing posters and visual material for campus cultural events at the Faculty of Engineering and Technology, Jain University.",
      "Collaborating with event teams on creative direction and delivery timelines.",
    ],
  },
  {
    code: "EX-03",
    org: "GDG JU-FET",
    role: "Member, Google Developer Groups",
    state: "Campus community",
    paragraphs: [
      "Member of Google Developer Groups at JU-FET (Jain University, Faculty of Engineering and Technology).",
      "Participating in meetups, workshops and hackathons organised by GDG while exploring cloud technologies, AI/ML and developer tools.",
    ],
  },
];

export type Certification = {
  code: string;
  title: string;
  issuer: string;
  date: string;
  status: "completed" | "pending";
  note?: string;
};

export const certifications: Certification[] = [
  {
    code: "CR-01",
    title: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle University",
    date: "23 August 2026",
    status: "completed",
    note: "Credential ID 330876841AAI26OFA · exam 1Z0-1157-26 passed",
  },
  {
    code: "CR-02",
    title: "AI/ML for Geodata Analysis",
    issuer: "ISRO — Indian Institute of Remote Sensing (IIRS)",
    date: "Date not stated",
    status: "pending",
    note: "Exam completed with a 100% score · certificate pending issue",
  },
  {
    code: "CR-03",
    title: "Google Cloud Arcade — Skill Badges",
    issuer: "Google Cloud",
    date: "Date not stated",
    status: "completed",
    note: "14 skill badges completed",
  },
  {
    code: "CR-04",
    title: "Make Agentic AI Work for You",
    issuer: "IBM SkillsBuild",
    date: "24 August 2026",
    status: "completed",
    note: "Completion certificate PLAN-37BFD561DC25",
  },
  {
    code: "CR-05",
    title: "Introduction to Retrieval-Augmented Generation",
    issuer: "IBM SkillsBuild",
    date: "Date not stated",
    status: "completed",
    note: "Digital badge",
  },
  {
    code: "CR-06",
    title: "The Rise of Multiagent Systems",
    issuer: "IBM SkillsBuild",
    date: "Date not stated",
    status: "completed",
    note: "Digital badge",
  },
  {
    code: "CR-07",
    title: "Unleashing the Power of AI Agents",
    issuer: "IBM SkillsBuild",
    date: "Date not stated",
    status: "completed",
    note: "Digital badge",
  },
  {
    code: "CR-08",
    title: "AI for Sustainability Virtual Internship",
    issuer: "1M1B with IBM & AICTE",
    date: "2026",
    status: "completed",
    note: "Programme completion certificate",
  },
];

export const interests = [
  {
    label: "Music",
    body: "Guitar — exploring chords and composing",
    x: 16,
    y: 30,
  },
  {
    label: "Science Fiction & Novels",
    body: "Favourite genre — exploring future technologies and human evolution",
    x: 74,
    y: 18,
  },
  {
    label: "Space Exploration & Astrophysics",
    body: "Fascinated by the cosmos and our place in it",
    x: 82,
    y: 62,
  },
  {
    label: "Marvel & Anime",
    body: "Appreciating storytelling and visual artistry",
    x: 58,
    y: 86,
  },
  {
    label: "Japanese Language & Culture",
    body: "Nihongo no manabi — language learning and cultural immersion",
    x: 18,
    y: 70,
  },
];

export const beyondQuote = "The universe is under no obligation to make sense to you.";
