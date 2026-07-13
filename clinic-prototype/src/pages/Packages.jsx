import PackagesSection from '../components/sections/PackagesSection';

export default function Packages() {
  return (
    <div className="pt-10">
      <div className="bg-slate-900 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Health Packages</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto px-4">
          Choose from our range of comprehensive health checkup packages designed for you and your family.
        </p>
      </div>
      <PackagesSection />
    </div>
  );
}
