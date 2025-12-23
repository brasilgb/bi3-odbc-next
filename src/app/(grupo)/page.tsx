import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
       <main className="flex-grow flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in duration-500 min-h-[calc(100vh-160px)]">
        
        <div className="mb-8">
            <Link href="https://portal.gruposolar.com.br">
                <Button 
                    variant="outline" 
                    className="gap-2 rounded-full border-slate-300 text-slate-600 hover:text-[#0d3b85] hover:border-[#0d3b85] hover:bg-slate-50 transition-all"
                >
                    <ArrowLeft size={16} />
                    Voltar ao Portal
                </Button>
            </Link>
        </div>
        
        {/* TÍTULO */}
        <div className="text-center mb-12 space-y-2">
            <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-[#c1478a] drop-shadow-sm">
                Relatórios Administrativos
            </h1>
            <p className="text-slate-500 font-medium">Selecione uma unidade de negócio para continuar</p>
        </div>

        {/* GRID DE CARDS */}
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center items-center">
            
            {/* CARD LOJAS SOLAR */}
            <Link href="/lojas" className="group">
                <Card className="w-72 h-48 relative overflow-hidden bg-white border-2 border-[#1a9cd9]/20 hover:border-[#1a9cd9] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center rounded-xl cursor-pointer">
                    <div className="absolute inset-0 bg-[#1a9cd9]/5 group-hover:bg-[#1a9cd9]/10 transition-colors" />
                    
                    <div className="z-10 flex flex-col items-center gap-4 p-6">
                        <Image 
                            src="/logos/logo_solar.png" 
                            width={180} 
                            height={60} 
                            alt="Logo Solar" 
                            className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="text-[#1a9cd9] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                            Acessar Dashboard
                        </span>
                    </div>
                </Card>
            </Link>

            {/* CARD NATUROVOS */}
            <Link href="/naturovos" className="group">
                <Card className="w-72 h-48 relative overflow-hidden bg-white border-2 border-[#F99F1E]/20 hover:border-[#F99F1E] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center rounded-xl cursor-pointer">
                    <div className="absolute inset-0 bg-[#F99F1E]/5 group-hover:bg-[#F99F1E]/10 transition-colors" />
                    
                    <div className="z-10 flex flex-col items-center gap-4 p-6">
                        <Image 
                            src="/logos/logo_naturovos.png" 
                            width={160} 
                            height={50} 
                            alt="Logo Naturovos" 
                            className="object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="text-[#F99F1E] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                            Acessar Dashboard
                        </span>
                    </div>
                </Card>
            </Link>
        </div>
    </main>
    )
}
