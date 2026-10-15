'use client';

import React from "react";
import Image from "next/image";
import { Button, Card } from "../Style";
import bgImage from '../image/background_new.jpg';
import { useInforLogic } from "./InforLogic";

export default function Infor() {
    const {
        isPortrait,
        setIsPortrait,
        filter,
        employee,
        checkedInUser,
        errorMessage,
        filteredEmployees,
        handleInputChange,
        handleSelectEmployee,
        handleCheckIn,
    } = useInforLogic();

    return (
        <main className="relative flex flex-col items-center justify-center min-h-[100dvh] w-full overflow-y-auto px-4 py-8">
            {/* Ảnh nền toàn trang */}
            <Image
                src={bgImage}
                alt="Background 20-10"
                fill
                priority
                quality={95}
                className="object-cover object-center -z-20"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FAEEF3]/40 via-[#FDF6F0]/20 to-[#FDF6F0]/30 pointer-events-none -z-10" />

            <Card
                glow
                blur="lg"
                className="z-10 flex flex-col items-center text-center max-w-xl w-full mx-auto p-6 sm:p-10 animate-fadeInUp"
            >
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-burgundy/10 border border-burgundy/15 text-burgundy text-[10px] sm:text-xs font-medium tracking-[0.15em] uppercase mb-4">
                    🌸 Check-in Ngày 20/10 🌸
                </span>

                {/* Khung ảnh: Bắt đầu render khi đã Check-in đủ 3 thông tin */}
                {checkedInUser && (
                    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 my-3 w-full transition-all duration-500">

                        {/* Cột trái: Ảnh nhân viên (chỉ hiển thị nếu có hình) */}
                        {checkedInUser.image && (
                            <div
                                className={`relative flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 group transition-all duration-300 ${isPortrait
                                    ? "w-52 h-64 sm:w-56 sm:h-72"
                                    : "w-full sm:w-64 h-52 sm:h-60"
                                    }`}
                            >
                                <Image
                                    src={checkedInUser.image}
                                    alt={checkedInUser.name}
                                    fill
                                    unoptimized={typeof checkedInUser.image === "string"}
                                    onLoad={(e) => {
                                        const { naturalWidth, naturalHeight } = e.currentTarget;

                                        if (naturalWidth && naturalHeight) {
                                            setIsPortrait(naturalHeight > naturalWidth);
                                        }
                                    }}
                                    className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, 288px"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
                            </div>
                        )}


                        {/* Cột phải: Thông tin nhân viên + sự kiện */}
                        <div className="flex flex-col justify-between gap-3 flex-1 text-left">
                            <div>
                                {checkedInUser.isNotInList || !checkedInUser.name ? (
                                    <p className="text-sm sm:text-base font-bold text-burgundy dark:text-rose-300">
                                        Bạn chưa có tên trong danh sách, đợi lần cập nhật tiếp theo
                                    </p>
                                ) : (
                                    <p className="text-sm sm:text-base font-bold text-burgundy dark:text-rose-300">
                                        Check-in thành công: {checkedInUser.name}
                                    </p>
                                )}
                                <p className="text-xs text-rose-body/80 dark:text-zinc-300 mt-0.5">
                                    {checkedInUser.position} • {checkedInUser.department}
                                </p>
                            </div>

                            {/* Thông tin sự kiện */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-xl bg-burgundy/8 border border-burgundy/15">
                                    <span className="text-sm">🕗</span>
                                    <p className="text-[9px] font-semibold tracking-widest uppercase text-burgundy/70 dark:text-rose-300/70">Thời gian</p>
                                    <p className="text-sm font-extrabold text-rose-heading dark:text-white leading-tight text-center">8h30</p>
                                    <p className="text-[10px] text-rose-body/70 dark:text-zinc-400">ngày 19.10.2026</p>
                                </div>
                                <div className="flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-xl bg-burgundy/8 border border-burgundy/15">
                                    <span className="text-sm">📍</span>
                                    <p className="text-[9px] font-semibold tracking-widest uppercase text-burgundy/70 dark:text-rose-300/70">Địa điểm</p>
                                    <p className="text-sm font-extrabold text-rose-heading dark:text-white leading-tight text-center">Phòng họp lầu 5</p>
                                    <p className="text-[10px] text-rose-body/70 dark:text-zinc-400">Cty Asian Holding</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold/10 border border-gold/25">
                                <span className="text-lg flex-shrink-0">🎁</span>
                                <p className="text-xs text-rose-heading dark:text-white font-medium leading-snug">
                                    Ghé <span className="font-bold text-burgundy dark:text-rose-300">lễ tân</span> nhận quà nhen!
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {!checkedInUser && (
                    <h1
                        className="text-2xl sm:text-3xl font-semibold text-rose-heading dark:text-white tracking-tight leading-snug mt-1"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        Chị em là ai đó?
                    </h1>
                )}

                {!checkedInUser && (<p className="mt-2 text-xs sm:text-sm text-rose-body/70 dark:text-zinc-300 font-light max-w-md leading-relaxed">
                    Chào bạn đến với ngày 20/10 ngập tràn hoa và quà tặng ngọt ngào dành riêng cho các bạn nhen !
                </p>)}

                {/* Form tìm kiếm & nhập thông tin Check-in */}
                {!checkedInUser && (<div className="w-full max-w-md flex flex-col gap-2 my-4">
                    {/* Ô nhập Họ và tên */}
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={filter.name}
                            onChange={handleInputChange}
                            placeholder="Họ và tên..."
                            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/75 dark:bg-[#1e1215]/50 backdrop-blur-sm border border-[#F4D0DB]/70 dark:border-white/10 text-rose-heading dark:text-white placeholder:text-rose-body/40 dark:placeholder:text-zinc-500 text-sm outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy/50 transition-all"
                        />
                    </div>

                    {/* Ô nhập Phòng ban */}
                    <div className="relative">
                        <input
                            type="text"
                            name="department"
                            value={filter.department}
                            onChange={handleInputChange}
                            placeholder="Phòng ban..."
                            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/75 dark:bg-[#1e1215]/50 backdrop-blur-sm border border-[#F4D0DB]/70 dark:border-white/10 text-rose-heading dark:text-white placeholder:text-rose-body/40 dark:placeholder:text-zinc-500 text-sm outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy/50 transition-all"
                        />
                    </div>

                    {/* Ô nhập Chức vụ */}
                    <div className="relative">
                        <input
                            type="text"
                            name="position"
                            value={filter.position}
                            onChange={handleInputChange}
                            placeholder="Chức vụ..."
                            className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/75 dark:bg-[#1e1215]/50 backdrop-blur-sm border border-[#F4D0DB]/70 dark:border-white/10 text-rose-heading dark:text-white placeholder:text-rose-body/40 dark:placeholder:text-zinc-500 text-sm outline-none focus:ring-2 focus:ring-burgundy/30 focus:border-burgundy/50 transition-all"
                        />
                    </div>

                    {/* Thông báo lỗi khi thiếu thông tin */}
                    {errorMessage && (
                        <p className="text-xs text-red-500 font-medium text-left px-1">
                            ⚠️ {errorMessage}
                        </p>
                    )}

                    {/* Danh sách gợi ý nhân viên khi nhập */}
                    {(filter.name || filter.department || filter.position) && !employee && (
                        <div className="w-full max-h-52 overflow-y-auto rounded-2xl bg-[#FDF6F0]/98 dark:bg-[#1e1215]/98 backdrop-blur-md border border-[#F4D0DB]/60 shadow-lg divide-y divide-[#F4D0DB]/40 text-left animate-fadeIn">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((emp) => (
                                    <div
                                        key={emp.id}
                                        onClick={() => handleSelectEmployee(emp)}
                                        className="flex items-center justify-between px-4 py-3 hover:bg-[#FAEEF3]/80 dark:hover:bg-[#2a1520]/80 cursor-pointer transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <h4 className="font-semibold text-rose-heading dark:text-white text-sm">
                                                    {emp.name}
                                                </h4>
                                                <p className="text-xs text-rose-body/60 dark:text-zinc-400">
                                                    {emp.position} • {emp.department}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-xs text-rose-body/50 dark:text-zinc-400">
                                    Không tìm thấy nhân viên phù hợp
                                </div>
                            )}
                        </div>
                    )}
                </div>)}

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 w-full sm:w-auto">
                    {!checkedInUser && (<Button
                        variant="primary"
                        size="md"
                        onClick={handleCheckIn}
                        className="w-full sm:w-auto px-4 shadow-xl"
                    >
                        Check-in ngay
                    </Button>)}
                    <Button
                        href="/"
                        variant="secondary"
                        size="md"
                        className="w-full sm:w-auto px-6"
                    >
                        Quay lại
                    </Button>
                </div>
            </Card>
        </main>
    );
}
