import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface Property {
    id: number;
    title: string;
    location: string;
    price: string;
    image: string;
    area: string;
    beds: number;
    baths: number;
    description: string;
    details: Array<{ label: string; value: string; icon: string }>;
}

export interface CMSData {
    hero: {
        title: string;
        subtitle: string;
        description: string;
        image: string;
        logo: string;
    };
    properties: Property[];
    footer: {
        phone: string;
        email: string;
        location: string;
        locationUrl: string;
        socials: {
            instagram: string;
            facebook: string;
            remax: string;
            whatsapp: string;
        };
    };
}

// Dados padrão — usados apenas se o banco estiver vazio
export const initialData: CMSData = {
    hero: {
        title: "Excelência & Exclusividade",
        subtitle: "Acesso privilegiado aos imóveis mais exclusivos do mercado, para quem procura privacidade e distinção.",
        description: "Descubra análises estratégicas, tendências do mercado imobiliário e oportunidades reservadas a investidores criteriosos. Mais do que informação — inteligência aplicada para decisões que elevam e preservam patrimônios.",
        image: "/helder1.png",
        logo: "/logo.png"
    },
    properties: [
        {
            id: 1,
            title: 'Moradia T2',
            location: 'Castro Daire',
            price: '158 000 €',
            image: '/imoveis/Moradia T2 à venda em Castro Daire.jpg',
            area: '60 m²',
            beds: 2,
            baths: 1,
            description: 'Situada em pleno centro da vila de Castro Daire, esta moradia T2 em pedra com um potencial enorme de investimento, ideal para habitação própria ou para Alojamento Local.',
            details: [
                { label: 'Área Bruta Privativa m²', value: '60', icon: 'area' },
                { label: 'Área Útil m²', value: '49', icon: 'area' },
                { label: 'Quartos', value: '2', icon: 'bed' },
                { label: 'Ano de Construção', value: '1970', icon: 'calendar' },
                { label: 'WC / Casas de banho', value: '1', icon: 'bath' },
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
            description: 'A apenas cerca de 7km do centro de Castro Daire, esta moradia em pedra combina a tranquilidade da natureza, com o conforto e funcionalidade para o seu dia a dia.',
            details: [
                { label: 'Área Bruta Privativa m²', value: '150', icon: 'area' },
                { label: 'Área Total do Lote m²', value: '900', icon: 'area' },
                { label: 'Área Útil m²', value: '120', icon: 'area' },
                { label: 'Quartos', value: '4', icon: 'bed' },
                { label: 'Ano de Construção', value: '1996', icon: 'calendar' },
                { label: 'WC / Casas de banho', value: '3', icon: 'bath' },
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
            description: 'Terreno situado em espaço urbano, para construção em Lamelas, Castro Daire.',
            details: [
                { label: 'Área Total do Lote m²', value: '1 620', icon: 'area' },
                { label: 'Eficiência Energética', value: 'Ver certificado', icon: 'zap' },
            ]
        }
    ],
    footer: {
        phone: "+351 961 526 716",
        email: "hpinto@remax.pt",
        location: "Rua Padre Américo, nº 3 B, 3600-132, Castro Daire, Portugal",
        locationUrl: "https://maps.google.com/?q=Rua+Padre+Am%C3%A9rico+3B+3600-132+Castro+Daire",
        socials: {
            instagram: "https://www.instagram.com/helder_pinto_remax/",
            facebook: "https://www.facebook.com/helderpintoremax",
            remax: "https://remax.pt/pt/agente/helder-pinto/126421031",
            whatsapp: "https://wa.me/351961526716"
        }
    }
};

interface CMSContextType {
    data: CMSData;
    updateData: (newData: CMSData) => Promise<{ success: boolean; error?: string }>;
    isAdmin: boolean;
    setIsAdmin: (val: boolean) => void;
    isLoading: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const SUPABASE_ROW_ID = 'main';

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<CMSData>(initialData);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // ── Carrega os dados do Supabase ao montar ──
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: row, error } = await supabase
                    .from('helder_cms')
                    .select('data')
                    .eq('id', SUPABASE_ROW_ID)
                    .single();

                if (row && !error) {
                    const loaded: CMSData = row.data;
                    // Fallback: se o banco não tiver imóveis, preenche com os padrão
                    if (!loaded.properties || loaded.properties.length === 0) {
                        loaded.properties = initialData.properties;
                        await supabase
                            .from('helder_cms')
                            .update({ data: loaded })
                            .eq('id', SUPABASE_ROW_ID);
                    }
                    setData(loaded);
                } else {
                    // Linha não existe — cria agora com os dados iniciais
                    console.warn('Linha CMS não encontrada, criando...');
                    await supabase
                        .from('helder_cms')
                        .upsert([{ id: SUPABASE_ROW_ID, data: initialData }]);
                    setData(initialData);
                }
            } catch (err) {
                console.error("Erro ao carregar CMS do Supabase:", err);
                // Se falhar, usa os dados padrão do código
                setData(initialData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // ── Salva as alterações no Supabase e atualiza o estado local ──
    const updateData = useCallback(async (newData: CMSData): Promise<{ success: boolean; error?: string }> => {
        // Atualiza imediatamente o estado local (UI reativa)
        setData(newData);

        try {
            const { error } = await supabase
                .from('helder_cms')
                .update({ data: newData })
                .eq('id', SUPABASE_ROW_ID);

            if (error) {
                console.error("Supabase update error:", error);
                return { success: false, error: error.message };
            }

            console.log('✅ Dados salvos no Supabase com sucesso!');
            return { success: true };
        } catch (err: any) {
            console.error("Erro inesperado ao salvar:", err);
            return { success: false, error: err?.message || 'Erro desconhecido' };
        }
    }, []);

    return (
        <CMSContext.Provider value={{ data, updateData, isAdmin, setIsAdmin, isLoading }}>
            {children}
        </CMSContext.Provider>
    );
};

export const useCMS = () => {
    const ctx = useContext(CMSContext);
    if (!ctx) throw new Error('useCMS must be used within a CMSProvider');
    return ctx;
};
