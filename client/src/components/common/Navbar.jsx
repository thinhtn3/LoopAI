import { NavLink } from "react-router-dom";
import { useHomeTheme } from "@/context/HomeThemeContext";

export default function Navbar() {
  const { theme } = useHomeTheme();

  const links = [
    { to: "/", label: "Landing" },
    { to: "/home", label: "Home" },
    { to: "/interview", label: "Interview" },
  ];

  const linkClass = ({ isActive }) =>
    [
      "px-3 py-2 rounded-md text-sm font-medium",
      isActive ? `bg-${theme.colors.accent} text-${theme.colors.accentText}` : `text-${theme.colors.text} hover:bg-${theme.colors.border}`,
    ].join(" ");

  return (
    <header
      style={{
        backgroundColor: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
        color: theme.colors.accentAlt,
        fontSize: "10px",
        width: "100%",
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">LoopAI</h1>
          <nav className="flex items-center gap-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={linkClass}
                end={l.to === "/"}
                style={{
                  color: theme.colors.text,
                  fontSize: "16px",
                }}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
