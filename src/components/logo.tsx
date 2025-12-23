import Image from 'next/image'
import React from 'react'

interface LogoProps {
    src: any;
    alt: any;
    width: number;
    height: number;
}
export default function Logo({ src, alt, width, height }: LogoProps) {

    return (
        <div>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
            />
        </div>
    )
}
