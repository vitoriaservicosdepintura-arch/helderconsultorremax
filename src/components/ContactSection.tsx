import { useState } from 'react';
import { Phone, Mail, User, Home, ArrowRight, MessageCircle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';

// Instagram SVG
const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);

// Facebook SVG
const FacebookIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

const socialLinks = [
    {
        id: 'instagram',
        Icon: InstagramIcon,
        href: 'https://www.instagram.com/helderpinto.consultor/',
        label: 'Instagram',
    },
    {
        id: 'facebook',
        Icon: FacebookIcon,
        href: 'https://www.facebook.com/p/Helder-Pinto-61576692584924/',
        label: 'Facebook',
    },
    {
        id: 'site',
        Icon: Globe,
        href: 'https://remax.pt/pt/agente/helder-pinto/126421031',
        label: 'Website',
    },
];

const FloatingSocialSidebar = () => {
    return (
        <div className="hidden lg:flex flex-col items-center gap-4 relative self-center">
            {socialLinks.map((link) => {
                const Icon = link.Icon;
                return (
                    <motion.div key={link.id} whileHover={{ scale: 1.15, x: -4 }} className="relative group rounded-2xl shadow-lg">
                        <BorderGlow
                            edgeSensitivity={30}
                            glowColor="40 80 80"
                            backgroundColor="#1e2436"
                            borderRadius={16}
                            glowRadius={40}
                            glowIntensity={1}
                            coneSpread={25}
                            colors={['#003DA5', '#E11B22', '#FFFFFF']}
                            className="w-12 h-12 block"
                        >
                            <a href={link.href} target="_blank" rel="noreferrer" className="w-full h-full flex items-center justify-center text-brand-light group-hover:text-white transition-colors duration-300">
                                <Icon className="w-5 h-5" />
                            </a>
                        </BorderGlow>
                        <span className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1e2436] border border-zinc-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                            {link.label}
                        </span>
                    </motion.div>
                );
            })}
            <div className="w-px h-12 bg-gradient-to-b from-brand/40 to-transparent mt-2" />
        </div>
    );
};

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        interest: 'buy'
    });

    const interestOptions: Record<string, string> = {
        buy: '🏠 Quero comprar um imóvel',
        sell: '🔑 Quero vender um imóvel',
        invest: '📈 Quero investir em imóveis',
        info: 'ℹ️ Apenas informações'
    };

    const handleWhatsAppClick = () => {
        const text = encodeURIComponent('Olá Helder, gostaria de obter mais informações sobre os seus serviços imobiliários.');
        window.open(`https://wa.me/351961526716?text=${text}`, '_blank');
    };

    const handleCallClick = () => {
        window.location.href = "tel:+351961526716";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const interestLabel = interestOptions[formData.interest];
        const message = encodeURIComponent(
            `Olá Helder! 👋\n\n` +
            `Gostaria de ser contactado. Seguem os meus dados:\n` +
            `👤 *Nome:* ${formData.name}\n` +
            `📞 *Telemóvel:* ${formData.phone}\n` +
            `✉️ *E-mail:* ${formData.email}\n` +
            `🏠 *Interesse:* ${interestLabel}`
        );
        window.open(`https://wa.me/351961526716?text=${message}`, '_blank');
    };

    return (
        <section className="bg-[#0a0f1d] pt-10 lg:pt-16 pb-10 lg:pb-16 px-6" id="contact">
            <div className="container mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                    <motion.button whileHover={{ scale: 1.05 }} onClick={handleWhatsAppClick} className="flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-8 py-4 rounded-2xl w-full md:w-auto font-bold text-lg shadow-[0_10px_20px_rgba(37,211,102,0.2)]">
                        <MessageCircle className="w-6 h-6" /> WhatsApp
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} onClick={handleCallClick} className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 text-white px-8 py-4 rounded-2xl w-full md:w-auto font-bold text-lg hover:bg-zinc-800">
                        <Phone className="w-6 h-6" /> Ligar
                    </motion.button>
                </div>

                <div className="relative flex justify-center w-full">
                    <BorderGlow
                        edgeSensitivity={30}
                        glowColor="40 80 80"
                        backgroundColor="#121829"
                        borderRadius={40}
                        glowRadius={150}
                        glowIntensity={1}
                        coneSpread={25}
                        colors={['#003DA5', '#E11B22', '#FFFFFF']}
                        className="w-full max-w-xl shadow-2xl relative"
                    >
                        <div className="p-6 sm:p-10 relative z-10 rounded-[2.5rem]">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-black text-white mb-2">Fale comigo agora 👇</h2>
                                <p className="text-zinc-400 font-medium">Preencha e entrarei em contacto em minutos.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 focus-within:text-brand" />
                                    <input type="text" placeholder="O seu nome completo" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#1e2436] text-white pl-12 pr-4 py-4 rounded-2xl outline-none" />
                                </div>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input type="tel" placeholder="O seu telemóvel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-[#1e2436] text-white pl-12 pr-4 py-4 rounded-2xl outline-none" />
                                </div>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input type="email" placeholder="O seu e-mail" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#1e2436] text-white pl-12 pr-4 py-4 rounded-2xl outline-none" />
                                </div>
                                <div className="relative">
                                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <select value={formData.interest} onChange={(e) => setFormData({ ...formData, interest: e.target.value })} className="w-full bg-[#1e2436] text-white pl-12 pr-4 py-4 rounded-2xl appearance-none outline-none">
                                        <option value="buy">🏠 Quero comprar um imóvel</option>
                                        <option value="sell">🔑 Quero vender um imóvel</option>
                                        <option value="invest">📈 Quero investir em imóveis</option>
                                        <option value="info">ℹ️ Apenas informações</option>
                                    </select>
                                </div>
                                <motion.button whileHover={{ scale: 1.02 }} type="submit" className="w-full bg-brand hover:bg-brand-light text-white font-extrabold py-5 rounded-2xl text-lg flex items-center justify-center gap-3 shadow-lg uppercase tracking-wider mt-6 transition-colors">
                                    QUERO SER CONTACTADO <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </form>
                            <div className="mt-6 text-center text-zinc-600 text-xs font-medium">🔒 Dados 100% confidenciais e seguros.</div>
                        </div>
                    </BorderGlow>
                    <div className="absolute left-1/2 ml-[310px] top-1/2 -translate-y-1/2 hidden lg:block">
                        <FloatingSocialSidebar />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
