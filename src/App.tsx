import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import ContactSection from './components/ContactSection';
import Properties from './components/Properties';

import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#09090b] text-white min-h-screen font-sans selection:bg-purple-500/30">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
        style={{ scaleX }}
      />

      <main>
        <Hero />
        <Properties />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
