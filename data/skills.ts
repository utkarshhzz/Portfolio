import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-engineering",
    name: "AI Engineering",
    icon: "Brain",
    skills: [
      { name: "LLMs" }, { name: "RAG" }, { name: "AI Agents" },
      { name: "LangChain" }, { name: "LangGraph" }, { name: "OpenAI API" },
      { name: "HuggingFace" }, { name: "Prompt Engineering" },
      { name: "Multi-Agent Systems" }, { name: "Vector Embeddings" },
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    icon: "Cpu",
    skills: [
      { name: "PyTorch" }, { name: "Scikit-Learn" }, { name: "XGBoost" },
      { name: "Computer Vision" }, { name: "OpenCV" },
      { name: "Graph Neural Networks" }, { name: "PyTorch Geometric" },
      { name: "Transfer Learning" }, { name: "Ensemble Methods" },
    ],
  },
  {
    id: "backend",
    name: "Backend Systems",
    icon: "Server",
    skills: [
      { name: "FastAPI" }, { name: "Flask" }, { name: "Node.js" },
      { name: "PostgreSQL" }, { name: "Redis" }, { name: "REST APIs" },
      { name: "WebSockets" }, { name: "SQLAlchemy" }, { name: "Pydantic" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: "Monitor",
    skills: [
      { name: "React" }, { name: "Next.js" }, { name: "TypeScript" },
      { name: "Tailwind CSS" }, { name: "Framer Motion" }, { name: "D3.js" },
      { name: "HTML / CSS" }, { name: "JavaScript (ES2024)" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    icon: "Cloud",
    skills: [
      { name: "Azure AI Search" }, { name: "AWS" }, { name: "GCP" },
      { name: "Docker" }, { name: "Vercel" }, { name: "CI/CD" },
      { name: "GitHub Actions" }, { name: "Linux" },
    ],
  },
  {
    id: "languages",
    name: "Languages",
    icon: "Code2",
    skills: [
      { name: "Python" }, { name: "TypeScript" }, { name: "JavaScript" },
      { name: "SQL" }, { name: "Bash / Shell" }, { name: "C++" },
      { name: "Java" },
    ],
  },
  {
    id: "dsa",
    name: "DSA & Problem Solving",
    icon: "BookOpen",
    skills: [
      { name: "LeetCode" }, { name: "Dynamic Programming" }, { name: "Graph Algorithms" },
      { name: "Trees & BSTs" }, { name: "Sliding Window" }, { name: "Binary Search" },
      { name: "Divide & Conquer" }, { name: "Greedy Algorithms" }, { name: "Backtracking" },
      { name: "Two Pointers" }, { name: "Heap / Priority Queue" }, { name: "Tries" },
      { name: "Union Find" }, { name: "Segment Trees" }, { name: "Bit Manipulation" },
    ],
  },
];
