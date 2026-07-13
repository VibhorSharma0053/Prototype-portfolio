import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCalendarCheck, FaVial, FaDownload, FaCheckCircle } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-white -z-10" />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-teal-400/10 blur-[80px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 text-primary text-sm font-semibold mb-6 border border-blue-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              NABL Certified Pathology Lab
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
              Accurate Diagnostics. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Premium Healthcare.</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Experience world-class healthcare and ultra-fast test reports from the comfort of your home. Your health is our priority.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                to="/contact" 
                className="inline-flex justify-center items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1"
              >
                <FaCalendarCheck /> Book Appointment
              </Link>
              <Link 
                to="/reports" 
                className="inline-flex justify-center items-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-semibold text-lg hover:border-primary hover:text-primary transition-all hover:bg-slate-50"
              >
                <FaDownload /> Download Report
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-secondary text-lg" /> Same-Day Reports
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-secondary text-lg" /> Home Collection
              </div>
            </div>
          </motion.div>

          {/* Image & Floating Cards */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-100 aspect-[4/5] sm:aspect-auto">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop" 
                alt="Doctor with patient" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating Card 1 */}
            <motion.div 
              className="absolute -left-6 md:-left-12 top-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center text-xl">
                <FaCheckCircle />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Verified Lab</p>
                <p className="font-bold text-slate-800">NABL Certified</p>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div 
              className="absolute -right-6 md:-right-10 bottom-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            >
              <div className="bg-blue-100 text-primary w-12 h-12 rounded-full flex items-center justify-center text-xl">
                <FaVial />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Fast Results</p>
                <p className="font-bold text-slate-800">100% Accurate</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
