import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Book an Appointment</h1>
          <p className="text-slate-600 text-lg">Schedule your visit or request home sample collection.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Our Address</h4>
                    <p className="text-sm text-slate-600 mt-1">123 Health Avenue, Medical District, Kanpur, UP 208001</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Phone</h4>
                    <p className="text-sm text-slate-600 mt-1">+91 98765 43210<br/>+91 12345 67890</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email</h4>
                    <p className="text-sm text-slate-600 mt-1">info@abcclinic.com</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                    <FaClock />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Working Hours</h4>
                    <p className="text-sm text-slate-600 mt-1">Mon-Sat: 8:00 AM - 8:00 PM<br/>Sun: 8:00 AM - 2:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-slate-200 rounded-3xl overflow-hidden h-64 relative border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover opacity-60 mix-blend-multiply"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white px-4 py-2 rounded-full font-bold text-slate-800 shadow-lg flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" /> View on Google Maps
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
              <AnimatePresence>
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 z-10 text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6"
                    >
                      <FaCheckCircle />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Appointment Requested!</h3>
                    <p className="text-slate-600 max-w-md">
                      Thank you for choosing ABC Clinic. Our team will contact you shortly to confirm your appointment time.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Patient Name</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Service Type</label>
                    <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white">
                      <option value="">Select Service</option>
                      <option value="consultation">Doctor Consultation</option>
                      <option value="lab">Lab Test</option>
                      <option value="home_collection">Home Sample Collection</option>
                      <option value="package">Health Package</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Department / Test</label>
                    <input type="text" placeholder="e.g. Blood Test, General Physician" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Date</label>
                    <input type="date" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Time</label>
                    <input type="time" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Address (Required for Home Collection)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Any Message or Symptoms</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"></textarea>
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary/20">
                  Confirm Booking Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
