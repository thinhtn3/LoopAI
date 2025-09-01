import FeatureCard from "./FeatureCard";

export default function FeaturesGrid() {
  return (
    <section className="w-full px-6 py-16" style={{ backgroundColor: 'var(--home-bg)', color: 'var(--home-text)' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="VS Code-like IDE"
          description="Monaco Editor, dark theme, bracket matching, and quick run."
        />
        <FeatureCard
          title="Adaptive interviewing"
          description="Questions adapt with context-aware hints."
        />
        <FeatureCard
          title="Detailed feedback"
          description="Reports on complexity, edge cases, and code quality."
        />
      </div>
    </section>
  );
}
