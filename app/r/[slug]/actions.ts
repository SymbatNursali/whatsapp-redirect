"use server";

import { client } from "@/lib/clients";
import { sendTikTokEvent } from "@/lib/tiktok-server";
import { headers } from "next/headers";

export async function trackRedirectAction(sourceSlug: string, eventId: string) {
  if (!client || !client.accessToken) return { success: false, reason: "No client or token" };

  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "unknown";
  const ip = headerList.get("x-forwarded-for") || headerList.get("x-real-ip") || "127.0.0.1";
  
  // Используем фиксированный путь для одного клиента
  const url = `https://${headerList.get("host")}/r/${client.slug}`;

  const result = await sendTikTokEvent({
    accessToken: client.accessToken,
    pixelId: client.pixelId,
    eventName: "Contact",
    eventId: eventId,
    url: url,
    userAgent: userAgent,
    ip: Array.isArray(ip) ? ip[0] : ip.split(',')[0],
  });

  return { success: true, result };
}
