export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    category: "web" | "app" | "library" | "ai";
    featured: boolean;
    image: string;
    tags: string[];
    github?: string;
    live?: string;
    year: string;
    role: string;
    duration: string;
    challenge: string;
    solution: string;
    results: string[];
    techStack: {
        name: string;
        description: string;
    }[];
    screenshots: string[];
}

export const projects: Project[] = [
    {
        id: "omni-agent",
        title: "OmniAgent Neural Interface",
        shortDescription:
            "A visually immersive 3D AI agent interface featuring real-time neural network visualization.",
        fullDescription:
            "The flagship project of the portfolio. OmniAgent represents the convergence of high-performance WebGL, generative AI, and futuristic UI design. It features a reactive 3D neural core that responds to user input, simulating a sentient digital entity. Built with Next.js 15, React Three Fiber, and a custom physics engine.",
        category: "ai",
        featured: true,
        image: "/projects/dashboard.jpg",
        tags: ["Next.js 15", "R3F", "WebGL", "GenAI", "Cyberpunk"],
        github: "https://github.com/ssani/omni-agent",
        live: "https://omni-agent.demo.com",
        year: "2024",
        role: "Lead Creative Technologist",
        duration: "In Development",
        challenge:
            "Most AI interfaces are static and boring text boxes. I wanted to create an experience that feels 'alive'—where the interface itself communicates intelligence through motion and light, rather than just text.",
        solution:
            "Implemented a custom particle system using Maath and Three.js to generate a 'breathing' neural sphere. Integrated Framer Motion for HUD transitions and a simulated Node.js backend for response latency modeling.",
        results: [
            "60FPS 3D Interaction on mobile",
            "Procedural Particle Systems",
            "Glassmorphic HUD Design",
        ],
        techStack: [
            { name: "Next.js 15", description: "App Router Framework" },
            { name: "React Three Fiber", description: "3D Scene Management" },
            { name: "Maath", description: "3D Math Library" },
            { name: "Zustand", description: "State Management" },
        ],
        screenshots: [],
    },
    {
        id: "ai-voice-assistant",
        title: "Enterprise AI Voice Assistant",
        shortDescription:
            "Intelligent voice bot for visa consultation scheduling with real-time natural language processing.",
        fullDescription:
            "A sophisticated AI voice agent designed to automate the visa consultation scheduling process. By integrating Twilio's programmable voice with OpenAI's GPT-4, the system handles complex user queries, checks availability in real-time, and schedules appointments without human intervention, transforming a traditionally manual workflow into an efficient, automated experience.",
        category: "ai",
        featured: true,
        image: "/projects/ai-voice.jpg",
        tags: ["OpenAI", "Twilio", "Node.js", "WebRTC", "Prompt Engineering"],
        github: "https://github.com/ssani/ai-voice-assistant",
        live: "https://ai-voice-assistant.demo.com",
        year: "2024",
        role: "Lead AI Engineer",
        duration: "2 months",
        challenge:
            "The client's manual appointment scheduling was overwhelmed by high call volumes, leading to missed opportunities and customer frustration. They needed a solution that could handle natural conversation, understand varying accents, and maintain context throughout a booking flow.",
        solution:
            "Architected a real-time voice processing pipeline using Twilio Media Streams. Implemented a context-aware conversation state machine that guides users through the booking process while allowing for natural deviations. Utilized advanced prompt engineering to ensure the AI maintained a professional, helpful persona while strictly adhering to business logic.",
        results: [
            "Automated 85% of initial consultation calls",
            "Reduced appointment booking time by 60%",
            "Available 24/7, increasing booking conversion by 40%",
            "Zero latency perception with optimized stream buffering",
        ],
        techStack: [
            { name: "OpenAI GPT-4", description: "Natural Language Understanding & Generation" },
            { name: "Twilio Voice", description: "Telephony & Media Streaming" },
            { name: "Node.js", description: "Real-time server backend" },
            { name: "WebSocket", description: "Low-latency audio streaming" },
            { name: "Render", description: "Cloud deployment infrastructure" },
        ],
        screenshots: [],
    },
    {
        id: "immersive-3d-commerce",
        title: "Immersive 3D Commerce Platform",
        shortDescription:
            "Next-generation e-commerce experience featuring real-time 3D product visualization.",
        fullDescription:
            "A cutting-edge commerce platform that bridges the gap between digital and physical shopping. Users can interact with photorealistic 3D product models in real-time, customize configurations, and view items in AR. Built with performance in mind, ensuring 60fps interaction on mobile devices.",
        category: "web",
        featured: true,
        image: "/projects/dashboard.jpg",
        tags: ["Next.js 16", "R3F", "WebGL", "Tailwind 4", "Zustand"],
        github: "https://github.com/ssani/immersive-3d-commerce",
        live: "https://commerce.demo.com",
        year: "2024",
        role: "Lead Creative Developer",
        duration: "4 months",
        challenge:
            "Standard e-commerce grids fail to convey the physical details of premium products, leading to lower engagement and higher returns. The goal was to build a web-based 3D configurator that loads instantly without requiring heavy app downloads.",
        solution:
            "Leveraged React Three Fiber for declarative 3D scenes integrated within the Next.js App Router. Implemented progressive asset loading and texture compression (KTX2) to keep initial bundle size under 200kb. Used Zustand for state management to sync the UI with the 3D canvas state efficiently.",
        results: [
            "300% increase in user engagement time",
            "40% reduction in product return rates",
            "Featured on Awwwards Site of the Day",
            "Sub-second load times for 3D assets",
        ],
        techStack: [
            { name: "Next.js 16", description: "Hybrid Static/Dynamic Rendering" },
            { name: "React Three Fiber", description: "3D Scene Graph" },
            { name: "Drei / Cannon", description: "Physics & Helpers" },
            { name: "Tailwind CSS 4", description: "Styling Engine" },
            { name: "Zustand", description: "Global State Management" },
        ],
        screenshots: [],
    },
    {
        id: "api-security-scanner",
        title: "Enterprise API Security Scanner",
        shortDescription:
            "A comprehensive platform for discovering, validating, and tracking unsecured API keys across codebases.",
        fullDescription:
            "A mission-critical security tool designed to identify exposed API credentials in public repositories. Features a high-performance .NET 9 backend with CQRS architecture, a Next.js frontend for real-time monitoring via SignalR, and an automated verification bot engine. Deployed via Docker Compose with PostgreSQL persistence.",
        category: "app",
        featured: true,
        image: "/projects/dashboard.jpg",
        tags: [".NET 9", "Next.js", "Docker", "SignalR", "PostgreSQL"],
        github: "https://github.com/TSCarterJr/UnsecuredAPIKeys-OpenSource",
        year: "2024",
        role: "Full Stack Engineer",
        duration: "3 months",
        challenge:
            "DevOps teams often leak credentials in CI/CD logs or public repos. Manual detection is slow and error-prone. The challenge was to build a system that could scan millions of lines of code in real-time and verify key validity without triggering rate limits.",
        solution:
            "Engineered a distributed scanning architecture. The Scraper Bot feeds potential keys into a localized queue, which the Verifier Bot processes using a plugin-based provider system. Used SignalR to push live alerts to the dashboard instantly. Implemented comprehensive rate-limiting and user-managed overrides.",
        results: [
            "Scans 100+ repositories per minute",
            "Real-time alerts via WebSocket/SignalR",
            "Modular 'Provider' architecture for easy extension",
            "Full Docker containerization for one-click deploy",
        ],
        techStack: [
            { name: ".NET 9 WebAPI", description: "High-performance Backend" },
            { name: "Next.js 14", description: "Real-time Dashboard UI" },
            { name: "PostgreSQL & EF Core", description: "Relational Data Persistence" },
            { name: "SignalR", description: "Live WebSocket Communication" },
            { name: "Docker Compose", description: "Microservices Orchestration" },
        ],
        screenshots: [],
    },
    {
        id: "ultimate-portfolio",
        title: "Ultimate 3D Portfolio",
        shortDescription:
            "A next-gen personal portfolio featuring hybrid architecture and immersive 3D.",
        fullDescription:
            "This very website! A showcase of modern web engineering combining the speed of a single-page application with the SEO depth of a multi-page site. Features include a custom Three.js particle system, physics-based magnetic interactions, and a fully dynamic content management architecture.",
        category: "web",
        featured: true,
        image: "/projects/dashboard.jpg", // You can replace this later
        tags: ["Next.js", "Three.js", "TypeScript", "UI/UX", "Creative Dev"],
        github: "https://github.com/ssani/ultimate-portfolio",
        live: "https://ssani.dev",
        year: "2024",
        role: "Creator",
        duration: "Ongoing",
        challenge:
            "Personal portfolios often suffer from the 'single-page vs. multi-page' dilemma. Single pages are engaging but shallow; multi-pages are deep but can feel disjointed. The goal was to build a 'hybrid' experience that merges the best of both.",
        solution:
            "Designed a central hub with seamless navigation that deep-links into rich content pages. utilized Next.js App Router for dynamic route generation based on project metadata. Built a custom 3D scene manager that maintains context across route transitions for a fluid user experience.",
        results: [
            "Hybrid Single/Multi-page Architecture",
            "Custom Physics-based Interaction Engine",
            "Dynamic Route Generation from Data",
            "100% Type-Safe Implementation",
        ],
        techStack: [
            { name: "Next.js 15", description: "Hybrid Routing Architecture" },
            { name: "React Three Fiber", description: "Declarative 3D Scenes" },
            { name: "TypeScript", description: "End-to-end type safety" },
            { name: "Framer Motion", description: "Layout transitions" },
        ],
        screenshots: [],
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.id === slug);
}

export function getFeaturedProjects(): Project[] {
    return projects.filter((project) => project.featured);
}

export function getProjectsByCategory(category: Project["category"]): Project[] {
    return projects.filter((project) => project.category === category);
}
