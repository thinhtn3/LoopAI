import Hero from "@/components/landing/Hero";
import Layout from "@/components/layout/Layout";
import FeaturesGrid from '@/components/landing/FeaturesGrid';
// import HowItWorks from '@/components/home/HowItWorks';
import FooterCta from "@/components/landing/FooterCta";

export default function Landing() {
  return (
    <div className="w-screen">
      <Layout>
        <Hero />
        <FeaturesGrid />
        <FooterCta />
      </Layout>
    </div>
  );
}
