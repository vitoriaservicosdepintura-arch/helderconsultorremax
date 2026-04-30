import React, { useState, useEffect } from 'react';
import { useCMS, CMSData, Property } from '../context/CMSContext';
import { supabase } from '../lib/supabase';
import {
    X, Layout, Briefcase, Phone,
    Save, Trash2, Plus, LogOut, Upload, Lock, Users,
    RefreshCw, Mail, PhoneCall, Calendar, Tag, Menu, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    interest: string;
    created_at: string;
}

const AdminPanel: React.FC = () => {
    const { data, updateData, setIsAdmin } = useCMS();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginData, setLoginData] = useState({ user: '', pass: '' });
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState<'hero' | 'portfolio' | 'footer' | 'leads'>('hero');
    const [tempData, setTempData] = useState<CMSData>(data);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [leads, setLeads] = useState<Lead[]>([]);
    const [leadsLoading, setLeadsLoading] = useState(false);

    const fetchLeads = async () => {
        setLeadsLoading(true);
        try {
            const { data: leadsData, error } = await supabase
                .from('helder_leads')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error && leadsData) setLeads(leadsData);
        } catch (err) {
            console.error('Erro ao carregar leads:', err);
        } finally {
            setLeadsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && activeTab === 'leads') fetchLeads();
    }, [isAuthenticated, activeTab]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginData.user === 'admin' && loginData.pass === 'helder2026') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Credenciais inválidas!');
        }
    };

    const handleSave = () => {
        updateData(tempData);
        alert('Alterações salvas com sucesso!');
    };

    const handlePropertyChange = (index: number, field: keyof Property, value: any) => {
        const updated = [...tempData.properties];
        updated[index] = { ...updated[index], [field]: value };
        setTempData({ ...tempData, properties: updated });
    };

    const addProperty = () => {
        const newProp: Property = {
            id: Date.now(),
            title: 'Novo Imóvel',
            location: 'Castro Daire',
            price: '0 €',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80',
            area: '0 m²',
            beds: 0,
            baths: 0,
            description: 'Descrição detalhada do imóvel...',
            details: [{ label: 'Área', value: '0', icon: 'area' }]
        };
        setTempData({ ...tempData, properties: [...tempData.properties, newProp] });
        setActiveTab('portfolio');
        setSidebarOpen(false);
    };

    const removeProperty = (id: number) => {
        if (confirm('Excluir este imóvel?')) {
            setTempData({ ...tempData, properties: tempData.properties.filter(p => p.id !== id) });
        }
    };

    const menuItems = [
        { id: 'hero', label: 'Seção Hero', icon: Layout },
        { id: 'portfolio', label: 'Portfólio', icon: Briefcase },
        { id: 'footer', label: 'Contatos', icon: Phone },
        { id: 'leads', label: 'Leads', icon: Users },
    ];

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId as any);
        setSidebarOpen(false);
    };

    // ---- LOGIN SCREEN ----
    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 z-[110] bg-zinc-950 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-full max-w-sm bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-brand" />
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                            <Lock className="w-7 h-7 text-brand" />
                        </div>
                        <h2 className="text-xl font-black uppercase italic tracking-tighter text-white">Acesso Restrito</h2>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">Admin Panel</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Usuário</label>
                            <input
                                type="text" required
                                value={loginData.user}
                                onChange={e => setLoginData({ ...loginData, user: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand transition-all text-white"
                                placeholder="admin"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Senha</label>
                            <input
                                type="password" required
                                value={loginData.pass}
                                onChange={e => setLoginData({ ...loginData, pass: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-brand transition-all text-white"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="text-red-400 text-center text-xs font-bold bg-red-500/10 rounded-xl py-2"
                            >{error}</motion.p>
                        )}
                        <button type="submit"
                            className="w-full py-4 bg-brand text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-brand/20 active:scale-95 mt-2"
                        >Entrar no Painel</button>
                    </form>

                    <button onClick={() => setIsAdmin(false)}
                        className="w-full mt-5 text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors"
                    >← Voltar para o site</button>
                </motion.div>
            </div>
        );
    }

    // ---- MAIN PANEL ----
    return (
        <div className="fixed inset-0 z-[100] bg-zinc-950 text-white font-sans overflow-hidden flex flex-col">

            {/* ---- TOP HEADER (Mobile & Desktop) ---- */}
            <header className="flex-shrink-0 h-16 border-b border-zinc-900 flex items-center justify-between px-4 md:px-8 bg-zinc-950 z-50">
                <div className="flex items-center gap-3">
                    {/* Hamburger menu (mobile only) */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden p-2 bg-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-colors"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center font-black text-white text-xs shadow-lg shadow-brand/30">HP</div>
                        <span className="font-black text-sm uppercase italic tracking-tight text-white/90 hidden sm:block">Admin</span>
                    </div>
                </div>

                {/* Current Tab label (mobile) */}
                <span className="md:hidden text-xs font-black uppercase tracking-widest text-zinc-400">
                    {menuItems.find(i => i.id === activeTab)?.label}
                </span>

                {/* Desktop tab label */}
                <span className="hidden md:block text-base font-black uppercase italic tracking-tight text-white">
                    {menuItems.find(i => i.id === activeTab)?.label}
                </span>

                <div className="flex items-center gap-2">
                    {activeTab !== 'leads' ? (
                        <button onClick={handleSave}
                            className="px-4 py-2 bg-brand hover:bg-brand-light text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-brand/20 active:scale-95"
                        >
                            <Save className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Salvar</span>
                        </button>
                    ) : (
                        <button onClick={fetchLeads} disabled={leadsLoading}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 active:scale-95 disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${leadsLoading ? 'animate-spin' : ''}`} />
                        </button>
                    )}
                    <button onClick={() => setIsAdmin(false)}
                        className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white rounded-xl transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">

                {/* ---- SIDEBAR OVERLAY (mobile) ---- */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                onClick={() => setSidebarOpen(false)}
                                className="md:hidden fixed inset-0 bg-black/70 z-40 top-16"
                            />
                            <motion.aside
                                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="md:hidden fixed left-0 top-16 bottom-0 w-64 bg-zinc-900 border-r border-zinc-800 z-50 flex flex-col"
                            >
                                <SidebarContent
                                    menuItems={menuItems}
                                    activeTab={activeTab}
                                    onTabChange={handleTabChange}
                                    onLogout={() => { setIsAuthenticated(false); setIsAdmin(false); }}
                                />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* ---- SIDEBAR (desktop) ---- */}
                <aside className="hidden md:flex w-56 bg-zinc-900 border-r border-zinc-800 flex-col flex-shrink-0">
                    <SidebarContent
                        menuItems={menuItems}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                        onLogout={() => { setIsAuthenticated(false); setIsAdmin(false); }}
                    />
                </aside>

                {/* ---- MAIN CONTENT ---- */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24 md:pb-8">

                        {/* ---- HERO ---- */}
                        {activeTab === 'hero' && (
                            <div className="space-y-6">
                                <SectionTitle title="Seção Hero" subtitle="Textos e imagens da página inicial." />
                                <div className="space-y-4">
                                    <Input label="Título Principal" value={tempData.hero.title} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, title: v } })} />
                                    <Input label="Subtítulo" value={tempData.hero.subtitle} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, subtitle: v } })} />
                                    <TextArea label="Descrição" value={tempData.hero.description} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, description: v } })} />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <ImageUpload label="Foto do Consultor" value={tempData.hero.image} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, image: v } })} />
                                    <ImageUpload label="Logo" value={tempData.hero.logo} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, logo: v } })} />
                                </div>
                            </div>
                        )}

                        {/* ---- PORTFOLIO ---- */}
                        {activeTab === 'portfolio' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <SectionTitle title="Portfólio" subtitle="Imóveis em destaque." />
                                    <button onClick={addProperty}
                                        className="px-4 py-2.5 bg-zinc-800 hover:bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all active:scale-95 flex-shrink-0"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span className="hidden sm:inline">Adicionar</span>
                                        <span className="sm:hidden">+</span>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {tempData.properties.map((prop, idx) => (
                                        <PropertyCard
                                            key={prop.id}
                                            prop={prop}
                                            idx={idx}
                                            onChange={handlePropertyChange}
                                            onRemove={removeProperty}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ---- FOOTER ---- */}
                        {activeTab === 'footer' && (
                            <div className="space-y-6">
                                <SectionTitle title="Contatos & Rodapé" subtitle="Dados de contacto e redes sociais." />
                                <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand mb-4">Informações de Contacto</p>
                                    <Input label="Telemóvel" value={tempData.footer.phone} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, phone: v } })} />
                                    <Input label="Email" value={tempData.footer.email} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, email: v } })} />
                                    <Input label="Endereço" value={tempData.footer.location} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, location: v } })} />
                                    <Input label="URL Google Maps" value={tempData.footer.locationUrl} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, locationUrl: v } })} />
                                </div>
                                <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand mb-4">Redes Sociais</p>
                                    <Input label="Instagram" value={tempData.footer.socials.instagram} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, socials: { ...tempData.footer.socials, instagram: v } } })} />
                                    <Input label="Facebook" value={tempData.footer.socials.facebook} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, socials: { ...tempData.footer.socials, facebook: v } } })} />
                                    <Input label="RE/MAX" value={tempData.footer.socials.remax} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, socials: { ...tempData.footer.socials, remax: v } } })} />
                                    <Input label="WhatsApp" value={tempData.footer.socials.whatsapp} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, socials: { ...tempData.footer.socials, whatsapp: v } } })} />
                                </div>
                            </div>
                        )}

                        {/* ---- LEADS ---- */}
                        {activeTab === 'leads' && (
                            <div className="space-y-5">
                                <SectionTitle title="Leads Recebidos" subtitle={`${leads.length} contacto(s) registado(s).`} />

                                {leadsLoading ? (
                                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                                        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
                                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">A carregar...</p>
                                    </div>
                                ) : leads.length === 0 ? (
                                    <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl">
                                        <Users className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
                                        <p className="text-zinc-500 font-bold text-sm">Nenhum lead recebido ainda.</p>
                                        <p className="text-zinc-700 text-xs mt-1">Os contactos aparecem aqui após preenchimento do formulário.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {leads.map((lead, i) => (
                                            <motion.div
                                                key={lead.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.04 }}
                                                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 hover:border-brand/30 transition-colors"
                                            >
                                                {/* Lead header */}
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <span className="text-brand font-black text-sm">{lead.name.charAt(0).toUpperCase()}</span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-black text-white text-sm truncate">{lead.name}</p>
                                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {new Date(lead.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Lead details grid */}
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                                    <a href={`tel:${lead.phone}`} className="flex items-center gap-2 bg-zinc-950/50 rounded-xl px-3 py-2 hover:bg-brand/10 transition-colors group">
                                                        <PhoneCall className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                                                        <span className="text-xs font-bold text-white group-hover:text-brand transition-colors truncate">{lead.phone}</span>
                                                    </a>
                                                    <a href={`mailto:${lead.email}`} className="flex items-center gap-2 bg-zinc-950/50 rounded-xl px-3 py-2 hover:bg-brand/10 transition-colors group sm:col-span-2">
                                                        <Mail className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                                                        <span className="text-xs font-bold text-white group-hover:text-brand transition-colors truncate">{lead.email}</span>
                                                    </a>
                                                    <div className="flex items-center gap-2 bg-zinc-950/50 rounded-xl px-3 py-2 sm:col-span-3">
                                                        <Tag className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                                                        <span className="text-xs font-bold text-zinc-300 truncate">{lead.interest}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </main>
            </div>

            {/* ---- BOTTOM NAVBAR (mobile) ---- */}
            <nav className="md:hidden flex-shrink-0 border-t border-zinc-900 bg-zinc-950 flex items-stretch h-16 z-40">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all ${activeTab === item.id ? 'text-brand' : 'text-zinc-600 hover:text-zinc-400'
                            }`}
                    >
                        <item.icon className={`w-5 h-5 transition-transform ${activeTab === item.id ? 'scale-110' : ''}`} />
                        <span className="text-[9px] font-black uppercase tracking-wider">{item.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

// ---- SIDEBAR CONTENT ----
const SidebarContent = ({ menuItems, activeTab, onTabChange, onLogout }: {
    menuItems: any[], activeTab: string, onTabChange: (id: string) => void, onLogout: () => void
}) => (
    <>
        <nav className="flex-1 p-3 space-y-1 pt-4">
            {menuItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === item.id
                            ? 'bg-brand text-white shadow-lg shadow-brand/30'
                            : 'text-zinc-500 hover:bg-zinc-800 hover:text-white'
                        }`}
                >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                </button>
            ))}
        </nav>
        <div className="p-3 border-t border-zinc-800">
            <button onClick={onLogout}
                className="w-full flex items-center gap-3 px-3 py-3 text-zinc-500 hover:text-red-400 transition-colors text-xs font-black uppercase tracking-widest rounded-xl hover:bg-red-500/5"
            >
                <LogOut className="w-4 h-4" />
                Sair
            </button>
        </div>
    </>
);

// ---- PROPERTY CARD (collapsible on mobile) ----
const PropertyCard = ({ prop, idx, onChange, onRemove }: {
    prop: Property, idx: number,
    onChange: (i: number, f: keyof Property, v: any) => void,
    onRemove: (id: number) => void
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden hover:border-brand/30 transition-colors">
            {/* Card Header (always visible) */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-4 p-4 text-left"
            >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-800 flex-shrink-0">
                    <img src={prop.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-black text-white text-sm truncate">{prop.title}</p>
                    <p className="text-zinc-500 text-xs truncate">{prop.location} · {prop.price}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-4 border-t border-zinc-800 pt-4">
                            {/* Image Upload */}
                            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-zinc-900 group">
                                <img src={prop.image} className="w-full h-full object-cover" alt="" />
                                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-opacity">
                                    <Upload className="w-6 h-6 text-white mb-1" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Trocar Foto</span>
                                    <input type="file" className="hidden" accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => onChange(idx, 'image', reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Input label="Título" value={prop.title} onChange={v => onChange(idx, 'title', v)} />
                                <Input label="Preço" value={prop.price} onChange={v => onChange(idx, 'price', v)} />
                                <Input label="Localização" value={prop.location} onChange={v => onChange(idx, 'location', v)} />
                                <Input label="Área" value={prop.area} onChange={v => onChange(idx, 'area', v)} />
                                <Input label="Quartos" value={prop.beds.toString()} onChange={v => onChange(idx, 'beds', parseInt(v) || 0)} />
                                <Input label="WCs" value={prop.baths.toString()} onChange={v => onChange(idx, 'baths', parseInt(v) || 0)} />
                            </div>
                            <TextArea label="Descrição" value={prop.description} onChange={v => onChange(idx, 'description', v)} />

                            <button onClick={() => onRemove(prop.id)}
                                className="w-full py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-red-500/20"
                            >
                                <Trash2 className="w-4 h-4" />
                                Remover Imóvel
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ---- SHARED COMPONENTS ----
const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="relative pl-4 mb-2">
        <h3 className="text-lg font-black text-white uppercase italic tracking-tight">{title}</h3>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">{subtitle}</p>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand rounded-full shadow-[0_0_10px_rgba(0,85,255,0.8)]" />
    </div>
);

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="space-y-1.5 group">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1 group-focus-within:text-brand transition-colors">{label}</label>
        <input
            type="text" value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-brand transition-all text-white"
        />
    </div>
);

const TextArea = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="space-y-1.5 group">
        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1 group-focus-within:text-brand transition-colors">{label}</label>
        <textarea
            rows={4} value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-brand transition-all text-white resize-none"
        />
    </div>
);

const ImageUpload = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => {
    const [uploading, setUploading] = useState(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => { onChange(reader.result as string); setUploading(false); };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">{label}</label>
            <div className="flex items-center gap-3">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0 group/img">
                    <img src={value} className="w-full h-full object-cover" alt="" />
                    {uploading && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-brand border-t-transparent animate-spin rounded-full" />
                        </div>
                    )}
                    <label className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <Upload className="w-5 h-5 text-white" />
                        <input type="file" className="hidden" onChange={handleFile} accept="image/*" />
                    </label>
                </div>
                <input
                    type="text" value={value} onChange={e => onChange(e.target.value)}
                    placeholder="URL da imagem..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-3 text-xs focus:outline-none focus:border-brand transition-all text-white/60"
                />
            </div>
        </div>
    );
};

export default AdminPanel;
