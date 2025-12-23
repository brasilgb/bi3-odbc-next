'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { menuConfig } from '@/config/nav-items';
import { useBrandTheme } from '@/hook/useBrandThemes';

export function SectorTabsMenu() {
  const pathname = usePathname();
  const brand = useBrandTheme();

  // 1. Lógica para decidir qual lista de menu carregar
  let currentMenu = menuConfig.main;

  if (pathname.startsWith('/lojas')) {
    currentMenu = menuConfig.solar;
  } else if (pathname.startsWith('/naturovos')) {
    currentMenu = menuConfig.naturovos;
  }

  return (
    // CONTAINER PRINCIPAL (Fundo Branco, Sombra suave embaixo)
    <div className="w-full bg-white border-b shadow-sm sticky top-16 z-30">
      <div className="mx-4">
        
        {/* ÁREA DE SCROLL (Overflow-x-auto permite deslizar no mobile) */}
        <nav 
            className="flex items-center gap-1 overflow-x-auto no-scrollbar px-4 md:px-0 py-0"
            style={{ 
                // Injeta a cor do tema para uso no CSS
                '--brand-color': brand.hex 
            } as React.CSSProperties}
        >
          {currentMenu.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  // ESTILO BASE DO BOTÃO (Tab)
                  "flex items-center gap-2 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 select-none",
                  
                  // ESTILO ATIVO (Usa a variável CSS da marca)
                  isActive 
                    ? "border-[var(--brand-color)] text-[var(--brand-color)] bg-[var(--brand-color)]/5" // Borda colorida + Fundo suave
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50" // Estado normal
                )}
              >
                <item.icon size={18} className={cn("mb-0.5", isActive ? "stroke-[2.5px]" : "stroke-2")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}