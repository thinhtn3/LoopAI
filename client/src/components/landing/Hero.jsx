import { Link } from "react-router-dom";
import { BoxReveal } from "@/components/magicui/box-reveal";
import DefaultButton from "@/components/common/DefaultButton";
import { useHomeTheme } from "@/context/HomeThemeContext";
import { Zap } from "lucide-react";
import { Safari } from "@/components/magicui/safari";
import demo from "@/assets/demo1.png";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export default function Hero({ user, isLoading }) {
  const { theme } = useHomeTheme();
  return (
    <section
      className="h-1/2"
      style={{
        background: theme.colors.bg,
        color: theme.colors.text,
        marginLeft: "calc(50% - 50vw)",
      }}
    >
      <div className="relative w-full px-6 pt-24 pb-16">
        <div className="w-full max-w-none flex flex-col items-center gap-8">
          {/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background"></div> */}

          {/* Hero title */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items- px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              MOCK TECHNICAL INTERVIEWS
            </div>
            <BoxReveal boxColor={theme.colors.accent} duration={0.4}>
              <h1
                className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight"
                style={{ color: theme.colors.text }}
              >
                Practice like it’s the{" "}
                <span style={{ color: theme.colors.accent }}>
                  real interview
                </span>
              </h1>
            </BoxReveal>

            {/* Hero description */}
            <BoxReveal
              className=""
              boxColor={theme.colors.accent}
              duration={0.5}
            >
              <p
                className="mt-4 text-lg md:text-xl max-w-2xl text-center"
                style={{ color: theme.colors.muted }}
              >
                Code in a VS Code–like IDE, get instant AI feedback, and refine
                your answers with guided hints and solutions.
              </p>
            </BoxReveal>
          </div>

          {/* Start a mock interview button */}
          <div className="mt-8 flex flex-wrap items-start gap-3">
            <DefaultButton
              asChild //passes parent styling to child which is Link
              className=" h-10.5 text-left text-md font-medium bg-[var(--home-accent)] text-[var(--home-accentText)] border border-[var(--home-border)] transition-all duration-150 hover:bg-[var(--home-accentHover)]"
            >
              <Link
                style={{ color: theme.colors.accentText }}
                to={user ? "/problems" : "/auth"}
              >
                Get Started
              </Link>
            </DefaultButton>
          </div>

          <div className="w-full h-full flex justify-center">
            <NeonGradientCard
              className="w-[1100px]"
              borderSize={0}
            >
              <Safari
                imageSrc={demo}
                url="https://loopai.com"
                mode="default"
                className="w-full h-full"
              />
            </NeonGradientCard>
          </div>

          {/* <div className="w-screen flex justify-center drop-shadow-lg">
            <Safari
              imageSrc={demo}
              url="https://loopai.com"
              width={1210}
              height={683}
              mode="default"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
