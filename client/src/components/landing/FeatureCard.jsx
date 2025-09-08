import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useHomeTheme } from "@/context/HomeThemeContext";

export default function FeatureCard({ title, description, icon, width, height }) {
  const { theme } = useHomeTheme();

  return (
    <Card
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        border: `1px solid ${theme.colors.border}`,
        width: width || "100%",
        height: height || "100%",
        paddingX: "4rem",
        paddingY: "4rem",
      }}
    >
      <CardHeader className="flex items-center">
        <div className="w-8 text-[var(--home-accent)]">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p style={{ color: theme.colors.muted }}>{description}</p>
      </CardContent>
    </Card>
  );
}
