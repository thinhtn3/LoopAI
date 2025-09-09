import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BoxReveal } from "@/components/magicui/box-reveal";
import DefaultButton from "@/components/common/DefaultButton";
import { useHomeTheme } from "@/context/HomeThemeContext";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Hero() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      setAuthenticated(data.session !== null);
    };
    checkAuth();
  }, []);

  const { theme } = useHomeTheme();
  return (
    <section
      className="h-[50%]"
      style={{
        background: theme.colors.bg,
        color: theme.colors.text,
        marginLeft: "calc(50% - 50vw)",
      }}
    >
      <div className="relative w-full px-6 pt-24 pb-16">
        <div className="w-full max-w-none">
          {/* <span
            className="inline-block text-xs tracking-wider uppercase px-2 py-1 rounded border"
            style={{
              borderColor: theme.colors.border,
              color: theme.colors.muted,
            }}
          >
            Mock Technical Interviews
          </span> */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
            {/* <Zap className="w-4 h-4 mr-2" /> */}
            MOCK TECHNICAL INTERVIEWS
          </div>

          <BoxReveal boxColor={theme.colors.accent} duration={0.4}>
            <h1
              className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight"
              style={{ color: theme.colors.text }}
            >
              Practice like it’s the{" "}
              <span style={{ color: theme.colors.accent }}>real interview</span>
            </h1>
          </BoxReveal>

          <BoxReveal boxColor={theme.colors.accent} duration={0.5}>
            <p
              className="mt-4 text-lg md:text-xl max-w-2xl"
              style={{ color: theme.colors.muted }}
            >
              Code in a VS Code–like IDE, get instant AI feedback, and refine
              your answers with guided hints and solutions.
            </p>
          </BoxReveal>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DefaultButton
              asChild //passes parent styling to child which is Link
              className="w-1/7 h-10.5 text-left text-md font-medium bg-[var(--home-accent)] text-[var(--home-accentText)] border border-[var(--home-border)] transition-all duration-150 hover:bg-[var(--home-accentHover)] hover:w-1/6"
            >
              <Link style={{ color: theme.colors.accentText }} to={authenticated ? "/home" : "/auth"}>
                Start a mock interview
              </Link>
            </DefaultButton>
          </div>
        </div>
      </div>
    </section>
  );
}
