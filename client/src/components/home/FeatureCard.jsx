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
        border: `1px solid ${theme.colors.glowBlue}`,
        width: width || "100%",
        height: height || "100%",
        paddingX: "4rem",
        paddingY: "4rem",
      }}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
