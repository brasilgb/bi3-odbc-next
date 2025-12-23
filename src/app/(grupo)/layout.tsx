import AppLayot from '@/components/layouts/layout'
import React, { ReactNode } from 'react'

interface LojasProps {
  children: ReactNode;
}

export default function GrupoLayout({ children }: LojasProps) {
  return (
    <AppLayot>{children}</AppLayot>
  )
}
