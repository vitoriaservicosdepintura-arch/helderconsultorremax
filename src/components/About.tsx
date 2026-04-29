import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-24 bg-zinc-950/50 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative flex justify-center items-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 w-full max-w-lg"
            >
              {/* Purple glow behind person */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl -z-10" />
              <img
                src="/FOTO2.png"
                alt="Helder Pinto - Consultor Imobiliário RE/MAX"
                className="w-full object-contain hover:scale-[1.03] transition-all duration-700"
                style={{ mixBlendMode: 'multiply' }}
              />
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-purple-500 font-bold tracking-widest text-sm uppercase mb-4">A Mente por trás da Estratégia</h2>
              <h3 className="text-4xl lg:text-5xl font-black mb-8">Quem é Helder Pinto?</h3>

              <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
                <p>
                  Helder Pinto é mais do que um consultor imobiliário; é um estrategista do mercado de luxo em Castro Daire e arredores. Associado à prestigiada RE/MAX Dinâmica, ele combina expertise local com uma visão global de mercado.
                </p>
                <p>
                  Com anos de experiência e um histórico comprovado de transações de alto nível, Helder se destaca pela sua abordagem personalizada, tratando cada imóvel como uma peça única e cada cliente como um parceiro estratégico.
                </p>
                <p>
                  Sua missão é simples: maximizar o valor do seu investimento imobiliário, seja você um comprador em busca da casa dos sonhos ou um proprietário desejando o melhor retorno possível. Sua trajetória é marcada pela integridade, inovação e resultados excepcionais.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-3xl font-black text-white mb-2">+100</h4>
                  <p className="text-xs uppercase font-bold tracking-widest text-purple-500">Imóveis Vendidos</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white mb-2">98%</h4>
                  <p className="text-xs uppercase font-bold tracking-widest text-purple-500">Satisfação</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
