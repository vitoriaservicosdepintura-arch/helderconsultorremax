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
      className="relative w-full h-screen lg:h-screen flex flex-col bg-black overflow-hidden"
    >
      {/* Parallax image layer */}
      <motion.div
        className="absolute inset-0 w-full h-full lg:h-full"
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

      {/* Versão MOBILE: Informações centralizadas abaixo do homem */}
      <div className="lg:hidden relative flex-1 flex flex-col items-center justify-end pb-32 pt-[40vh] px-6 text-center z-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-white/60 text-[10px] tracking-[0.4em] font-medium uppercase mb-4 drop-shadow-md">
            RE/MAX DINÂMICA DAIRE
          </span>

          <h1 className="text-6xl md:text-7xl font-['Caveat'] text-white leading-none mb-6 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
            Helder Pinto
          </h1>

          <p className="text-white/90 text-[13px] leading-relaxed max-w-[320px] mb-8 font-medium tracking-wide drop-shadow-sm">
            Transforme seus sonhos em realidade com a melhor consultoria imobiliária de Castro Daire.
            Oferecemos estratégias exclusivas para vender, comprar ou investir no mercado de imóveis com segurança e resultados garantidos.
          </p>

          <div className="relative mb-12">
            <h2 className="text-2xl font-black uppercase tracking-[0.1em] text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              Consultor Imobiliário
            </h2>
            <div className="absolute -inset-x-6 -inset-y-3 bg-purple-500/20 blur-2xl -z-10 rounded-full" />
          </div>

          {/* Logos Mobile */}
          <div className="flex items-center gap-10 mt-4 opacity-90">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-8 bg-red-600 rounded-sm" />
                <div className="flex flex-col leading-none">
                  <span className="text-white font-black text-sm tracking-tighter italic">RE/MAX</span>
                  <span className="text-white/80 font-bold text-[8px] tracking-wide uppercase">Dinâmica Daire</span>
                </div>
              </div>
            </div>

            <div className="relative w-12 h-12">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                <path d="M50,10 C35,10 25,22 25,35 C25,48 35,60 50,60 C65,60 75,48 75,35 C75,22 65,10 50,10" fill="#E11B22" />
                <path d="M50,15 C40,15 32,24 32,35 C32,46 40,55 50,55 C60,55 68,46 68,35 C68,24 60,15 50,15" fill="#FFFFFF" opacity="0.3" />
                <path d="M50,60 L45,90 L55,90 Z" fill="#0054A6" />
                <rect x="42" y="88" width="16" height="3" fill="#333" rx="1" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator (hidden when content is too low on mobile) */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none lg:flex"
      >
        <span className="text-white/50 text-[8px] lg:text-xs uppercase tracking-widest font-semibold">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          className="w-5 h-8 lg:w-6 lg:h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2"
        >
          <div className="w-0.5 h-1.5 lg:w-1 lg:h-2 rounded-full bg-purple-400" />
        </motion.div>
      </motion.div>
    </section>

  );
};

export default Hero;
