import AdminLayout from '@/components/layouts/AdminLayout';
import AppLayot from '@/components/layouts/layout';
import React, { ReactNode } from 'react'

interface NaturovosProps {
    children: ReactNode;
}

export default function NaturovosLayout({ children }: NaturovosProps ) {
  return (
    <AdminLayout>{children}</AdminLayout>
  )
}
