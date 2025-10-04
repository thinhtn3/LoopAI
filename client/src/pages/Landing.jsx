import Hero from "@/components/landing/Hero";
import Navbar from "@/components/common/Navbar";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
// import HowItWorks from '@/components/home/HowItWorks';
import { useAuth } from "@/hooks/useAuth.jsx";
import { useEffect } from "react";
import Footer from "@/components/common/Footer";

export default function Landing() {


  return (
    <div className="w-screen h-screen bg-[var(--home-bg)]">
      <Navbar />
      <div>
        <Hero />
        <FeaturesGrid />
        <Footer />
      </div>
    </div>
  );
}
