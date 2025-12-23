'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useBrandTheme } from '@/hook/useBrandThemes';
import { menuConfig } from '@/config/nav-items';

export function NavContent() {
  const pathname = usePathname();
  const brand = useBrandTheme();

  // 1. Lógica para decidir qual menu mostrar
  let currentMenu = menuConfig.main; // Padrão

  if (pathname.startsWith('/lojas')) {
    currentMenu = menuConfig.solar;
  } else if (pathname.startsWith('/naturovos')) {
    currentMenu = menuConfig.naturovos;
  }

  // Verifica se estamos em um sub-contexto (não na home principal)
  const isSubPage = pathname !== '/';

  return (
    <div className="flex flex-col h-full bg-white border-r">
      
      {/* HEADER DO MENU */}
      <div className={cn("flex items-center gap-3 h-16 px-6 border-b", brand.color, "text-white transition-colors duration-500")}>
        <div className="bg-white/20 p-1.5 rounded-md backdrop-blur-sm shadow-sm">
           <Image 
             src={brand.src} 
             alt={brand.alt} 
             width={32} 
             height={32} 
             className="object-contain w-8 h-8"
           />
        </div>
        <span className="font-bold text-lg tracking-tight truncate">{brand.alt}</span>
      </div>

      {/* LISTA DE LINKS DINÂMICA */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        
        {/* Renderiza os itens específicos daquele departamento */}
        {currentMenu.map((item) => {
          const isActive = pathname === item.href;
            const isExternal = item.href.startsWith('http');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? cn(brand.color, "text-white shadow-md ring-1 ring-white/20") 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-slate-500 group-hover:text-slate-700")} />
              {item.label}
            </Link>
          );
        })}

        {/* Separador */}
        {isSubPage && <div className="my-4 border-t border-slate-100" />}

        {/* Botão VOLTAR PARA HOME (Só aparece se estiver dentro de Lojas ou Naturovos) */}
        {isSubPage && (
             <Link
             href="/"
             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
           >
             <ArrowLeft className="h-5 w-5" />
             Trocar Unidade
           </Link>
        )}

      </nav>

      {/* RODAPÉ DO MENU */}
      <div className="p-4 border-t bg-slate-50/50">
        <p className="text-xs text-slate-400 text-center font-medium">
          Sistema de Gestão v2.0
        </p>
      </div>
    </div>
  );
}