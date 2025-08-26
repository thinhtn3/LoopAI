import { MagicCard } from "@/components/magicui/magic-card";
import { ShineBorder } from "@/components/magicui/shine-border";
import { cn } from "@/lib/utils";

export default function MagicFeatureCard({
  title,
  description,
  className,
  gradientFrom = "#ffd580",
  gradientTo = "#ffd580",
  gradientColor = "#ffd580",
  gradientOpacity = 0.8,
}) {
  return (
    <MagicCard
      className={cn("rounded-lg", className)}
      gradientFrom={gradientFrom}
      gradientTo={gradientTo}
      gradientColor={gradientColor}
      gradientOpacity={gradientOpacity}
    >
      {/* <ShineBorder shineColor="#ffd580" /> */}
      <div
        className="p-4 rounded-[inherit] border"
        style={{
          backgroundColor: "var(--home-surface)",
          borderColor: "var(--home-border)",
          color: "var(--home-text)",
        }}
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && (
          <p className="mt-2 text-sm" style={{ color: "var(--home-muted)" }}>
            {description}
          </p>
        )}
      </div>
    </MagicCard>
  );
}
