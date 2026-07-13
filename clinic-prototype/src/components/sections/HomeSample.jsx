import { motion } from 'framer-motion';
import { FaLaptop, FaUserNurse, FaVial, FaFlask, FaMobileAlt } from 'react-icons/fa';

const steps = [
  { icon: FaLaptop, title: "Book Online", desc: "Select your test and time slot." },
  { icon: FaUserNurse, title: "Technician Visits", desc: "Expert phlebotomist arrives at home." },
  { icon: FaVial, title: "Sample Collection", desc: "Safe & hygienic blood draw." },
  { icon: FaFlask, title: "Lab Testing", desc: "Processed in our NABL lab." },
  { icon: FaMobileAlt, title: "Digital Report", desc: "Download report via WhatsApp/Web." }
];

export default function HomeSample() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Home Sample Collection</h2>
          <p className="text-slate-400 text-lg">
            Skip the travel and waiting room. Get your tests done from the comfort and safety of your home.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-800 -translate-y-1/2 -z-10" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center text-center max-w-[180px] mb-10 md:mb-0 relative"
            >
              <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl text-accent shadow-xl border border-slate-700 mb-6 relative">
                <step.icon />
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-sm font-bold text-white border-4 border-slate-900">
                  {index + 1}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-tight">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
