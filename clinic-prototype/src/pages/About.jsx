import WhyChooseUs from '../components/sections/WhyChooseUs';
import Stats from '../components/sections/Stats';

export default function About() {
  return (
    <div className="pt-10">
      <div className="bg-slate-900 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About ABC Clinic</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto px-4">
          Dedicated to providing premium healthcare and accurate diagnostics with state-of-the-art technology.
        </p>
      </div>
      <WhyChooseUs />
      <Stats />
    </div>
  );
}
