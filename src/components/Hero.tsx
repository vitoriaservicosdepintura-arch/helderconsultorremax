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
      className="relative w-full h-screen lg:min-h-screen flex flex-col lg:flex-row items-center justify-between overflow-hidden bg-[#000000] [perspective:1200px]"
    >
      {/* 
        ORGANIZAÇÃO DE CAMADAS (Z-INDEX):
        z-0: Backgrounds, Watermarks, Gradients
        z-10: Conteúdo de Texto e CTAs
        z-20: Imagem do Consultor (Parallax Principal)
        z-30: Branding e Logos Flutuantes
      */}

      {/* CAMADA 20: FOTO DE PERFIL (PROFISSIONAL & 4K) - UNIFICADA NO MOBILE */}
      <motion.div
        style={{ skewY: sectionSkew }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1.0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute lg:relative inset-0 w-full lg:w-[45%] h-full z-10 lg:z-20 flex flex-col justify-end overflow-hidden"
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
            className="w-full h-full object-cover lg:object-cover lg:object-[center_10%] object-top contrast-[1.05] brightness-[1.05] saturate-[1.02] origin-top pointer-events-none"
            style={{
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)'
            }}
          />
          {/* Degradê de base planejado para não ter espaços vazios */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 lg:via-black/20 to-transparent opacity-100 lg:opacity-90 z-20" />
          <div className="absolute bottom-0 left-0 w-full h-[60%] lg:h-[30%] bg-gradient-to-t from-black via-black to-transparent z-20" />
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

      {/* CAMADA 10: CONTEÚDO PREMIUM - POSICIONAMENTO E BAIXO PARA NÃO COBRIR O ROSTO */}
      <div className="relative w-full lg:w-[55%] h-full flex items-end lg:items-center justify-center lg:justify-start px-6 sm:px-12 lg:pl-20 pb-8 lg:py-20 z-30">

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
          {/* HEADLINE (H1) - AJUSTADO PARA NÃO SOBREPOR O ROSTO NO MOBILE */}
          <div className="space-y-2 lg:space-y-4">
            <h1 className="font-montserrat text-3xl sm:text-5xl lg:text-[4.5rem] font-extrabold leading-[1.1] lg:leading-[0.95] tracking-tight text-white lg:not-italic drop-shadow-2xl">
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

            {/* SUBTÍTULO (H2) - RESPONSIVO E CLARO */}
            <h2 className="text-base sm:text-lg lg:text-xl font-medium text-white/90 leading-relaxed font-sans max-w-[95%] lg:max-w-[90%]">
              Acesso privilegiado aos imóveis mais exclusivos do mercado, para quem procura privacidade e distinção.
            </h2>
          </div>

          {/* TEXTO DE APOIO REDUZIDO NO MOBILE */}
          <div className="flex gap-4 lg:gap-8 items-stretch mb-4 lg:mb-0">
            <div className="w-[3px] bg-[#FF0000] rounded-full flex-shrink-0" />
            <p className="text-sm sm:text-lg text-[#CCCCCC] font-normal leading-relaxed font-sans line-clamp-3 lg:line-clamp-none">
              Descubra análises estratégicas, tendências do mercado imobiliário e oportunidades reservadas a investidores criteriosos. Mais do que informação — inteligência aplicada para decisões que elevam e preservam patrimônios.
            </p>
          </div>

          {/* BOTÃO CTA PREMIUM VIBRANTE - AJUSTE DE MARGEM PARA CABER NA TELA */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-2 lg:pt-6 w-full flex justify-center"
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
