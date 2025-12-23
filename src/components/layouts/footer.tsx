// "use client"

// import { useBrandTheme } from "@/hook/useBrandThemes"

// export default function Footer() {
//     const brand = useBrandTheme();
//     return (
//         <footer className={`${brand.color} flex justify-center shadow-md transition-colors duration-300`}>
//             <p className={`text-xs ${brand.text} font-stretch-expanded`}>&copy; {new Date().getFullYear()} Solar Comércio e Agroindústria Ltda.</p>
//         </footer>
//     )
// }

'use client'

import { useBrandTheme } from '@/hook/useBrandThemes';

export function Footer() {
    const brand = useBrandTheme();

    return (
        <footer className={`${brand.color} text-white/90 py-1 shadow-inner mt-auto transition-colors duration-500`}>
            <div className="container mx-auto px-4 flex flex-row justify-between items-center text-[10px] md:text-xs font-medium">
                <p className={`${brand.text}`}>&copy; {new Date().getFullYear()} Solar Comércio e Agroindústria Ltda.</p>
                <div className="flex gap-4 md:mt-0 opacity-75">
                    <span className={`${brand.text}`}>TI - Sistemas</span>
                </div>
            </div>
        </footer>
    );
}