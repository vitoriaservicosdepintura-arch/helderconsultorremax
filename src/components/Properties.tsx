import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Ruler, Bed, Bath } from 'lucide-react';
import PropertyModal, { type PropertyDetails } from './PropertyModal';
import { useCMS } from '../context/CMSContext';

const Properties = () => {
  const { data } = useCMS();
  const properties = data.properties;

  const [selectedProperty, setSelectedProperty] = useState<PropertyDetails | null>(null);

  return (
    <section className="pt-10 lg:pt-24 pb-10 lg:pb-24 relative overflow-hidden" id="properties">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-brand font-bold tracking-widest text-sm uppercase mb-4">Portfólio em Destaque</h2>
          <h3 className="text-4xl lg:text-5xl font-black mb-6">Os imóveis mais recentes de Helder Pinto</h3>
          <div className="w-24 h-1 bg-brand mx-auto" />
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
            <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center group-hover:bg-brand-light transition-colors">
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

const PropertyCard = ({
  property,
  index,
  onOpen,
}: {
  property: PropertyDetails;
  index: number;
  onOpen: (p: PropertyDetails) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-zinc-900/50 rounded-3xl overflow-hidden border border-zinc-800 hover:border-brand/50 transition-all duration-500 hover:shadow-[0_10px_40px_rgba(0,61,165,0.15)]"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-brand text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
          Destaque
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-zinc-950 to-transparent">
          <span className="text-2xl font-black text-white">{property.price}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{property.title}</h3>
        <p className="text-zinc-500 text-sm mb-6 flex items-center">
          <span className="w-1 h-1 bg-brand rounded-full mr-2" />
          {property.location}
        </p>

        <div className={`grid ${property.beds > 0 ? 'grid-cols-3' : 'grid-cols-1'} gap-4 py-4 border-t border-zinc-800`}>
          <div className="flex flex-col items-center">
            <Ruler className="w-4 h-4 text-brand mb-1" />
            <span className="text-[10px] text-zinc-400 uppercase font-bold">{property.area}</span>
          </div>
          {property.beds > 0 && (
            <>
              <div className="flex flex-col items-center border-x border-zinc-800">
                <Bed className="w-4 h-4 text-brand mb-1" />
                <span className="text-[10px] text-zinc-400 uppercase font-bold">{property.beds} {property.beds === 1 ? 'Quarto' : 'Quartos'}</span>
              </div>
              <div className="flex flex-col items-center">
                <Bath className="w-4 h-4 text-brand mb-1" />
                <span className="text-[10px] text-zinc-400 uppercase font-bold">{property.baths} {property.baths === 1 ? 'Casa de Banho' : 'Casas de Banho'}</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => onOpen(property)}
          className="w-full mt-6 py-3 bg-zinc-800 hover:bg-brand text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300"
        >
          Ver Detalhes
        </button>
      </div>
    </motion.div>
  );
};

export default Properties;
