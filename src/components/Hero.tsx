import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Smartphone } from 'lucide-react';

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

      {/* Nome Mobile - Centralizado no Meio (Apenas Retrato) */}
      <div className="lg:hidden absolute inset-0 flex items-center justify-center z-25 pointer-events-none px-6 text-center hidden portrait:flex landscape:hidden">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="text-7xl font-['Caveat'] text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] mt-[-2vh]"
        >
          Helder Pinto
        </motion.h1>
      </div>


      {/* Logotipos Mobile - Apenas em modo Retrato */}
      <div className="lg:hidden absolute bottom-20 left-0 w-full flex-col items-center justify-center gap-6 z-30 pointer-events-none hidden portrait:flex landscape:hidden">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          src="/logo.png"
          alt="Helder Pinto Logo"
          className="h-44 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        />
        <motion.img
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          src="/LOGO3-sem-fundo.png"
          alt="RE/MAX Balloon"
          className="h-24 w-auto object-contain"
        />
      </div>

      {/* Ícone de Rotação (Dica Visual Mobile Retrato) */}
      <motion.div
        className="lg:hidden absolute bottom-12 right-6 z-40 flex flex-col items-center gap-2 portrait:flex hidden landscape:hidden text-white/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        >
          <Smartphone size={28} strokeWidth={1.5} />
        </motion.div>
        <span className="text-[8px] uppercase tracking-[0.2em] font-black">Rodar</span>
      </motion.div>


      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-white/50 text-xs uppercase tracking-widest font-semibold">
          Descubra
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

