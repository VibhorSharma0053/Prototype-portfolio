import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME, SITE_DESCRIPTION, ANIMATION_VARIANTS } from '../utils/constants';

import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Services from '../components/sections/Services';
import Prototypes from '../components/sections/Prototypes';
import Process from '../components/sections/Process';
import WhyChooseMe from '../components/sections/WhyChooseMe';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>{SITE_NAME} — Premium Websites for Local Businesses</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:title" content={`${SITE_NAME} — Premium Websites for Local Businesses`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_NAME} — Premium Websites for Local Businesses`} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>

      <motion.div
        variants={ANIMATION_VARIANTS.fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Hero />
        <About />
        <Skills />
        <Services />
        <Prototypes />
        <Process />
        <WhyChooseMe />
        <Testimonials />
        <FAQ />
        <Contact />
      </motion.div>
    </>
  );
};

export default HomePage;
