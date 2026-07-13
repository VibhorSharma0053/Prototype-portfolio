import DoctorsSection from '../components/sections/DoctorsSection';

export default function Doctors() {
  return (
    <div className="pt-10">
      <div className="bg-slate-900 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Medical Experts</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto px-4">
          Consult with highly qualified specialists with decades of experience in providing premium healthcare.
        </p>
      </div>
      <DoctorsSection />
    </div>
  );
}
