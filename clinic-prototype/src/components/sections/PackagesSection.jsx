import { motion } from 'framer-motion';
import { packages } from '../../data/packages';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function PackagesSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Health Packages</h2>
          <p className="text-slate-600 text-lg">Preventive health checkups to keep you and your family healthy.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 border ${pkg.popular ? 'border-primary shadow-xl shadow-primary/10' : 'border-slate-200 shadow-md'} flex flex-col h-full`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight min-h-[56px]">{pkg.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-primary">{pkg.price}</span>
                </div>
                <div className="mt-2 text-sm text-secondary font-semibold bg-secondary/10 inline-block px-3 py-1 rounded-full">
                  {pkg.tests} Tests Included
                </div>
              </div>

              <div className="flex-grow mb-8">
                <ul className="space-y-3">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <FaCheck className="text-green-500 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                to="/contact" 
                className={`w-full text-center py-3.5 rounded-xl font-semibold transition-all ${
                  pkg.popular 
                    ? 'bg-primary text-white hover:bg-blue-700 shadow-md' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Book Package
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
