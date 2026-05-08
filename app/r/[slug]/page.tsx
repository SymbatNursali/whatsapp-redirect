"use client";

import Script from "next/script";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { clients } from "@/lib/clients";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getTikTokPixelScript } from "@/lib/tiktok";

// ─── ВРЕМЕННЫЙ ФИХ ───────────────────────────────────────────────────────────
// Активный клиент жёстко зафиксирован на client3.
// Slug из URL сохраняется только как source_slug для аналитики.
// Когда будем запускать других клиентов — убрать ACTIVE_CLIENT_KEY
// и вернуть getClientBySlug(slug).
const ACTIVE_CLIENT_KEY = "client3";
// ─────────────────────────────────────────────────────────────────────────────

export default function RedirectPage() {
  const params = useParams();
  const sourceSlug = Array.isArray(params.slug)
    ? params.slug[0]
    : (params.slug ?? "unknown");

  // Всегда берём client3, независимо от URL
  const client = clients[ACTIVE_CLIENT_KEY];

  if (!client) {
    notFound();
  }

  const whatsappUrl = buildWhatsAppUrl(client.phone, client.whatsappMessage);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const win = window as typeof window & {
      ttq?: {
        track?: (
          eventName: string,
          payload?: Record<string, unknown>
        ) => void;
      };
    };

    try {
      // ClickButton — клик по кнопке
      win.ttq?.track?.("ClickButton", {
        content_name: "whatsapp_button",
        content_type: "lead",
        client_slug: client.slug,
        source_slug: sourceSlug,
      });

      // Contact — финальное событие перед редиректом
      win.ttq?.track?.("Contact", {
        content_name: "whatsapp_click",
        content_type: "lead",
        client_slug: client.slug,
        source_slug: sourceSlug,
      });
    } catch (error) {
      console.error("TikTok tracking error:", error);
    }

    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 500);
  };

  return (
    <>
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getTikTokPixelScript(client.pixelId),
        }}
      />

      {/* ViewContent — отправляется после загрузки пикселя */}
      <Script
        id="tiktok-viewcontent"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var attempts = 0;
              var interval = setInterval(function() {
                attempts++;
                if (window.ttq && window.ttq.track) {
                  clearInterval(interval);
                  window.ttq.track('ViewContent', {
                    content_name: 'redirect_page',
                    content_type: 'lead',
                    client_slug: '${client.slug}',
                    source_slug: '${sourceSlug}'
                  });
                } else if (attempts > 20) {
                  clearInterval(interval);
                }
              }, 200);
            })();
          `,
        }}
      />

      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-5">
        <section className="w-full max-w-md rounded-3xl bg-neutral-900 border border-neutral-800 p-6 shadow-2xl">
          <div className="mb-6">
            <div className="mb-3 inline-flex rounded-full bg-neutral-800 px-3 py-1 text-xs text-neutral-300">
              {client.name}
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              {client.title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-neutral-300">
              {client.subtitle}
            </p>
          </div>

          <a
            href={whatsappUrl}
            onClick={handleClick}
            className="flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 text-base font-semibold text-neutral-950 transition hover:bg-neutral-200 active:scale-[0.99]"
          >
            {client.buttonText}
          </a>

          <p className="mt-4 text-center text-xs text-neutral-500">
            После нажатия откроется WhatsApp.
          </p>
        </section>
      </main>
    </>
  );
}
