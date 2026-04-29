import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler, Bed, Bath, Zap, Car, Home, Calendar, Layers } from 'lucide-react';
import { useEffect } from 'react';

export type PropertyDetails = {
    id: number;
    title: string;
    location: string;
    price: string;
    image: string;
    area: string;
    beds: number;
    baths: number;
    description?: string;
    details?: { label: string; value: string; icon?: string }[];
};

type Props = {
    property: PropertyDetails | null;
    onClose: () => void;
};

const iconMap: Record<string, React.ReactNode> = {
    area: <Ruler className="w-4 h-4 text-purple-400" />,
    bed: <Bed className="w-4 h-4 text-purple-400" />,
    bath: <Bath className="w-4 h-4 text-purple-400" />,
    calendar: <Calendar className="w-4 h-4 text-purple-400" />,
    layers: <Layers className="w-4 h-4 text-purple-400" />,
    car: <Car className="w-4 h-4 text-purple-400" />,
    home: <Home className="w-4 h-4 text-purple-400" />,
    zap: <Zap className="w-4 h-4 text-purple-400" />,
};

const PropertyModal = ({ property, onClose }: Props) => {
    // Close on Escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = property ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [property]);

    return (
        <AnimatePresence>
            {property && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, y: 80, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 60, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div
                            className="bg-[#111827] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image header */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/10"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Badge */}
                                <div className="absolute top-4 left-4 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                    Destaque
                                </div>

                                {/* Price overlay */}
                                <div className="absolute bottom-4 left-6">
                                    <p className="text-3xl font-black text-white drop-shadow-lg">{property.price}</p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                <h2 className="text-2xl font-black text-white mb-1">{property.title}</h2>
                                <p className="text-purple-400 text-sm font-semibold mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full inline-block" />
                                    {property.location}
                                </p>

                                {/* Description */}
                                {property.description && (
                                    <div className="mb-8">
                                        <h3 className="text-white font-bold text-base mb-3 border-b border-zinc-800 pb-2">Descrição</h3>
                                        <div className="text-zinc-400 text-sm leading-relaxed space-y-3">
                                            {property.description.split('\n\n').map((para, i) => (
                                                <p key={i}>{para}</p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Details grid */}
                                {property.details && property.details.length > 0 && (
                                    <div>
                                        <h3 className="text-white font-bold text-base mb-4 border-b border-zinc-800 pb-2">Detalhes</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {property.details.map((detail, i) => (
                                                <div key={i} className="bg-zinc-900/60 rounded-2xl p-4 flex items-start gap-3 border border-zinc-800">
                                                    {detail.icon && iconMap[detail.icon]}
                                                    <div>
                                                        <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">{detail.label}</p>
                                                        <p className="text-white font-bold text-sm mt-0.5">{detail.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA */}
                                <a
                                    href="https://wa.me/351961526716?text=Olá%20Helder!%20Tenho%20interesse%20na%20propriedade%3A%20"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-8 w-full flex items-center justify-center gap-2 bg-[#00529b] hover:bg-[#00427c] text-white font-extrabold py-4 rounded-2xl text-sm uppercase tracking-widest transition-all shadow-[0_8px_20px_rgba(0,82,155,0.3)]"
                                >
                                    Tenho Interesse — Contactar Agora
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default PropertyModal;
