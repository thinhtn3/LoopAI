import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.jsx";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const links = [
    { to: "/", label: "Home" },
    { to: "/problems", label: "Problems" },
    // { to: "/interview", label: "Interview" },
  ];

  const linkClass = ({ isActive }) =>
    [
      "px-3 py-2 rounded-md xl:text-sm 2xl:text-lg font-medium",
      isActive
        ? `text-[var(--home-accent)]`
        : `text-[var(--home-text)] hover:bg-[var(--home-border)]`,
    ].join(" ");

  const handleLogout = async () => {
    await logout();
    console.log("Logged out");
    navigate("/");
  };

  return (
    <header className="bg-[var(--home-surface)] border-b border-[var(--home-border)] w-[100vw] xl:text-lg 2xl:text-xl">
      <div className="flex items-center justify-between px-8">
        <NavLink className="flex items-center" to="/">
          <img
            src="/src/assets/icon.png"
            alt="LoopAI"
            className="sm:w-5 lg:w-5 xl:w-15 2xl:w-20"
          />
          <h1 className="font-bold text-[var(--home-accentAlt)]">LoopAI</h1>
        </NavLink>

        <div>
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
        <div className="flex items-center gap-2">
          {user ? (
            <button
              className="px-3 py-2 rounded-md xl:text-sm 2xl:text-lg font-medium text-[var(--home-text)] hover:bg-[var(--home-border)]"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <NavLink className={linkClass} to="/auth">
              Login
            </NavLink>
          )}
        </div>

      </div>
    </header>
  );
}
