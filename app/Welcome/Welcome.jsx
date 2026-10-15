'use client';

import Image from 'next/image';
import bgImage from '../image/background_new.jpg';
import { Button, Card } from '../Style';

export default function Welcome() {
    return (
        <div className='relative flex flex-col items-center justify-center min-h-[100dvh] w-full overflow-hidden px-4'>
            <Image
                src={bgImage}
                alt="Background 20-10"
                fill
                priority
                sizes="100vw"
                quality={95}
                className="object-cover object-center -z-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FAEEF3]/30 via-transparent to-[#FDF6F0]/20 pointer-events-none -z-[5]" />
            <Card glow className="z-10 flex flex-col items-center text-center max-w-2xl mb-8 animate-fadeInUp">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-burgundy/10 border border-burgundy/20 text-burgundy text-xs sm:text-sm font-medium tracking-[0.12em] uppercase mb-4">
                    🌸 Ngày Phụ Nữ Việt Nam
                </span>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-rose-heading dark:text-white tracking-tight leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Chị em là ai đó{" "}
                    <span className="italic bg-gradient-to-r from-burgundy via-burgundy-hover to-gold bg-clip-text text-transparent">
                        vào Check-in nha
                    </span>
                </h1>
                <p className="mt-4 text-sm sm:text-base text-rose-body/75 dark:text-zinc-300 font-light max-w-lg leading-relaxed">
                    Gửi trọn yêu thương và những lời chúc rạng rỡ nhất đến phái đẹp 💕
                </p>
            </Card>

            <Button
                href="/Infor"
                variant="primary"
                size="lg"
                className="z-10 tracking-widest text-base sm:text-lg px-10 sm:px-12 py-3 sm:py-3.5 shadow-lg animate-fadeIn"
                style={{ animationDelay: '0.2s' }}
            >
                Welcome
            </Button>
        </div>
    );
}