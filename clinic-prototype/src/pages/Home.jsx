import Hero from '../components/sections/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import PackagesSection from '../components/sections/PackagesSection';
import DoctorsSection from '../components/sections/DoctorsSection';
import HomeSample from '../components/sections/HomeSample';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesSection />
      <WhyChooseUs />
      <PackagesSection />
      <DoctorsSection />
      <HomeSample />
      <Testimonials />
      <Stats />
      <FAQ />
    </div>
  );
}
