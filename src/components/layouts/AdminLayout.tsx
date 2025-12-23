'use client'

import { useBrandTheme } from '@/hook/useBrandThemes';
import { usePageTitle } from '@/hook/usePageTitle';
import { cn } from '@/lib/utils';
import { SectorTabsMenu } from '../SectorTabsMenu';
import { Header } from './header';
import { Footer } from './footer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const brand = useBrandTheme();
  const pageTitle = usePageTitle();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      <SectorTabsMenu />
      <main className="flex-1 w-full max-w-[1920px] mx-auto p-4 md:p-4 animate-in fade-in duration-500">
        {children}
      </main>
      <Footer />
    </div>
  );
}