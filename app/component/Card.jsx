import React from "react";

/**
 * Reusable Glass Card Component — Minimalist Soft Pink & Ivory theme
 */
export default function Card({
  className = "",
  children,
  blur = "md",
  glow = false,
  ...props
}) {
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
  };

  const glowClass = glow
    ? "shadow-[0_12px_40px_0_rgba(155,58,90,0.14),0_2px_8px_0_rgba(196,150,90,0.08)]"
    : "shadow-[0_4px_24px_0_rgba(155,58,90,0.08)]";

  return (
    <div
      className={`bg-white/70 dark:bg-[#1e1215]/70 ${blurClasses[blur] || blurClasses.md} border border-[#F4D0DB]/60 dark:border-white/10 rounded-3xl p-6 md:p-8 ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
