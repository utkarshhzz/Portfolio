import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "crowdwisdom-ai",
    name: "CrowdWisdom.AI",
    description:
      "Multi-Agent AI orchestration platform for collective intelligence and automated decision synthesis with real-time voice output.",
    longDescription:
      "A sophisticated multi-agent AI platform that orchestrates specialized LLM agents to aggregate crowd intelligence, synthesize diverse perspectives, and generate structured decisions. Features real-time voice synthesis via ElevenLabs and a LangGraph-powered agent workflow engine with streaming responses.",
    tech: ["Python", "FastAPI", "LangGraph", "OpenAI", "ElevenLabs"],
    category: "ai",
    featured: true,
    githubUrl: "https://github.com/utkarshrpg",
    demoUrl: undefined,
  },
  {
    id: "ai-candidate-discovery",
    name: "AI Candidate Discovery Engine",
    description:
      "Production-grade semantic search system surfacing the top 10 candidates from 110M+ resumes in under 10 seconds.",
    longDescription:
      "An enterprise-scale AI search system combining OpenAI text embeddings with Azure AI Search's vector indexing to perform semantic retrieval across a corpus of 110 million resumes. Includes a GPT-powered explanation layer generating natural-language match rationales for every result.",
    tech: ["OpenAI", "Azure AI Search", "FastAPI", "PostgreSQL"],
    category: "ai",
    featured: true,
    githubUrl: "https://github.com/utkarshrpg",
    demoUrl: undefined,
  },
  {
    id: "smurfpakad",
    name: "SmurfPakad",
    description:
      "Blockchain fraud detection using Graph Neural Networks to identify smurf account clusters in Web3 gaming ecosystems.",
    longDescription:
      "A GNN-based fraud detection system that models wallet transaction graphs to identify smurf account networks in blockchain gaming. Uses GraphSAGE to learn structural patterns of fraudulent clusters, with an interactive D3.js graph explorer for visualization.",
    tech: ["GraphSAGE", "PyTorch Geometric", "FastAPI", "Docker", "D3.js"],
    category: "ai",
    featured: true,
    githubUrl: "https://github.com/utkarshrpg",
    demoUrl: undefined,
  },
  {
    id: "agnisense",
    name: "AgniSense",
    description:
      "AI-powered wildfire early-detection system using satellite imagery and multi-modal sensor fusion. 🏆 National Hackathon Winner — ₹75,000.",
    longDescription:
      "AgniSense uses satellite imagery analysis and multi-modal sensor data fusion to detect wildfire risk in real-time. Won first place at a national-level hackathon competing against 100+ teams, with a ₹75,000 prize.",
    tech: ["Computer Vision", "Satellite Imagery", "Multi-modal AI", "FastAPI"],
    category: "ai",
    featured: true,
    githubUrl: "https://github.com/utkarshrpg",
    demoUrl: undefined,
  },
  {
    id: "gender-classification",
    name: "Gender Classification App",
    description:
      "Real-time gender classification with live webcam inference and confidence scoring using a fine-tuned PyTorch CNN.",
    longDescription:
      "A computer vision application that performs real-time gender classification using a fine-tuned PyTorch CNN. Integrates OpenCV for webcam capture and preprocessing, served via a lightweight Flask API with a responsive web frontend. Achieved 92%+ accuracy with optimized preprocessing pipeline.",
    tech: ["PyTorch", "OpenCV", "Flask", "Python"],
    category: "ai",
    githubUrl: "https://github.com/utkarshrpg",
    demoUrl: undefined,
  },
  {
    id: "rainfall-prediction",
    name: "Rainfall Prediction System",
    description:
      "Research-grade ML forecasting trained on 15 years of NASA satellite data across 210 weather stations. R² = 0.581.",
    longDescription:
      "A machine learning pipeline for sub-seasonal rainfall prediction built on 15 years of NASA TRMM/GPM satellite observations across 210 stations. Achieved R² = 0.581, MAE = 2.17 mm, and Skill Score = 0.510 — outperforming climatological baselines on all evaluation metrics.",
    tech: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "NASA TRMM/GPM"],
    category: "research",
    githubUrl: "https://github.com/utkarshrpg",
    demoUrl: undefined,
  },
];
