import Hero from "@/components/home/Hero";
import Layout from "@/components/layout/Layout";
import FeaturesGrid from '@/components/home/FeaturesGrid';
// import HowItWorks from '@/components/home/HowItWorks';
import FooterCta from "@/components/home/FooterCta";

export default function Home() {
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
