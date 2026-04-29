import { useState } from 'react';
import { Phone, Mail, User, Home, ArrowRight, MessageCircle, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BorderGlow from './BorderGlow';

// Instagram SVG (not available in lucide-react)
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
        hoverClass: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500',
    },
    {
        id: 'facebook',
        Icon: FacebookIcon,
        href: 'https://www.facebook.com/p/Helder-Pinto-61576692584924/',
        label: 'Facebook',
        hoverClass: 'hover:bg-blue-700',
    },
    {
        id: 'site',
        Icon: Globe,
        href: 'https://remax.pt/pt/agente/helder-pinto/126421031?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnKHsKeLyAWhXwxU7cSLJvscGZeq_yNCBAvmUvq-R7BXT9th2yaH5BnQcB5Xw_aem_uf1qqhBGtucTAg83kQmWLw',
        label: 'Website',
        hoverClass: 'hover:bg-purple-700',
    },
];

const FloatingSocialSidebar = () => {
    return (
        <div className="hidden lg:flex flex-col items-center gap-4 relative self-center">
            {/* Social icons */}
            {socialLinks.map((link) => {
                const Icon = link.Icon;
                return (
                    <motion.div
                        key={link.id}
                        whileHover={{ scale: 1.15, x: -4 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative group rounded-2xl shadow-lg"
                    >
                        <BorderGlow
                            edgeSensitivity={30}
                            glowColor="40 80 80"
                            backgroundColor="#1e2436"
                            borderRadius={16}
                            glowRadius={40}
                            glowIntensity={1}
                            coneSpread={25}
                            animated={false}
                            colors={['#c084fc', '#f472b6', '#38bdf8']}
                            className="w-12 h-12 block"
                        >
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.label}
                                className="w-full h-full flex items-center justify-center text-purple-400 group-hover:text-white transition-colors duration-300"
                            >
                                <Icon className="w-5 h-5 pointer-events-none" />
                            </a>
                        </BorderGlow>
                        {/* Label tooltip */}
                        <span className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1e2436] border border-zinc-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                            {link.label}
                        </span>
                    </motion.div>
                );
            })}

            {/* Vertical line */}
            <div className="w-px h-12 bg-gradient-to-b from-purple-600/40 to-transparent mt-2" />
        </div>
    );
};

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        interest: '🏠 Quero comprar um imóvel'
    });

    const handleWhatsAppClick = () => {
        const text = encodeURIComponent("Olá Helder, gostaria de obter mais informações sobre os seus serviços imobiliários.");
        window.open(`https://wa.me/351961526716?text=${text}`, '_blank');
    };

    const handleCallClick = () => {
        window.location.href = "tel:+351961526716";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const message = encodeURIComponent(
            `Olá Helder! 👋\n\n` +
            `Gostaria de ser contactado. Seguem os meus dados:\n` +
            `👤 *Nome:* ${formData.name}\n` +
            `📞 *Telemóvel:* ${formData.phone}\n` +
            `✉️ *E-mail:* ${formData.email}\n` +
            `🏠 *Interesse:* ${formData.interest}`
        );
        window.open(`https://wa.me/351961526716?text=${message}`, '_blank');
    };

    return (
        <section className="bg-[#0a0f1d] py-16 px-6" id="contact">
            <div className="container mx-auto max-w-5xl">
                {/* Buttons Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleWhatsAppClick}
                        className="flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-8 py-4 rounded-2xl w-full md:w-auto font-bold text-lg shadow-[0_10px_20px_rgba(37,211,102,0.2)]"
                    >
                        <MessageCircle className="w-6 h-6" />
                        WhatsApp
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCallClick}
                        className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 text-white px-8 py-4 rounded-2xl w-full md:w-auto font-bold text-lg hover:bg-zinc-800 transition-colors"
                    >
                        <Phone className="w-6 h-6" />
                        Ligar
                    </motion.button>
                </div>

                {/* Form + Sidebar layout */}
                <div className="relative flex justify-center w-full">
                    {/* Form Container */}
                    <BorderGlow
                        edgeSensitivity={30}
                        glowColor="40 80 80"
                        backgroundColor="#121829"
                        borderRadius={40}
                        glowRadius={150}
                        glowIntensity={1}
                        coneSpread={25}
                        animated={false}
                        colors={['#c084fc', '#f472b6', '#38bdf8']}
                        className="w-full max-w-xl shadow-2xl relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] -z-10" />
                        <div className="p-10 relative overflow-hidden h-full z-10 rounded-[2.5rem]">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-black text-white flex items-center justify-center gap-2 mb-2">
                                    Fale comigo agora <span className="text-yellow-400">👇</span>
                                </h2>
                                <p className="text-zinc-400 font-medium">Preencha e entrarei em contacto em minutos.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        placeholder="O seu nome completo"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#1e2436] border border-transparent focus:border-blue-500/50 text-white pl-12 pr-4 py-4 rounded-2xl outline-none transition-all placeholder:text-zinc-500"
                                    />
                                </div>

                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="tel"
                                        placeholder="O seu telemóvel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-[#1e2436] border border-transparent focus:border-blue-500/50 text-white pl-12 pr-4 py-4 rounded-2xl outline-none transition-all placeholder:text-zinc-500"
                                    />
                                </div>

                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="O seu e-mail"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-[#1e2436] border border-transparent focus:border-blue-500/50 text-white pl-12 pr-4 py-4 rounded-2xl outline-none transition-all placeholder:text-zinc-500"
                                    />
                                </div>

                                <div className="relative group">
                                    <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                                    <select
                                        value={formData.interest}
                                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                                        className="w-full bg-[#1e2436] border border-transparent focus:border-blue-500/50 text-white pl-12 pr-4 py-4 rounded-2xl outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="🏠 Quero comprar um imóvel">🏠 Quero comprar um imóvel</option>
                                        <option value="🔑 Quero vender um imóvel">🔑 Quero vender um imóvel</option>
                                        <option value="📈 Quero investir em imóveis">📈 Quero investir em imóveis</option>
                                        <option value="ℹ️ Apenas informações">ℹ️ Apenas informações</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-sm">▼</div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-[#00529b] hover:bg-[#00427c] text-white font-extrabold py-5 rounded-2xl text-lg flex items-center justify-center gap-3 transition-all shadow-[0_10px_30px_rgba(0,82,155,0.3)] uppercase tracking-wider mt-6"
                                >
                                    QUERO SER CONTACTADO
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </form>

                            <div className="mt-6 text-center text-zinc-600 text-xs font-medium flex items-center justify-center gap-2">
                                🔒 Dados 100% confidenciais e seguros.
                            </div>
                        </div>
                    </BorderGlow>

                    {/* Floating Social Sidebar - Positioned Absolutely to keep form perfectly centered */}
                    <div className="absolute left-1/2 ml-[310px] top-1/2 -translate-y-1/2 hidden lg:block">
                        <FloatingSocialSidebar />
                    </div>
                </div>

                {/* Mobile social icons */}
                <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
                    {socialLinks.map((link) => {
                        const Icon = link.Icon;
                        return (
                            <div key={link.id} className="relative rounded-2xl block group shadow-lg">
                                <BorderGlow
                                    edgeSensitivity={30}
                                    glowColor="40 80 80"
                                    backgroundColor="#1e2436"
                                    borderRadius={16}
                                    glowRadius={40}
                                    glowIntensity={1}
                                    coneSpread={25}
                                    animated={false}
                                    colors={['#c084fc', '#f472b6', '#38bdf8']}
                                    className="w-12 h-12 block"
                                >
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={link.label}
                                        className="w-full h-full flex items-center justify-center text-purple-400 group-hover:text-white transition-colors duration-300"
                                    >
                                        <Icon className="w-5 h-5 pointer-events-none" />
                                    </a>
                                </BorderGlow>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
