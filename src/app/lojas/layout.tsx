import AdminLayout from '@/components/layouts/AdminLayout';
import AppLayot from '@/components/layouts/layout';
import React, { ReactNode } from 'react'

interface LojasProps {
    children: ReactNode;
}

export default function LojasLayout({ children }: LojasProps) {
  return (
    <AdminLayout>{children}</AdminLayout>
  )
}
