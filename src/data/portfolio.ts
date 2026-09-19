// ============================================================================
// PORTFOLIO DATA CONFIG — Unified project model for the 3D carousel
// ============================================================================

export const personalInfo = {
  name: "Your Name",
  role: "Video Editor & Software Engineer",
  tagline: "I edit stories and build software",
  bio: "A CS engineering student with a passion for visual storytelling. I split my time between crafting cinematic edits and building elegant software — bridging the gap between creativity and code.",
  philosophy:
    "My design style is rooted in typography, editorial layouts and simplicity, often combined with motion to create custom experiences that feel polished, modern and considered.",
};

// ---------------------------------------------------------------------------
// Project Interface
// ---------------------------------------------------------------------------
export interface Project {
  id: string;
  title: string;
  description: string;
  client?: string;
  year: string;
  category: "video" | "software";
  /** CSS gradient string for card background */
  gradient: string;
  /** Primary accent colour */
  accentColor: string;
  /** Text colour that contrasts with the gradient */
  textColor: string;
  tags: string[];
  url?: string;
  githubUrl?: string;
  youtubeId?: string;
  award?: boolean;
}

// ---------------------------------------------------------------------------
// Projects — interleaved video & software for visual variety in the carousel
// ---------------------------------------------------------------------------
export const projects: Project[] = [
  {
    id: "mountain-escape",
    title: "Mountain Escape",
    description:
      "A cinematic travel reel capturing the raw beauty of alpine landscapes with dynamic transitions and color grading.",
    year: "2024",
    category: "video",
    gradient:
      "linear-gradient(145deg, #1a2e0a 0%, #2d4a1a 30%, #1a3310 60%, #0d1f08 100%)",
    accentColor: "#4a8c1c",
    textColor: "#d4e8c4",
    tags: ["Premiere Pro", "Color Grading", "Cinematography"],
    youtubeId: "dQw4w9WgXcQ",
    award: true,
  },
  {
    id: "devflow",
    title: "DevFlow",
    description:
      "A real-time collaborative code editor with live cursors, syntax highlighting, and integrated terminal.",
    client: "Personal Project",
    year: "2024",
    category: "software",
    gradient:
      "linear-gradient(145deg, #0a0a2e 0%, #1a1a3e 30%, #0f1a40 60%, #080820 100%)",
    accentColor: "#4466ff",
    textColor: "#b8c8f4",
    tags: ["Next.js", "TypeScript", "WebSockets"],
    githubUrl: "https://github.com/yourusername/devflow",
    url: "https://devflow.example.com",
  },
  {
    id: "urban-pulse",
    title: "Urban Pulse",
    description:
      "High-energy city montage blending time-lapses, drone footage, and beat-synced cuts.",
    year: "2024",
    category: "video",
    gradient:
      "linear-gradient(145deg, #1f1a0a 0%, #3a2e18 30%, #2a1f0e 60%, #151008 100%)",
    accentColor: "#d4a84c",
    textColor: "#f0e0c0",
    tags: ["After Effects", "Motion Graphics", "Sound Design"],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "neuralviz",
    title: "NeuralViz",
    description:
      "Interactive 3D visualization of neural network architectures — inspect layers and weights right in the browser.",
    client: "Research Lab",
    year: "2024",
    category: "software",
    gradient:
      "linear-gradient(145deg, #1a0a2e 0%, #2a1a40 30%, #1f1035 60%, #0d0818 100%)",
    accentColor: "#9966ff",
    textColor: "#d4c0f4",
    tags: ["React", "Three.js", "Python"],
    githubUrl: "https://github.com/yourusername/neuralviz",
    url: "https://neuralviz.example.com",
    award: true,
  },
  {
    id: "product-aurelia",
    title: "Product Launch — Aurelia",
    description:
      "Sleek product reveal video with 3D motion graphics and refined typography for a fictional tech brand.",
    client: "Aurelia Brand",
    year: "2023",
    category: "video",
    gradient:
      "linear-gradient(145deg, #2e2e2e 0%, #1a1a1a 30%, #252525 60%, #0f0f0f 100%)",
    accentColor: "#f0f0f0",
    textColor: "#e8e8e8",
    tags: ["After Effects", "Cinema 4D", "Typography"],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "clouddeploy",
    title: "CloudDeploy CLI",
    description:
      "A developer CLI tool for one-command deploys to AWS, GCP, and Azure with environment management.",
    year: "2023",
    category: "software",
    gradient:
      "linear-gradient(145deg, #0a1a1a 0%, #0f2828 30%, #0a2020 60%, #061515 100%)",
    accentColor: "#44ccaa",
    textColor: "#c0f0e0",
    tags: ["Go", "Docker", "AWS SDK"],
    githubUrl: "https://github.com/yourusername/clouddeploy",
  },
  {
    id: "documentary-roots",
    title: "Documentary Short: Roots",
    description:
      "A 5-minute documentary exploring local artisan culture with interview-driven storytelling.",
    year: "2023",
    category: "video",
    gradient:
      "linear-gradient(145deg, #1a140a 0%, #2e2418 30%, #241c10 60%, #120e06 100%)",
    accentColor: "#c49040",
    textColor: "#e8d8c0",
    tags: ["DaVinci Resolve", "Storytelling", "Interviews"],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "markdown-garden",
    title: "Markdown Garden",
    description:
      "A digital garden / wiki built with MDX, full-text search, and bi-directional linking between notes.",
    client: "Open Source",
    year: "2023",
    category: "software",
    gradient:
      "linear-gradient(145deg, #0a1a0a 0%, #142814 30%, #0f200f 60%, #061006 100%)",
    accentColor: "#66cc66",
    textColor: "#c0eec0",
    tags: ["Next.js", "MDX", "Tailwind"],
    githubUrl: "https://github.com/yourusername/markdown-garden",
    url: "https://garden.example.com",
  },
  {
    id: "music-drift",
    title: "Music Video — Drift",
    description:
      "Narrative music video featuring choreographed sequences, lens flares, and experimental color science.",
    year: "2023",
    category: "video",
    gradient:
      "linear-gradient(145deg, #1a0a1a 0%, #2e182e 30%, #241024 60%, #120812 100%)",
    accentColor: "#cc66cc",
    textColor: "#eec0ee",
    tags: ["Premiere Pro", "Color Science", "Choreography"],
    youtubeId: "dQw4w9WgXcQ",
    award: true,
  },
  {
    id: "pixelsort",
    title: "PixelSort",
    description:
      "Real-time pixel sorting art generator using WebGL shaders with adjustable parameters and export options.",
    year: "2023",
    category: "software",
    gradient:
      "linear-gradient(145deg, #1a0a0a 0%, #2e1818 30%, #241010 60%, #120606 100%)",
    accentColor: "#ff6666",
    textColor: "#f4c0c0",
    tags: ["TypeScript", "WebGL", "GLSL"],
    githubUrl: "https://github.com/yourusername/pixelsort",
    url: "https://pixelsort.example.com",
  },
  {
    id: "event-reel",
    title: "Event Highlight Reel",
    description:
      "Fast-paced event recap with multi-cam editing, smooth slow-motion, and an upbeat soundtrack.",
    year: "2022",
    category: "video",
    gradient:
      "linear-gradient(145deg, #0a1a2e 0%, #182e3e 30%, #102030 60%, #081018 100%)",
    accentColor: "#4499dd",
    textColor: "#c0d8f4",
    tags: ["Multi-Cam", "Slow Motion", "Sound Design"],
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "securevault",
    title: "SecureVault",
    description:
      "End-to-end encrypted password manager with zero-knowledge architecture and browser extension.",
    year: "2022",
    category: "software",
    gradient:
      "linear-gradient(145deg, #1a1a0a 0%, #28280f 30%, #20200a 60%, #101006 100%)",
    accentColor: "#cccc44",
    textColor: "#eeeec0",
    tags: ["React", "Node.js", "Web Crypto"],
    githubUrl: "https://github.com/yourusername/securevault",
  },
];

// ---------------------------------------------------------------------------
// Social Links
// ---------------------------------------------------------------------------
export const socialLinks = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  instagram: "https://instagram.com/yourusername",
  youtube: "https://youtube.com/@yourusername",
  email: "hello@youremail.com",
};
