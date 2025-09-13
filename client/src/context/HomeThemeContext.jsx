import { createContext, useContext, useEffect, useMemo, useState } from "react";

const HomeThemeContext = createContext(null);

const defaultTheme = {
  name: "Home VS Dark",
  colors: {
    bg: "#0d0d0d",        // overall page background (almost black, but softer)
    surface: "#161616",   // card / panel background
    border: "#262626",    // subtle borders around cards & nav
    text: "#f5f5f5",      // main text (soft white)
    muted: "#a3a3a3",     // secondary text (descriptions, labels)
    // accent: "#22c55e",    // lime-500 (your green highlight for buttons/links)
    accent: "#10b981",    // emerald-500 (primary CTA, highlights)
    accentHover: "#059669", // emerald-600 (hover states)
    accentAlt: "#34d399", // emerald-400 (logo, highlighted text, icons)
    accentText: "#0d0d0d",// text on top of accent bg (dark)
    chatUser: "#0d0d0d",
    chatAI: "#10b981",
    error: "#f44747",
  },
};


export function useHomeTheme() {
  const ctx = useContext(HomeThemeContext);
  if (!ctx) throw new Error("useHomeTheme must be used within HomeThemeProvider");
  return ctx;
}

export function HomeThemeProvider({ children, initialTheme }) {
  const [theme, setTheme] = useState(initialTheme || defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([k, v]) => {
      root.style.setProperty(`--home-${k}`, v);
    });
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <HomeThemeContext.Provider value={value}>{children}</HomeThemeContext.Provider>;
}
