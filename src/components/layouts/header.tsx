'use client'

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { HeaderControls } from './HeaderControls';
import { ChevronDown, Store, Sprout, LayoutGrid, LogOut, User } from 'lucide-react';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useBrandTheme } from '@/hook/useBrandThemes';
import { usePageTitle } from '@/hook/usePageTitle';

export function Header() {
  const brand = useBrandTheme();

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white border-b flex items-center px-4">
        
        <div className="flex-1 flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
             <div className={`p-1.5 rounded-lg ${brand.color} border-2 border-slate-100`}>
               <Image 
                 src={brand.src} 
                 alt={brand.alt} 
                 width={brand.width > 100 ? 80 : 30} 
                 height={30} 
                 className="h-8 w-auto object-contain"
               />
             </div>
          </Link>
          
          <div className="h-6 w-px bg-slate-200 hidden md:block" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-100 -ml-2 md:ml-0 h-9">
                <span className="text-sm font-semibold text-slate-700 hidden md:inline-block">{brand.alt}</span>
                <span className={cn("h-2 w-2 rounded-full md:hidden", brand.color)} />
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="text-xs font-normal text-slate-500">Trocar Unidade</DropdownMenuLabel>
                <DropdownMenuItem asChild><Link href="/lojas" className="cursor-pointer flex gap-2"><div className="bg-blue-100 p-1 rounded text-blue-600"><Store size={14}/></div><span>Lojas Solar</span></Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/naturovos" className="cursor-pointer flex gap-2"><div className="bg-orange-100 p-1 rounded text-orange-600"><Sprout size={14}/></div><span>Naturovos</span></Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="https://portal.gruposolar.com.br" className="cursor-pointer flex gap-2 text-slate-600"><LayoutGrid size={14}/><span>Voltar ao Portal</span></Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden md:flex justify-center">
             <HeaderControls />
        </div>
        
        <div className="md:hidden flex mr-2">
             <HeaderControls />
        </div>

        <div className="flex-1 flex items-center justify-end gap-3">
           <div className="text-right hidden sm:block leading-tight">
              <p className="text-sm font-medium text-slate-700">Administrador</p>
           </div>
           
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Avatar className={cn("h-9 w-9 cursor-pointer ring-2 ring-offset-2 ring-transparent transition-all hover:ring-slate-200", brand.color)}>
                    <AvatarFallback className="text-white bg-transparent font-bold text-xs">AD</AvatarFallback>
                 </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                 <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                 <DropdownMenuItem><User className="mr-2 h-4 w-4"/> Perfil</DropdownMenuItem>
                 <DropdownMenuItem className="text-red-600"><LogOut className="mr-2 h-4 w-4"/> Sair</DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>

    </header>
  );
}