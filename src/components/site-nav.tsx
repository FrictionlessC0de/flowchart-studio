import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";

const links = [
  { to: "/", label: "Animation" },
  { to: "/symbols", label: "Symbol Definitions" },
] as const;

export function SiteNav() {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("flowchart-theme");
    const nextTheme = savedTheme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("flowchart-theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <nav aria-label="Main navigation" className="px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="fc-nav-bar mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-2xl px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 md:px-5">
        <Link to="/" className="flex shrink-0 items-center gap-2 font-semibold tracking-tight">
          <svg viewBox="0 0 32 32" className="h-6 w-6">
            <rect x="3" y="11" width="18" height="10" rx="5" className="fc-nav-shape" />
            <polygon points="23,10 30,10 27,22 26,22" className="fc-nav-shape" />
          </svg>
          <span className="hidden text-xs font-semibold tracking-tight text-foreground sm:inline sm:text-sm">Flowchart</span>
          <span className="fc-title hidden font-semibold tracking-tight sm:inline">Studio</span>
        </Link>
        <div className="flex min-w-0 items-center justify-center gap-0.5 rounded-full border border-border bg-background/30 p-0.5 backdrop-blur-xl sm:gap-1 sm:p-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              aria-label={l.label}
              className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] font-medium transition-all sm:px-4 sm:text-sm ${pathname === l.to ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"}`}
              activeOptions={{ exact: true }}
            >
              <span className="sm:hidden">{l.to === "/" ? "Chart" : "Guide"}</span>
              <span className="hidden sm:inline">{l.label}</span>
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "day" : "night"} theme`}
          title={`Switch to ${theme === "dark" ? "day" : "night"} theme`}
          className="fc-theme-toggle inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition hover:-translate-y-0.5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-10 sm:w-10"
        >
          {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
        </button>
      </div>
    </nav>
  );
}
