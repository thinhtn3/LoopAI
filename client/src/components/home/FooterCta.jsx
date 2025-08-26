import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function FooterCta() {
  return (
    <section className="border-t" style={{ borderColor: 'var(--home-border)', backgroundColor: 'var(--home-surface)' }}>
      <div className="w-full px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Ready to start your mock interview?</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--home-muted)' }}>Jump into an interactive session and get real-time guidance.</p>
        </div>
        <Button asChild>
          <Link to="/interview">Start now</Link>
        </Button>
      </div>
    </section>
  );
}
