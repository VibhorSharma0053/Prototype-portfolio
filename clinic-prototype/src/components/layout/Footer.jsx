import { Link } from 'react-router-dom';
import { FaStethoscope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <div className="bg-primary/20 text-primary p-2 rounded-xl">
                <FaStethoscope className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                ABC <span className="text-primary">Clinic</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Providing premium healthcare and accurate diagnostics with state-of-the-art technology and experienced medical professionals.
            </p>
            <div className="flex gap-3 mt-2">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {['About Us', 'Our Services', 'Health Packages', 'Our Doctors', 'Testimonials'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().replace(' ', '-')}`} className="text-slate-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">123 Health Avenue, Medical District, Kanpur, UP 208001</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-slate-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm text-slate-400">info@abcclinic.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">Subscribe to our newsletter for health tips and exclusive package offers.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
              />
              <button className="bg-primary hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} ABC Clinic & Diagnostics. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-slate-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
