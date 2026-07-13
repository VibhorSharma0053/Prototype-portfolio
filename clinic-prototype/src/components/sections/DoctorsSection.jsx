import { motion } from 'framer-motion';
import { doctors } from '../../data/doctors';
import { FaCalendarAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function DoctorsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Expert Specialists</h2>
            <p className="text-slate-600 text-lg">Meet our highly qualified team of medical professionals dedicated to your health.</p>
          </div>
          <Link to="/doctors" className="text-primary font-semibold hover:underline hidden md:block">
            View All Doctors &rarr;
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden relative bg-slate-100">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-semibold text-slate-800 flex items-center gap-1 shadow-sm">
                  <FaStar className="text-yellow-500" /> 4.9
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-primary text-sm font-bold mb-2 uppercase tracking-wide">{doctor.specialization}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{doctor.name}</h3>
                <p className="text-slate-500 text-sm mb-4">{doctor.qualification}</p>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <FaCalendarAlt className="text-slate-400" />
                  <span className="truncate">{doctor.availability}</span>
                </div>

                <Link 
                  to="/contact" 
                  className="block w-full text-center py-3 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/doctors" className="inline-block border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-full hover:bg-slate-50">
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  );
}
