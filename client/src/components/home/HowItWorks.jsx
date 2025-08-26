import MagicFeatureCard from '@/components/magicui/MagicFeatureCard';

export default function HowItWorks() {
  return (
    <section id="how" className="w-full px-6 pb-20" style={{ backgroundColor: 'var(--home-bg)', color: 'var(--home-text)' }}>
      <h2 className="text-2xl font-bold mb-6">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MagicFeatureCard
          title="VS Code-like IDE"
          description="Monaco Editor, dark theme, bracket matching, and quick run."
        />
        
        <MagicFeatureCard
          title="VS Code-like IDE"
          description="Monaco Editor, dark theme, bracket matching, and quick run."
        />
        
        
        <MagicFeatureCard
          title="VS Code-like IDE"
          description="Monaco Editor, dark theme, bracket matching, and quick run."
        />
      </div>

    </section>
  );
}
