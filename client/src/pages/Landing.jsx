import Hero from "@/components/landing/Hero";
import Navbar from "@/components/common/Navbar";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
// import HowItWorks from '@/components/home/HowItWorks';
import FooterCta from "@/components/landing/FooterCta";

export default function Landing({ user }) {
  return (
    <div className="w-screen h-screen bg-[var(--home-bg)]">
      <Navbar user={user} />
      <div>
        <Hero user={user} />
        <FeaturesGrid />
      </div>
    </div>
  );
}
