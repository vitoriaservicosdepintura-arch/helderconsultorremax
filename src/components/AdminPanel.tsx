import React, { useState, useEffect } from 'react';
import { useCMS, CMSData, Property } from '../context/CMSContext';
import { supabase } from '../lib/supabase';
import {
    X, Layout, Briefcase, Phone,
    Save, Trash2, Plus, LogOut, ChevronRight, Upload, Lock, Users,
    RefreshCw, Mail, PhoneCall, Calendar, Tag
} from 'lucide-react';
import { motion } from 'framer-motion';

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

    // Leads state
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
        if (isAuthenticated && activeTab === 'leads') {
            fetchLeads();
        }
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
        const updatedProperties = [...tempData.properties];
        updatedProperties[index] = { ...updatedProperties[index], [field]: value };
        setTempData({ ...tempData, properties: updatedProperties });
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
    };

    const removeProperty = (id: number) => {
        if (confirm('Tem certeza que deseja excluir este imóvel?')) {
            setTempData({
                ...tempData,
                properties: tempData.properties.filter(p => p.id !== id)
            });
        }
    };

    const menuItems = [
        { id: 'hero', label: 'Seção Hero', icon: Layout },
        { id: 'portfolio', label: 'Portfólio', icon: Briefcase },
        { id: 'footer', label: 'Contatos & Rodapé', icon: Phone },
        { id: 'leads', label: 'Leads Recebidos', icon: Users },
    ];

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 z-[110] bg-zinc-950 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand" />

                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-brand" />
                        </div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Acesso Restrito</h2>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Identifique-se para continuar</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Utilizador</label>
                            <input
                                type="text"
                                required
                                value={loginData.user}
                                onChange={e => setLoginData({ ...loginData, user: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand transition-all text-white font-medium"
                                placeholder="Ex: admin"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Palavra-passe</label>
                            <input
                                type="password"
                                required
                                value={loginData.pass}
                                onChange={e => setLoginData({ ...loginData, pass: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-brand transition-all text-white font-medium"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-red-500 text-center text-xs font-bold"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 bg-brand hover:bg-brand-light text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-brand/20 active:scale-95"
                        >
                            Entrar no Painel
                        </button>
                    </form>

                    <button
                        onClick={() => setIsAdmin(false)}
                        className="w-full mt-6 text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                        ← Voltar para o site
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[100] flex bg-zinc-950 text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col pt-8">
                <div className="px-6 mb-10 flex items-center gap-3">
                    <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-brand/20">HP</div>
                    <h1 className="text-lg font-black tracking-tight uppercase italic text-white/90">Painel ADM</h1>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                                    ? 'bg-brand text-white shadow-xl shadow-brand/40 scale-105'
                                    : 'text-zinc-500 hover:bg-zinc-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
                            {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-zinc-800">
                    <button
                        onClick={() => { setIsAuthenticated(false); setIsAdmin(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-400 transition-colors text-xs font-black uppercase tracking-widest"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout / Sair
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-zinc-950">
                <header className="h-24 border-b border-zinc-900 flex items-center justify-between px-10 bg-zinc-950/50 backdrop-blur-3xl relative z-10">
                    <div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                            {menuItems.find(i => i.id === activeTab)?.label}
                        </h2>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Gestão Helder Pinto</p>
                    </div>
                    <div className="flex items-center gap-6">
                        {activeTab !== 'leads' && (
                            <button
                                onClick={handleSave}
                                className="px-8 py-3.5 bg-brand hover:bg-brand-light text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(0,85,255,0.3)] hover:shadow-[0_15px_40px_rgba(0,85,255,0.5)] active:scale-95"
                            >
                                <Save className="w-4 h-4" />
                                Salvar Tudo
                            </button>
                        )}
                        {activeTab === 'leads' && (
                            <button
                                onClick={fetchLeads}
                                disabled={leadsLoading}
                                className="px-8 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                <RefreshCw className={`w-4 h-4 ${leadsLoading ? 'animate-spin' : ''}`} />
                                Atualizar
                            </button>
                        )}
                        <button
                            onClick={() => setIsAdmin(false)}
                            className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white rounded-xl transition-all hover:rotate-90 duration-500"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-10">
                    <div className="max-w-4xl mx-auto">

                        {/* ---- HERO ---- */}
                        {activeTab === 'hero' && (
                            <div className="space-y-10">
                                <SectionTitle title="Conteúdo da Hero" subtitle="Edite os textos de boas-vindas e imagens principais." />
                                <div className="grid grid-cols-2 gap-8">
                                    <Input label="Título Principal" value={tempData.hero.title} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, title: v } })} />
                                    <Input label="Subtítulo" value={tempData.hero.subtitle} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, subtitle: v } })} />
                                </div>
                                <TextArea label="Descrição Detalhada" value={tempData.hero.description} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, description: v } })} />
                                <div className="grid grid-cols-2 gap-8">
                                    <ImageUpload label="Foto do Consultor" value={tempData.hero.image} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, image: v } })} />
                                    <ImageUpload label="Logo Official" value={tempData.hero.logo} onChange={v => setTempData({ ...tempData, hero: { ...tempData.hero, logo: v } })} />
                                </div>
                            </div>
                        )}

                        {/* ---- PORTFOLIO ---- */}
                        {activeTab === 'portfolio' && (
                            <div className="space-y-10">
                                <div className="flex justify-between items-start">
                                    <SectionTitle title="Portfólio em Destaque" subtitle="Gerencie os imóveis exclusivos exibidos no site." />
                                    <button
                                        onClick={addProperty}
                                        className="px-6 py-3 bg-zinc-800 hover:bg-brand text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all active:scale-95"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Adicionar Imóvel
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    {tempData.properties.map((prop, idx) => (
                                        <div key={prop.id} className="bg-zinc-900/30 border border-zinc-800 rounded-[2rem] p-8 flex flex-col md:flex-row gap-8 hover:border-brand/40 transition-colors group">
                                            <div className="w-full md:w-64 h-48 rounded-[1.5rem] overflow-hidden bg-black flex-shrink-0 relative">
                                                <img src={prop.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                                                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 backdrop-blur-sm">
                                                    <Upload className="w-8 h-8 text-white mb-2" />
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-white">Mudar Foto</span>
                                                    <input
                                                        type="file" className="hidden" accept="image/*"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => handlePropertyChange(idx, 'image', reader.result as string);
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                            </div>

                                            <div className="flex-1 space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input label="Título" value={prop.title} onChange={v => handlePropertyChange(idx, 'title', v)} />
                                                    <Input label="Preço" value={prop.price} onChange={v => handlePropertyChange(idx, 'price', v)} />
                                                    <Input label="Localização" value={prop.location} onChange={v => handlePropertyChange(idx, 'location', v)} />
                                                    <Input label="Área (m²)" value={prop.area} onChange={v => handlePropertyChange(idx, 'area', v)} />
                                                    <Input label="Quartos" value={prop.beds.toString()} onChange={v => handlePropertyChange(idx, 'beds', parseInt(v) || 0)} />
                                                    <Input label="WCs" value={prop.baths.toString()} onChange={v => handlePropertyChange(idx, 'baths', parseInt(v) || 0)} />
                                                </div>
                                                <TextArea label="Descrição Detalhada" value={prop.description} onChange={v => handlePropertyChange(idx, 'description', v)} />
                                                <div className="flex justify-end pt-2 border-t border-zinc-800/50">
                                                    <button
                                                        onClick={() => removeProperty(prop.id)}
                                                        className="px-5 py-2.5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                        Remover
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ---- FOOTER ---- */}
                        {activeTab === 'footer' && (
                            <div className="space-y-12">
                                <div className="bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-800">
                                    <SectionTitle title="Contatos Diretos" subtitle="Informações públicas para contato imediato." />
                                    <div className="grid grid-cols-2 gap-8 mt-8">
                                        <Input label="Telemóvel" value={tempData.footer.phone} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, phone: v } })} />
                                        <Input label="Email Profissional" value={tempData.footer.email} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, email: v } })} />
                                        <div className="col-span-2">
                                            <Input label="Endereço Completo" value={tempData.footer.location} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, location: v } })} />
                                        </div>
                                        <div className="col-span-2">
                                            <Input label="URL Google Maps" value={tempData.footer.locationUrl} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, locationUrl: v } })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-zinc-900/30 p-8 rounded-[2rem] border border-zinc-800">
                                    <SectionTitle title="Mídias Sociais" subtitle="Configure os canais sociais." />
                                    <div className="grid grid-cols-2 gap-8 mt-8">
                                        <Input label="Instagram" value={tempData.footer.socials.instagram} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, socials: { ...tempData.footer.socials, instagram: v } } })} />
                                        <Input label="Facebook" value={tempData.footer.socials.facebook} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, socials: { ...tempData.footer.socials, facebook: v } } })} />
                                        <Input label="Link RE/MAX" value={tempData.footer.socials.remax} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, socials: { ...tempData.footer.socials, remax: v } } })} />
                                        <Input label="WhatsApp" value={tempData.footer.socials.whatsapp} onChange={v => setTempData({ ...tempData, footer: { ...tempData.footer, socials: { ...tempData.footer.socials, whatsapp: v } } })} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ---- LEADS ---- */}
                        {activeTab === 'leads' && (
                            <div className="space-y-8">
                                <div className="flex items-start justify-between">
                                    <SectionTitle title="Leads Recebidos" subtitle={`${leads.length} contacto(s) registado(s) na base de dados.`} />
                                </div>

                                {leadsLoading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
                                            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">A carregar leads...</p>
                                        </div>
                                    </div>
                                ) : leads.length === 0 ? (
                                    <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[2rem]">
                                        <Users className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                                        <p className="text-zinc-500 font-bold">Nenhum lead recebido ainda.</p>
                                        <p className="text-zinc-700 text-xs mt-1">Os contactos aparecem aqui quando alguém preenher o formulário.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {leads.map((lead, i) => (
                                            <motion.div
                                                key={lead.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4 hover:border-brand/30 transition-colors"
                                            >
                                                <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <span className="text-brand font-black text-sm">{lead.name.charAt(0).toUpperCase()}</span>
                                                </div>

                                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4 text-brand flex-shrink-0" />
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Nome</p>
                                                            <p className="text-sm font-bold text-white">{lead.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <PhoneCall className="w-4 h-4 text-brand flex-shrink-0" />
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Telemóvel</p>
                                                            <a href={`tel:${lead.phone}`} className="text-sm font-bold text-white hover:text-brand transition-colors">{lead.phone}</a>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4 text-brand flex-shrink-0" />
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Email</p>
                                                            <a href={`mailto:${lead.email}`} className="text-sm font-bold text-white hover:text-brand transition-colors truncate">{lead.email}</a>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Tag className="w-4 h-4 text-brand flex-shrink-0" />
                                                        <div>
                                                            <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Interesse</p>
                                                            <p className="text-sm font-bold text-white">{lead.interest}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-zinc-600 text-[10px] font-bold whitespace-nowrap">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(lead.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
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
        </div>
    );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="relative pl-4">
        <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{title}</h3>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{subtitle}</p>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand rounded-full shadow-[0_0_15px_rgba(0,85,255,0.8)]" />
    </div>
);

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="space-y-2 group">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1 group-focus-within:text-brand transition-colors">{label}</label>
        <input
            type="text" value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all text-white"
        />
    </div>
);

const TextArea = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="space-y-2 group">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1 group-focus-within:text-brand transition-colors">{label}</label>
        <textarea
            rows={5} value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all text-white resize-none"
        />
    </div>
);

const ImageUpload = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => { onChange(reader.result as string); setIsUploading(false); };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-2 group">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1 group-focus-within:text-brand transition-colors">{label}</label>
            <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-[1.2rem] overflow-hidden bg-black border border-zinc-800 flex-shrink-0 group/img">
                    <img src={value} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" alt="Preview" />
                    {isUploading && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                            <div className="w-6 h-6 border-3 border-brand border-t-transparent animate-spin rounded-full" />
                        </div>
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                        <Upload className="w-6 h-6 text-white" />
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                </div>
                <input
                    type="text" value={value} onChange={(e) => onChange(e.target.value)}
                    placeholder="URL ou Base64..."
                    className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-5 py-4 text-[10px] font-bold focus:outline-none focus:border-brand transition-all text-white/50"
                />
            </div>
        </div>
    );
};

export default AdminPanel;
