import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--home-bg)',
        color: 'var(--home-text)',
        marginLeft: 'calc(50% - 50vw)'
      }}
    >
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(1000px 400px at 20% -10%, var(--home-glowBlue), transparent), radial-gradient(800px 300px at 80% 10%, var(--home-glowGreen), transparent)'
      }} />

      <div className="relative w-full px-6 pt-24 pb-16">
        <div className="w-full max-w-none">
          <span className="inline-block text-xs tracking-wider uppercase px-2 py-1 rounded border" style={{ borderColor: 'var(--home-border)', color: 'var(--home-muted)' }}>
            Mock Technical Interviews
          </span>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight" style={{ color: 'var(--home-text)' }}>
            Practice like it’s the real interview
          </h1>

          <p className="mt-4 text-lg md:text-xl max-w-2xl" style={{ color: 'var(--home-muted)' }}>
            Code in a VS Code–like IDE, get instant AI feedback, and refine your answers with guided hints and solutions.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link to="/interview">Start a mock interview</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="#how">How it works</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
