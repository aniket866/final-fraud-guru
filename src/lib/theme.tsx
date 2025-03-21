
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeAccent = "blue" | "purple" | "teal" | "amber" | "rose" | "neon" | "cyan" | "magenta" | "green" | "red" | "orange";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultAccent?: ThemeAccent;
}

interface ThemeContextType {
  theme: Theme;
  accent: ThemeAccent;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: ThemeAccent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  defaultAccent = "teal",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [accent, setAccent] = useState<ThemeAccent>(defaultAccent);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous theme classes
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Remove previous accent classes
    root.classList.remove(
      "purple-theme", 
      "teal-theme", 
      "amber-theme", 
      "rose-theme", 
      "neon-theme", 
      "cyan-theme", 
      "magenta-theme",
      "green-theme",
      "red-theme",
      "orange-theme"
    );
    
    // Add accent class if not the default blue
    if (accent !== "blue") {
      switch (accent) {
        case "purple":
          root.classList.add("purple-theme");
          break;
        case "teal":
          root.classList.add("teal-theme");
          break;
        case "amber":
          root.classList.add("amber-theme");
          break;
        case "rose":
          root.classList.add("rose-theme");
          break;
        case "neon":
          root.classList.add("neon-theme");
          break;
        case "cyan":
          root.classList.add("cyan-theme");
          break;
        case "magenta":
          root.classList.add("magenta-theme");
          break;
        case "green":
          root.classList.add("green-theme");
          break;
        case "red":
          root.classList.add("red-theme");
          break;
        case "orange":
          root.classList.add("orange-theme");
          break;
        default:
          break;
      }
    }
    
    // Save preferences to localStorage
    localStorage.setItem("theme", theme);
    localStorage.setItem("accent", accent);
  }, [theme, accent]);

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const savedAccent = localStorage.getItem("accent") as ThemeAccent | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference if no saved theme
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
    
    if (savedAccent) {
      setAccent(savedAccent);
    }
  }, []);

  const value = {
    theme,
    accent,
    setTheme,
    setAccent,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
