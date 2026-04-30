import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import TechnologySection from '@/components/TechnologySection';
import EffectsSection from '@/components/EffectsSection';
import IndustrySection from '@/components/IndustrySection';
import QualitySection from '@/components/QualitySection';
import InquirySection from '@/components/InquirySection';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      <AboutSection />
      <TechnologySection />
      <EffectsSection />
      <IndustrySection />
      <QualitySection />
      <InquirySection />
      <Footer />
    </main>
  );
}
