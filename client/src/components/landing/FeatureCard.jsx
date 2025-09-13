import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeatureCard({
  title,
  description,
  icon,
  width,
  height,
}) {
  return (
    <div className="flex flex-col items-center justify-center w-1/5 gap-2 text-[var(--home-accentHover)]">
      <div className="w-15 h-15 flex items-center justify-center border border-[var(--home-accent)] rounded-sm">
        {icon}
      </div>
      <p className="text-[var(--home-text)] text-center">{title}</p>
      <p className="text-[var(--home-muted)] text-center">{description}</p>
    </div>
  );
}
