'use client'

import { usePathname } from 'next/navigation';

// 1. Definição do Tipo da Configuração
export interface IBrandConfig {
    key: string;       // Identificador único (útil para classes CSS condicionais)
    src: string;       // Caminho do logo
    alt: string;       // Texto alternativo
    color: string;     // Cor de fundo (Tailwind class)
    width: number;
    height: number;
    hex: string;
    text: string;
}

// 2. A Configuração Centralizada (Single Source of Truth)
const LOGO_CONFIG: Record<string, IBrandConfig> = {
    solar: {
        key: 'solar',
        src: '/logos/logo_solar.png',
        alt: 'Solar',
        color: 'bg-[#1a9cd9]',
        width: 120,
        height: 50,
        hex: '#1a9cd9',
        text: 'text-white/90'
    },
    naturovos: {
        key: 'naturovos',
        src: '/logos/logo_naturovos.png',
        alt: 'Naturovos',
        color: 'bg-[#F99F1E]',
        width: 120,
        height: 50,
        hex: '#F99F1E',
        text: 'text-gray-800'
    },
    grupo: {
        key: 'grupo',
        src: '/logos/logo_grupo.png',
        alt: 'Grupo Solar',
        color: 'bg-[#0d3b85]',
        width: 120,
        height: 50,
        hex: '#0d3b85',
        text: 'text-white/90'
    }
};

export function useBrandTheme() {
    const pathname = usePathname();

    // Lógica de decisão
    // Se estiver em /lojas/* -> Solar
    if (pathname?.startsWith('/lojas')) {
        return LOGO_CONFIG.solar;
    }

    // Se estiver em /naturovos/* -> Naturovos
    if (pathname?.startsWith('/naturovos')) {
        return LOGO_CONFIG.naturovos;
    }

    // Padrão -> Grupo Solar
    return LOGO_CONFIG.grupo;
}