/**
 * Design System Tokens - 20/10 Celebration
 * Theme: Minimalist Soft Pink & Ivory Cream — Warm Romantic
 */

export const colors = {
  primary: {
    DEFAULT: "#9B3A5A",
    hover: "#B8476E",
    light: "#C9607F",
    dark: "#7A2845",
    subtle: "#FAEEF3",
  },

  gold: {
    DEFAULT: "#C4965A",
    dark: "#A87A40",
    light: "#DFB87A",
    glow: "rgba(196, 150, 90, 0.30)",
  },

  text: {
    heading: "#3D2020",
    subheading: "#5A2E2E",
    body: "#6B4545",
    muted: "#9E7070",
    white: "#FFFFFF",
    cream: "#FDF6F0",
  },

  neutral: {
    cream: "#FDF6F0",
    blush: "#FAEEF3",
    petal: "#F4D0DB",
    creamTranslucent: "rgba(253, 246, 240, 0.88)",
    glassWhite: "rgba(255, 255, 255, 0.65)",
    glassDark: "rgba(30, 18, 21, 0.65)",
    borderPetal: "rgba(244, 208, 219, 0.55)",
    borderBurgundy: "rgba(155, 58, 90, 0.25)",
  },
};

export const shadows = {
  subtle: "0 4px 16px 0 rgba(155, 58, 90, 0.10)",
  elevated: "0 10px 30px -5px rgba(155, 58, 90, 0.20)",
  gold: "0 8px 20px -4px rgba(196, 150, 90, 0.35)",
  glass: "0 8px 32px 0 rgba(61, 32, 32, 0.10)",
};

export const buttonStyles = {
  primary:
    "bg-[#9B3A5A] hover:bg-[#B8476E] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer",

  secondary:
    "border border-[#9B3A5A]/50 text-[#9B3A5A] hover:bg-[#9B3A5A] hover:text-white bg-white/60 backdrop-blur-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer",

  gold:
    "bg-gradient-to-r from-[#C4965A] to-[#A87A40] hover:from-[#DFB87A] hover:to-[#C4965A] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer",

  glass:
    "bg-white/55 hover:bg-white/80 dark:bg-[#1e1215]/50 dark:hover:bg-[#1e1215]/70 backdrop-blur-md text-[#3D2020] dark:text-white border border-[#F4D0DB]/60 font-semibold rounded-full shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.03] active:scale-95 cursor-pointer",
};

export default {
  colors,
  shadows,
  buttonStyles,
};

