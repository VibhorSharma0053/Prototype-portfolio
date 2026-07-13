import { motion } from 'framer-motion';
import { FaUserMd } from 'react-icons/fa';
import { FaMicroscope, FaLaptopMedical, FaTruckMedical } from 'react-icons/fa6';

const features = [
  {
    icon: FaMicroscope,
    title: "NABL Certified Lab",
    description: "Our laboratories meet the highest standards of quality and accuracy.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: FaUserMd,
    title: "Experienced Doctors",
    description: "Consult with highly qualified specialists with decades of experience.",
    color: "bg-teal-100 text-teal-600"
  },
  {
    icon: FaLaptopMedical,
    title: "Digital Reports",
    description: "Access your test reports online anytime, anywhere securely.",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: FaTruckMedical,
    title: "Home Sample Collection",
    description: "Safe and hygienic sample collection from your doorstep.",
    color: "bg-rose-100 text-rose-600"
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Why Choose ABC Clinic & Diagnostics?</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              We combine state-of-the-art medical technology with compassionate care. Our goal is to provide accurate diagnostics and premium healthcare services to ensure your well-being.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${feature.color}`}>
                    <feature.icon />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1000&auto=format&fit=crop" 
                alt="Modern Laboratory" 
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-full h-full bg-primary/10 rounded-[2.5rem] -z-10" />
            <div className="absolute top-1/2 -right-12 w-24 h-24 bg-accent/20 rounded-full blur-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
