import { Link } from "react-router-dom";
import { BoxReveal } from "@/components/magicui/box-reveal";
import DefaultButton from "@/components/common/DefaultButton";
import { Zap } from "lucide-react";
import { Safari } from "@/components/magicui/safari";
import demo from "@/assets/demo1.png";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { useAuth } from "@/hooks/useAuth.jsx";

export default function Hero() {
  const { user } = useAuth();
  return (
    <section className="h-1/2 bg-[var(--home-bg)] text-[var(--home-text)]">
      <div className="relative w-full px-6 pt-24 pb-16">
        <div className="w-full max-w-none flex flex-col items-center gap-8">

          {/* Hero Text */}
          <div className="flex flex-col items-center">
            {/* Hero title */}
            <div className="inline-flex items- px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              MOCK TECHNICAL INTERVIEWS
            </div>
            <BoxReveal boxColor="var(--home-accent)" duration={0.4}>
              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-[var(--home-text)]">
                Practice like it’s the{" "}
                <span className="text-[var(--home-accent)]">
                  real interview
                </span>
              </h1>
            </BoxReveal>
            {/* Hero description */}
            <BoxReveal
              className=""
              boxColor="var(--home-accent)"
              duration={0.5}
            >
              <p className="mt-4 text-lg md:text-xl max-w-2xl text-center text-[var(--home-muted)]">
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
                style={{ color: "var(--home-accentText)" }}
                to={user ? "/problems" : "/auth"}
              >
                Get Started
              </Link>
            </DefaultButton>
          </div>

          {/* Hero Demo */}
          <div className="w-full h-full flex justify-center">
            <NeonGradientCard className="w-[1100px]" borderSize={0}>
              <Safari
                imageSrc={demo}
                url="https://loopai.com"
                mode="default"
                className="w-full h-full"
              />
            </NeonGradientCard>
          </div>
        </div>
      </div>
    </section>
  );
}
