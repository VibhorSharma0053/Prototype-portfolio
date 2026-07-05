import { useState } from 'react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { 
  HiOutlineEnvelope, 
  HiOutlinePhone, 
  HiOutlineMapPin,
  HiOutlinePaperAirplane
} from 'react-icons/hi2';
import { SiGithub, SiInstagram } from 'react-icons/si';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';
import { contactService } from '../../services/contactService';
import { validateContactForm } from '../../utils/validators';
import { CONTACT_EMAIL, CONTACT_PHONE, SOCIAL_LINKS, CATEGORIES, ANIMATION_VARIANTS } from '../../utils/constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateContactForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);
    try {
      await contactService.submit(formData);
      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessType: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: SiGithub, url: SOCIAL_LINKS.github, label: 'GitHub' },
    { icon: FaLinkedin, url: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, url: SOCIAL_LINKS.twitter, label: 'Twitter' },
    { icon: SiInstagram, url: SOCIAL_LINKS.instagram, label: 'Instagram' },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-surface-900 border-t border-white/5">
      <div className="container-custom relative z-10">
        <SectionHeader 
          title="Let's Work Together" 
          subtitle="Ready to build a premium website for your business? Fill out the form below and I'll get back to you within 24 hours."
        />

        <div className="mt-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Contact Form */}
          <motion.div 
            className="w-full lg:w-3/5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={ANIMATION_VARIANTS.slideInLeft}
          >
            <div className="glass-card p-8 md:p-10 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500" />
              
              <h3 className="text-2xl font-heading font-bold text-white mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400 transition-colors`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400 transition-colors`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400 transition-colors`}
                      placeholder="7355506900"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                  </div>
                  
                  {/* Business Type */}
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-white/70 mb-2">Business Type</label>
                    <div className="relative">
                      <select 
                        id="businessType" 
                        name="businessType" 
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full bg-[#1e2330] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400 transition-colors appearance-none"
                      >
                        <option value="" disabled className="text-gray-500">Select business type</option>
                        {CATEGORIES.filter(c => c !== 'All' && c !== 'Portfolio').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-white/50">
                        <HiChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Project Details *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-400 focus:ring-1 focus:ring-accent-400 transition-colors resize-none`}
                    placeholder="Tell me about your business and what kind of website you need..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  variant="gradient" 
                  size="lg" 
                  className="w-full flex justify-center items-center gap-2"
                  disabled={isSubmitting}
                  loading={isSubmitting}
                >
                  <HiOutlinePaperAirplane className="w-5 h-5" />
                  <span>Send Message</span>
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="w-full lg:w-2/5 flex flex-col justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={ANIMATION_VARIANTS.slideInRight}
          >
            <div>
              <h3 className="text-3xl font-heading font-bold text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-400 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300">
                    <HiOutlineEnvelope className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">Email</p>
                    <p className="text-white text-lg font-medium group-hover:text-primary-400 transition-colors">{CONTACT_EMAIL}</p>
                  </div>
                </a>
                
                <a href={`tel:${CONTACT_PHONE}`} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary-400 group-hover:bg-secondary-500 group-hover:text-white group-hover:border-secondary-500 transition-all duration-300">
                    <HiOutlinePhone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">Phone</p>
                    <p className="text-white text-lg font-medium group-hover:text-secondary-400 transition-colors">{CONTACT_PHONE}</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-400">
                    <HiOutlineMapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50 mb-1">Location</p>
                    <p className="text-white text-lg font-medium">Available Worldwide (Remote)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <p className="text-sm text-white/50 mb-4">Follow Me</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, idx) => {
                    const Icon = social.icon;
                    return (
                      <a 
                        key={idx} 
                        href={social.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white hover:-translate-y-1 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Also need HiChevronDown for the select dropdown
const HiChevronDown = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
  </svg>
);

export default Contact;
