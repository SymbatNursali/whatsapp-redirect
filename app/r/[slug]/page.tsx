"use client";

import { useEffect } from "react";
import Script from "next/script";
import { notFound, useParams } from "next/navigation";
import { client } from "@/lib/clients";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getTikTokPixelScript } from "@/lib/tiktok";

import { trackRedirectAction } from "./actions";

export default function RedirectPage() {
  const params = useParams();
  const sourceSlug = Array.isArray(params.slug)
    ? params.slug[0]
    : (params.slug ?? "unknown");

  const whatsappUrl = buildWhatsAppUrl(client.phone, client.whatsappMessage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      const eventId = `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Отправляем серверное событие (Conversion API)
      trackRedirectAction(sourceSlug, eventId).catch(console.error);

      // Даем небольшую паузу для загрузки пикселя и отправляем события
      const timer = setTimeout(() => {
        try {
          if (win.ttq) {
            // Отправляем Contact при автоматическом переходе с тем же eventId для дедупликации
            win.ttq.track("Contact", {
              content_name: "auto_redirect",
              content_type: "lead",
              client_slug: client.slug,
              source_slug: sourceSlug,
            }, { event_id: eventId });
            
            // Также отправим ViewContent
            win.ttq.track("ViewContent", {
              content_name: "redirect_page",
              content_type: "lead",
              client_slug: client.slug,
              source_slug: sourceSlug,
            }, { event_id: `view-${eventId}` });
          }
        } catch (error) {
          console.error("TikTok tracking error:", error);
        }

        // Автоматический редирект
        window.location.href = whatsappUrl;
      }, 300); // 300ms as requested for speed

      return () => clearTimeout(timer);
    }
  }, [whatsappUrl, client.slug, sourceSlug]);

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
          {/* Минимальный индикатор для прохождения модерации TikTok */}
          <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-500 text-sm">Переадресация...</p>
        </div>
      </main>
    </>
  );
}
