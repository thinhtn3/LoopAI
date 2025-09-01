import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BoxReveal } from "@/components/magicui/box-reveal";
import DefaultButton from "@/components/common/DefaultButton";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--home-bg)",
        color: "var(--home-text)",
        marginLeft: "calc(50% - 50vw)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1000px 400px at 20% -10%, var(--home-glowBlue), transparent), radial-gradient(800px 300px at 80% 10%, var(--home-glowGreen), transparent)",
        }}
      />

      <div className="relative w-full px-6 pt-24 pb-16">
        <div className="w-full max-w-none">
          <span
            className="inline-block text-xs tracking-wider uppercase px-2 py-1 rounded border"
            style={{
              borderColor: "var(--home-border)",
              color: "var(--home-muted)",
            }}
          >
            Mock Technical Interviews
          </span>

          <BoxReveal boxColor={"var(--home-glowBlue"} duration={0.4}>
            <h1
              className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight"
              style={{ color: "var(--home-text)" }}
            >
              Practice like it’s the real interview
            </h1>
          </BoxReveal>

          <BoxReveal boxColor={"var(--home-glowBlue"} duration={0.5}>
            <p
              className="mt-4 text-lg md:text-xl max-w-2xl"
              style={{ color: "var(--home-muted)" }}
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
                backgroundColor: "var(--home-glowBlue)",
                color: "var(--home-text)",
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
