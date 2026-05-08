"use client";

import { useEffect } from "react";
import Script from "next/script";
import { notFound, useParams } from "next/navigation";
import { clients } from "@/lib/clients";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getTikTokPixelScript } from "@/lib/tiktok";

// ─── ВРЕМЕННЫЙ ФИХ: ВСЕГДА CLIENT3 ──────────────────────────────────────────
const ACTIVE_CLIENT_KEY = "client3";

export default function RedirectPage() {
  const params = useParams();
  const sourceSlug = Array.isArray(params.slug)
    ? params.slug[0]
    : (params.slug ?? "unknown");

  const client = clients[ACTIVE_CLIENT_KEY];

  if (!client) {
    notFound();
  }

  const whatsappUrl = buildWhatsAppUrl(client.phone, client.whatsappMessage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;

      // Даем небольшую паузу для загрузки пикселя и отправляем события
      const timer = setTimeout(() => {
        try {
          if (win.ttq) {
            // Отправляем Contact при автоматическом переходе
            win.ttq.track("Contact", {
              content_name: "auto_redirect",
              content_type: "lead",
              client_slug: client.slug,
              source_slug: sourceSlug,
            });
            
            // Также отправим ViewContent для полноты данных
            win.ttq.track("ViewContent", {
              content_name: "redirect_page",
              content_type: "lead",
              client_slug: client.slug,
              source_slug: sourceSlug,
            });
          }
        } catch (error) {
          console.error("TikTok tracking error:", error);
        }

        // Автоматический редирект
        window.location.href = whatsappUrl;
      }, 500);

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

      <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-5">
        <div className="flex flex-col items-center">
          {/* Простой индикатор загрузки */}
          <div className="w-10 h-10 border-4 border-neutral-800 border-t-white rounded-full animate-spin mb-6"></div>
          
          <h1 className="text-xl font-semibold mb-2">Переходим в WhatsApp...</h1>
          <p className="text-neutral-400 text-sm">Пожалуйста, подождите секунду.</p>
          
          {/* Скрытая ссылка на всякий случай */}
          <a href={whatsappUrl} className="mt-8 text-xs text-neutral-600 underline">
            Нажмите здесь, если переход не произошел автоматически
          </a>
        </div>
      </main>
    </>
  );
}
