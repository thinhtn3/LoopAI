import FeatureCard from "./FeatureCard";
import { useHomeTheme } from "@/context/HomeThemeContext";
import { CodeXml } from "lucide-react";
import { MessageSquareReply } from "lucide-react";
import { ClipboardPlus } from "lucide-react";

export default function FeaturesGrid() {
  const { theme } = useHomeTheme();
  return (
    <section
      className="w-full h-[50%] px-6 py-20 flex flex-col items-center gap-16"
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
      }}
    >
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-[900] mb-6 text-center">
          Why Choose LoopAI?
        </h1>
        <p className="text-center text-[var(--home-muted)]">
          Upgrade your technical interview skills with LoopAI's AI-powered
          platform.
        </p>
      </div>
      <div className="w-full flex justify-evenly gap-4">
        <FeatureCard
          title="Choose your problems"
          description="Access a wide range of Data Structures and Algorithms challenges designed to sharpen your technical skills."
          icon={<CodeXml />}
        />
        <FeatureCard
          title="Adaptive interviewing with AI"
          description="Simulate realistic interview sessions with an AI interviewer that adapts to your responses."
          icon={<MessageSquareReply />}
        />
        <FeatureCard
          title="Comprehensive feedback"
          description="Receive structured insights into your performance to accelerate learning and measurable improvement."
          icon={<ClipboardPlus />}
        />
      </div>
    </section>
  );
}
