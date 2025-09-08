import { NavLink } from "react-router-dom";
import { useHomeTheme } from "@/context/HomeThemeContext";

export default function Navbar() {
  const { theme } = useHomeTheme();

  const links = [
    { to: "/", label: "Landing" },
    { to: "/home", label: "Home" },
    // { to: "/interview", label: "Interview" },
  ];

  const linkClass = ({ isActive }) =>
    [
      "px-3 py-2 rounded-md xl:text-sm 2xl:text-lg font-medium",
      isActive
        ? `text-[var(--home-accent)]`
        : `text-[var(--home-text)] hover:bg-[var(--home-border)]`,
    ].join(" ");

  return (
    <header className="bg-[var(--home-surface)] border-b border-[var(--home-border)] w-[100vw] xl:h-1/16 2xl:h-1/18 xl:text-lg 2xl:text-xl">
      <div className="flex items-center justify-between px-8">

        <NavLink className="flex items-center" to="/">
          <img src="/src/assets/icon.png" alt="LoopAI" className="xl:w-14 2xl:w-20" />
          <h1 className="font-bold text-[var(--home-accentAlt)]">LoopAI</h1>
        </NavLink>

        <nav className="flex items-center gap-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={linkClass}
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
}
