import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import TechnologySection from '@/components/TechnologySection';
import EffectsSection from '@/components/EffectsSection';
import IndustrySection from '@/components/IndustrySection';
import QualitySection from '@/components/QualitySection';
import CustomersSection from '@/components/CustomersSection';
import InquirySection from '@/components/InquirySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Hero />
      <div className="pageContainer">
        <AboutSection />
        <TechnologySection />
        <EffectsSection />
        <IndustrySection />
        <QualitySection />
        <CustomersSection />
        <InquirySection />
        <Footer />
      </div>
    </div>
  );
}
