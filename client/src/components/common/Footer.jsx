export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--home-border)] bg-[var(--home-surface)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 flex items-center justify-between">
        <p className="xl:text-sm 2xl:text-lg text-[var(--home-muted)]">
          © {new Date().getFullYear()} LoopAI
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="xl:text-sm 2xl:text-lg text-[var(--home-text)] hover:text-[var(--home-accent)]"
          >
            Privacy
          </a>
          <a
            href="#"
            className="xl:text-sm 2xl:text-lg text-[var(--home-text)] hover:text-[var(--home-accent)]"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}