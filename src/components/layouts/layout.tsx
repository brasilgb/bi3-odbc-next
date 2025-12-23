import React, { ReactNode } from 'react'
import { Header } from './header';
import { Footer } from './footer';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayot({ children }: AppLayoutProps) {
    return (
        <main className="flex flex-col min-h-screen bg-white">
            <Header />
            <div className="grow">
                {children}
            </div>
            <Footer />
        </main>
    )
}
