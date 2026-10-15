import { NextResponse } from "next/server";

export async function GET(request) {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : (realIp || "127.0.0.1");

    console.log(`[SERVER] 📡 IP máy truy cập: ${clientIp}`);

    return NextResponse.json({ ip: clientIp });
}
