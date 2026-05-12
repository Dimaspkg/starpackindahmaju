import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import TechnologySection from '@/components/TechnologySection';
import EffectsSection from '@/components/EffectsSection';
import IndustrySection from '@/components/IndustrySection';
import QualitySection from '@/components/QualitySection';
import InquirySection from '@/components/InquirySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <TechnologySection />
      <EffectsSection />
      <IndustrySection />
      <QualitySection />
      <InquirySection />
      <Footer />
    </>
  );
}
