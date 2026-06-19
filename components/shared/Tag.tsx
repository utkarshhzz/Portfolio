import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "outline";
  className?: string;
}

export default function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium tracking-wide",
        variant === "default" &&
          "bg-white/[0.05] text-[#a1a1aa] border border-white/[0.08]",
        variant === "accent" &&
          "bg-blue-500/10 text-blue-400 border border-blue-500/20",
        variant === "outline" &&
          "bg-transparent text-white border border-white/[0.12]",
        className
      )}
    >
      {children}
    </span>
  );
}
