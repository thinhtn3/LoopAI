import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BoxReveal } from "@/components/magicui/box-reveal";
import DefaultButton from "@/components/common/DefaultButton";
import { useHomeTheme } from "@/context/HomeThemeContext";

export default function Hero() {
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
          <span
            className="inline-block text-xs tracking-wider uppercase px-2 py-1 rounded border"
            style={{
              borderColor: theme.colors.border,
              color: theme.colors.muted,
            }}
          >
            Mock Technical Interviews
          </span>

          <BoxReveal boxColor={theme.colors.accent} duration={0.4}>
            <h1
              className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight"
              style={{ color: theme.colors.text }}
            >
              Practice like it’s the <span style={{ color: theme.colors.accent }}>real interview</span>
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
              className="w-1/7 text-left"
              style={{
                backgroundColor: theme.colors.accent,
                color: theme.colors.accentText,
              }}
            >
              <Link to="/interview">Start a mock interview</Link>
            </DefaultButton>
          </div>
        </div>
      </div>
    </section>
  );
}
