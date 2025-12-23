'use client'

import { menuConfig } from '@/config/nav-items';
import { usePathname } from 'next/navigation';

export function usePageTitle() {
  const pathname = usePathname();

  // 1. Unifica todas as listas de menu num único array para facilitar a busca
  const allItems = [
    ...menuConfig.main,
    ...menuConfig.solar,
    ...menuConfig.naturovos
  ];

  // 2. Procura o item que tem o mesmo href da URL atual
  const currentItem = allItems.find(item => item.href === pathname);

  // 3. Se achar, retorna o label (ex: "Faturamento"). Se não, retorna "Dashboard".
  return currentItem ? currentItem.label : 'Dashboard';
}