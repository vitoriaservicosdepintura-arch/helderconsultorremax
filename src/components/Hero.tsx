import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: image moves up slightly and scales down as user scrolls
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);

  // Scroll indicator bounces
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >


      {/* Parallax image layer */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, scale, opacity }}
      >
        <img
          src="/Hero1.png"
          alt="Helder Pinto - Consultor Imobiliário"
          className="w-full h-full object-cover object-[75%_center] lg:object-center"
        />
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
      </motion.div>



      {/* Animated entrance: title overlay (mobile only hint) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute inset-0 flex flex-col items-center justify-end pb-12 pointer-events-none"
      >
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest font-semibold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
