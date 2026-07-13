import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import FloatingButtons from './components/ui/FloatingButtons';
import Home from './pages/Home';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Doctors from './pages/Doctors';
import TestReports from './pages/TestReports';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/packages" element={<PageTransition><Packages /></PageTransition>} />
        <Route path="/doctors" element={<PageTransition><Doctors /></PageTransition>} />
        <Route path="/reports" element={<PageTransition><TestReports /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <AnimatedRoutes />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </Router>
  );
}

export default App;
