"use client";

import { useEffect } from "react";
import Script from "next/script";
import { client } from "@/lib/clients";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getTikTokPixelScript } from "@/lib/tiktok";
import { trackRedirectAction } from "./r/[slug]/actions";

export default function Home() {
  const whatsappUrl = buildWhatsAppUrl(client.phone, client.whatsappMessage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      const eventId = `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Отправляем серверное событие
      trackRedirectAction("root", eventId).catch(console.error);

      const timer = setTimeout(() => {
        try {
          if (win.ttq) {
            win.ttq.track("Contact", {
              content_name: "root_redirect",
              content_type: "lead",
              client_slug: client.slug,
            }, { event_id: eventId });
          }
        } catch (error) {
          console.error("TikTok tracking error:", error);
        }

        window.location.href = whatsappUrl;
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [whatsappUrl]);

  return (
    <>
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getTikTokPixelScript(client.pixelId),
        }}
      />

      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500 text-sm">Переадресация...</p>
        </div>
      </main>
    </>
  );
}
