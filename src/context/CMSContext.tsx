import React, { createContext, useContext, useState, useEffect } from 'react';

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

const initialData: CMSData = {
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
    updateData: (newData: CMSData) => void;
    isAdmin: boolean;
    setIsAdmin: (val: boolean) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<CMSData>(() => {
        const saved = localStorage.getItem('helder-pinto-cms-data');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Remove menus if it exists in saved data to keep it clean
            if (parsed.menus) delete parsed.menus;
            return parsed;
        }
        return initialData;
    });
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        localStorage.setItem('helder-pinto-cms-data', JSON.stringify(data));
    }, [data]);

    const updateData = (newData: CMSData) => {
        setData(newData);
    };

    return (
        <CMSContext.Provider value={{ data, updateData, isAdmin, setIsAdmin }}>
            {children}
        </CMSContext.Provider>
    );
};

export const useCMS = () => {
    const context = useContext(CMSContext);
    if (!context) {
        throw new Error('useCMS must be used within a CMSProvider');
    }
    return context;
};
