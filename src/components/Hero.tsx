import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Efeitos de Parallax e Profundidade 3D (Premium 4K)
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageRotateX = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentRotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const sectionSkew = useTransform(scrollYProgress, [0, 1], [0, 2]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col lg:flex-row items-center justify-between overflow-hidden bg-[#000000] [perspective:1500px]"
    >
      {/* COLUNA ESQUERDA - FOTO DE PERFIL (PROFISSIONAL & 4K) */}
      <motion.div
        style={{ skewY: sectionSkew }}
        initial={{ opacity: 0, x: -50, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1.0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="relative w-full lg:w-[45%] h-[60vh] lg:h-screen z-20 flex flex-col justify-end overflow-hidden"
      >
        <motion.div
          style={{
            y: imageY,
            rotateX: imageRotateX,
            scale: imageScale,
            transformStyle: 'preserve-3d'
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="/helder1.png"
            alt="Helder Pinto"
            className="w-full h-full object-cover lg:object-[center_10%] contrast-[1.05] brightness-[1.05] saturate-[1.02] origin-top pointer-events-none"
            style={{
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
          {/* Degradê de base reforçado para "aterrar" a imagem e a logo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-100 z-20" />
          <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent z-20" />
        </motion.div>

        {/* LOGOTIPO HÉLDER PINTO COM SOMBRA DE BASE (SOMBRA DE CONTATO) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-full flex justify-center pointer-events-none"
        >
          <div className="relative group flex justify-center w-full">
            {/* SOMBRA ESFUMAÇADA ESPECÍFICA PARA A LOGO */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black/60 blur-[30px] rounded-full z-0" />

            <img
              src="/logo.png"
              alt="Hélder Pinto"
              className="relative z-10 w-full max-w-[280px] lg:max-w-[380px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,1)]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* COLUNA DIREITA - CONTEÚDO PREMIUM E CTA */}
      <div className="relative w-full lg:w-[55%] min-h-screen flex items-center justify-center lg:justify-start px-8 sm:px-12 lg:pl-20 py-20 z-10">

        {/* WATERMARK RE/MAX SUTIL AO FUNDO (VERSÃO AMPLIADA E DINÂMICA) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2 }}
          style={{ rotate: 15, x: watermarkX }}
          className="absolute top-1/2 -right-20 lg:-right-40 -translate-y-1/2 w-[100%] lg:w-[120%] h-auto pointer-events-none z-0"
        >
          <img src="/LOGO3-sem-fundo.png" alt="" className="w-full h-auto grayscale invert" />
        </motion.div>

        <motion.div
          style={{
            y: contentY,
            rotateX: contentRotateX,
            scale: contentScale,
            opacity: contentOpacity,
            transformStyle: 'preserve-3d'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative z-10 max-w-xl lg:max-w-2xl space-y-8"
        >
          {/* HEADLINE (H1) - MONTSERRAT EXTRABOLD */}
          <div className="space-y-4">
            <h1 className="font-montserrat text-4xl sm:text-6xl lg:text-[4.5rem] font-extrabold leading-[0.95] tracking-tight text-white">
              Excelência & <br />
              <span className="relative inline-block text-[#0055FF] animate-pulse-subtle">
                Exclusividade
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 1.5 }}
                  className="absolute -bottom-1 lg:-bottom-2 left-0 h-[2px] lg:h-[3px] bg-[#0055FF]"
                />
              </span>
            </h1>

            {/* SUBTÍTULO (H2) */}
            <h2 className="text-lg sm:text-xl font-medium text-white leading-relaxed font-sans max-w-[90%]">
              Acesso privilegiado aos imóveis mais exclusivos do mercado, para quem procura privacidade e distinção.
            </h2>
          </div>

          {/* TEXTO DE APOIO COM BARRA VERTICAL VERMELHA (#FF0000) À ESQUERDA */}
          <div className="flex gap-8 items-stretch">
            <div className="w-[3px] bg-[#FF0000] rounded-full flex-shrink-0" />
            <p className="text-base sm:text-lg text-[#CCCCCC] font-normal leading-relaxed font-sans">
              Descubra análises estratégicas, tendências do mercado imobiliário e oportunidades reservadas a investidores criteriosos. Mais do que informação — inteligência aplicada para decisões que elevam e preservam patrimônios.
            </p>
          </div>

          {/* BOTÃO CTA PREMIUM VIBRANTE */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-6 w-full flex justify-center"
          >
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-14 py-5 bg-[#0055FF] text-white font-bold uppercase tracking-[3px] text-xs lg:text-sm rounded-[10px] shadow-[0_15px_30px_rgba(0,85,255,0.4)] hover:shadow-[0_20px_50px_rgba(0,85,255,0.7)] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">CONSULTAR OPORTUNIDADES</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* GRADIENTE DE AMBIENTE PARA PROFUNDIDADE */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#0033aa]/10 to-transparent pointer-events-none z-0" />
    </section>
  );
};

export default Hero;
