import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaSearch, FaFilePdf, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { reports } from '../data/reports';

export default function TestReports() {
  const [formData, setFormData] = useState({ id: '', mobile: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      const found = reports.find(r => r.id === formData.id && r.mobile === formData.mobile);
      if (found) {
        setResult(found);
      } else {
        setError('No report found with the provided details. Please check and try again.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Download Test Reports</h1>
          <p className="text-slate-600 text-lg">Enter your Report ID and registered mobile number to access your reports securely.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSearch} className="grid md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Report ID</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. REP12345"
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  value={formData.id}
                  onChange={(e) => setFormData({...formData, id: e.target.value.toUpperCase()})}
                />
              </div>
              <div className="md:col-span-5">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Registered Mobile</label>
                <input 
                  type="tel" 
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-digit mobile number"
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full h-[58px] bg-primary hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <><FaSearch /> Search</>}
                </button>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100"
                >
                  {error}
                </motion.div>
              )}

              {result && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 p-6 md:p-8 bg-slate-50 border border-slate-200 rounded-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16" />
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl shrink-0">
                        <FaCheckCircle />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">{result.testName}</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
                          <p>Patient: <span className="font-semibold text-slate-800">{result.patientName}</span></p>
                          <p>Date: <span className="font-semibold text-slate-800">{result.date}</span></p>
                          <p>Status: <span className="font-semibold text-green-600">{result.status}</span></p>
                        </div>
                      </div>
                    </div>

                    <button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shrink-0">
                      <FaFilePdf /> Download PDF
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Info Timeline */}
        <div className="mt-20">
          <h3 className="text-center text-2xl font-bold text-slate-900 mb-10">How It Works</h3>
          <div className="flex flex-col md:flex-row justify-between relative">
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-slate-200 -z-10" />
            
            {['Book Test', 'Sample Collection', 'Lab Testing', 'Doctor Verification', 'Digital Report'].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center mb-8 md:mb-0 relative z-10">
                <div className="w-12 h-12 bg-white border-4 border-slate-100 text-primary rounded-full flex items-center justify-center font-bold mb-3 shadow-sm">
                  {idx + 1}
                </div>
                <p className="text-sm font-semibold text-slate-700 text-center max-w-[120px]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
