import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Ruler, Bed, Bath } from 'lucide-react';
import PropertyModal, { type PropertyDetails } from './PropertyModal';

const properties: PropertyDetails[] = [
  {
    id: 1,
    title: 'Moradia T2',
    location: 'Castro Daire',
    price: '158 000 €',
    image: '/imoveis/Moradia T2 à venda em Castro Daire.jpg',
    area: '60 m²',
    beds: 2,
    baths: 1,
    description: `Situada mesmo no centro da vila de Castro Daire, esta Moradia T2 em pedra com enorme potencial de investimento, é ideal para habitação própria ou para Alojamento Local.

Com o charme autêntico da construção em pedra e características tradicionais que valorizam a experiência de quem procura estadias únicas, esta propriedade destaca-se pelo seu ambiente acolhedor, confere identidade, conforto térmico e um estilo rústico muito procurado no mercado de turismo rural e escapadinhas de fim de semana.

Uma oportunidade perfeita para investidores que procuram um imóvel com personalidade, elevado potencial de retorno e procura crescente no setor do alojamento local.`,
    details: [
      { label: 'Área Bruta Privativa m²', value: '60', icon: 'area' },
      { label: 'Área Bruta m²', value: '- -', icon: 'area' },
      { label: 'Área Total do Lote m²', value: '- -', icon: 'area' },
      { label: 'Área Útil m²', value: '49', icon: 'area' },
      { label: 'Quartos', value: '2', icon: 'bed' },
      { label: 'Ano de Construção', value: '1970', icon: 'calendar' },
      { label: 'Piso', value: '- -', icon: 'layers' },
      { label: 'WC / Casas de banho', value: '1', icon: 'bath' },
      { label: 'Elevador', value: 'Não', icon: 'zap' },
      { label: 'Estacionamento', value: 'Não', icon: 'car' },
      { label: 'Carregamento Elétrico', value: 'Não', icon: 'zap' },
      { label: 'Eficiência Energética', value: 'Ver certificado', icon: 'zap' },
    ]
  },
  {
    id: 2,
    title: 'Moradia T4',
    location: 'Castro Daire',
    price: '220 000 €',
    image: '/imoveis/Moradia T4 à venda em Castro Daire.jpg',
    area: '150 m²',
    beds: 4,
    baths: 3,
    description: `A apenas cerca de 7km do centro de Castro Daire, esta moradia em pedra combina a tranquilidade da natureza, com o conforto e funcionalidade para o seu dia a dia.

Com churrasqueira e espaço exterior para convidar toda a família.

No R/C existe uma garagem totalmente ampla para 3 carros, 1 WC e arrumos.

No 1º piso vai encontrar cozinha totalmente equipada, uma enorme sala de estar, 3 quartos e 2 casas de banho.

No 2º piso, mais 3 compartimentos, que poderá converter em quartos, sala de jogos, ou simplesmente um espaço para arrumos.

Estando virada a sul, possui uma incrível exposição solar e vistas desafogadas para a serra.

Agende já a sua visita.`,
    details: [
      { label: 'Área Bruta Privativa m²', value: '150', icon: 'area' },
      { label: 'Área Bruta m²', value: '- -', icon: 'area' },
      { label: 'Área Total do Lote m²', value: '900', icon: 'area' },
      { label: 'Área Útil m²', value: '120', icon: 'area' },
      { label: 'Quartos', value: '4', icon: 'bed' },
      { label: 'Ano de Construção', value: '1996', icon: 'calendar' },
      { label: 'Piso', value: '- -', icon: 'layers' },
      { label: 'WC / Casas de banho', value: '3', icon: 'bath' },
      { label: 'Elevador', value: 'Não', icon: 'zap' },
      { label: 'Estacionamento', value: '3+ Lugares', icon: 'car' },
      { label: 'Carregamento Elétrico', value: 'Não', icon: 'zap' },
      { label: 'Eficiência Energética', value: 'Ver certificado', icon: 'zap' },
    ]
  },
  {
    id: 3,
    title: 'Terreno',
    location: 'Lamelas, Castro Daire',
    price: '45 000 €',
    image: '/imoveis/Terreno à venda em Castro Daire.jpg',
    area: '1620 m²',
    beds: 0,
    baths: 0,
    description: `Terreno situado em espaço urbano, para construção.

Situado em Lamelas, Castro Daire, com 1620 m², está inserido numa zona tranquila e com bons acessos, e de excelente exposição solar e envolvente agradável.

Este é o terreno ideal para construir a sua moradia de sonho.

Não perca tempo e venha já pensar no seu projeto.`,
    details: [
      { label: 'Área Bruta Privativa m²', value: '- -', icon: 'area' },
      { label: 'Área Bruta m²', value: '- -', icon: 'area' },
      { label: 'Área Total do Lote m²', value: '1 620', icon: 'area' },
      { label: 'Área Útil m²', value: '- -', icon: 'area' },
      { label: 'Quartos', value: '- -', icon: 'bed' },
      { label: 'Ano de Construção', value: '- -', icon: 'calendar' },
      { label: 'Piso', value: '- -', icon: 'layers' },
      { label: 'WC / Casas de banho', value: '- -', icon: 'bath' },
      { label: 'Elevador', value: 'Não', icon: 'zap' },
      { label: 'Estacionamento', value: 'Não', icon: 'car' },
      { label: 'Carregamento Elétrico', value: 'Não', icon: 'zap' },
      { label: 'Eficiência Energética', value: 'Ver certificado', icon: 'zap' },
    ]
  }
];

const PropertyCard = ({
  property,
  index,
  onOpen,
}: {
  property: PropertyDetails;
  index: number;
  onOpen: (p: PropertyDetails) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group bg-zinc-900/50 rounded-3xl overflow-hidden border border-zinc-800 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)]"
  >
    <div className="relative h-64 overflow-hidden">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
        Destaque
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 to-transparent">
        <span className="text-2xl font-black text-white">{property.price}</span>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold mb-1">{property.title}</h3>
      <p className="text-zinc-500 text-sm mb-6 flex items-center">
        <span className="w-1 h-1 bg-purple-500 rounded-full mr-2" />
        {property.location}
      </p>

      <div className={`grid ${property.beds > 0 ? 'grid-cols-3' : 'grid-cols-1'} gap-4 py-4 border-t border-zinc-800`}>
        <div className="flex flex-col items-center">
          <Ruler className="w-4 h-4 text-purple-500 mb-1" />
          <span className="text-[10px] text-zinc-400 uppercase font-bold">{property.area}</span>
        </div>
        {property.beds > 0 && (
          <>
            <div className="flex flex-col items-center border-x border-zinc-800">
              <Bed className="w-4 h-4 text-purple-500 mb-1" />
              <span className="text-[10px] text-zinc-400 uppercase font-bold">{property.beds} Qts</span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="w-4 h-4 text-purple-500 mb-1" />
              <span className="text-[10px] text-zinc-400 uppercase font-bold">{property.baths} WCs</span>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => onOpen(property)}
        className="w-full mt-6 py-3 bg-zinc-800 hover:bg-purple-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300"
      >
        Ver Detalhes
      </button>
    </div>
  </motion.div>
);

const Properties = () => {
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetails | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-purple-500 font-bold tracking-widest text-sm uppercase mb-4">Portfólio Selecionado</h2>
          <h3 className="text-4xl lg:text-5xl font-black mb-6">Os imóveis mais recentes de Helder Pinto</h3>
          <div className="w-24 h-1 bg-purple-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} index={idx} onOpen={setSelectedProperty} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center space-x-4 group"
          >
            <span className="text-lg font-bold">Ver todos os imóveis</span>
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors">
              <Home className="w-6 h-6" />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Modal */}
      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </section>
  );
};

export default Properties;
