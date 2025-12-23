import {
    Home,
    Settings,
    BarChart3,      // Resumo
    DollarSign,     // Faturamento
    LineChart,      // Análise de Venda
    AlertCircle,    // Inadimplência
    ShoppingCart,   // Compras
    ArrowLeftRight, // Fluxo
    Landmark,       // Empréstimo
    FileText,       // DRE
    Egg,            // Produção (Temático)
    ClipboardList,
    LayoutDashboard
} from 'lucide-react';

export interface NavItem {
    label: string;
    href: string;
    icon: any;
}

export const menuConfig = {
    // Menu Principal (Home / Configurações)
    main: [
        { label: 'Início', href: '/', icon: Home },
        { label: 'Configurações', href: '/config', icon: Settings },
    ],

    // Menu Exclusivo SOLAR (Prefixo: /lojas)
    solar: [
        { label: 'Dashboard', href: '/lojas', icon: LayoutDashboard },
        { label: 'Resumo', href: '/lojas/resumo', icon: BarChart3 },
        { label: 'Faturamento', href: '/lojas/faturamento', icon: DollarSign },
        { label: 'Análise de Venda', href: '/lojas/analise-venda', icon: LineChart },
        { label: 'Inadimplência', href: '/lojas/inadimplencia', icon: AlertCircle },
        { label: 'Compras', href: '/lojas/compras', icon: ShoppingCart },
        { label: 'Fluxo', href: '/lojas/fluxo', icon: ArrowLeftRight },
        { label: 'Empréstimo', href: '/lojas/emprestimo', icon: Landmark },
        { label: 'DRE', href: '/lojas/dre', icon: FileText },
    ],

    // Menu Exclusivo NATUROVOS (Prefixo: /naturovos)
    naturovos: [
        { label: 'Dashboard', href: '/naturovos', icon: LayoutDashboard },
        { label: 'Produção', href: '/naturovos/producao', icon: Egg },           // Ícone de Ovo!
        { label: 'Resumo', href: '/naturovos/resumo', icon: BarChart3 },
        { label: 'Faturamento', href: '/naturovos/faturamento', icon: DollarSign },
        { label: 'Compras', href: '/naturovos/compras', icon: ShoppingCart },
        { label: 'ADM Resumo', href: '/naturovos/adm-resumo', icon: ClipboardList }, // Diferente do resumo comum
        { label: 'Fluxo', href: '/naturovos/fluxo', icon: ArrowLeftRight },
        { label: 'DRE', href: '/naturovos/dre', icon: FileText },
    ]
};