import Hero from "@/components/landing/Hero";
import Navbar from "@/components/common/Navbar";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
// import HowItWorks from '@/components/home/HowItWorks';
import { useAuth } from "@/hooks/useAuth.jsx";
import { useEffect } from "react";

export default function Landing() {


  return (
    <div className="w-screen h-screen bg-[var(--home-bg)]">
      <Navbar />
      <div>
        <Hero />
        <FeaturesGrid />
      </div>
    </div>
  );
}
