import ServicesSection from '../components/sections/ServicesSection';
import HomeSample from '../components/sections/HomeSample';

export default function Services() {
  return (
    <div className="pt-10">
      <div className="bg-slate-900 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto px-4">
          Comprehensive healthcare and diagnostic services designed around your needs, delivered with care and precision.
        </p>
      </div>
      <ServicesSection />
      <HomeSample />
    </div>
  );
}
