import Script from "next/script";
import { notFound } from "next/navigation";
import { getClientBySlug } from "@/lib/clients";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getTikTokPixelScript } from "@/lib/tiktok";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const client = getClientBySlug(slug);

  if (!client) {
    notFound();
  }

  const whatsappUrl = buildWhatsAppUrl(
    client.phone,
    client.whatsappMessage
  );

  return (
    <>
      <Script
        id={`tiktok-pixel-${client.slug}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: getTikTokPixelScript(client.pixelId),
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
            onClick={(event) => {
              event.preventDefault();

              if (typeof window !== "undefined") {
                const win = window as typeof window & {
                  ttq?: {
                    track?: (
                      eventName: string,
                      payload?: Record<string, unknown>
                    ) => void;
                  };
                };

                try {
                  win.ttq?.track?.("Contact", {
                    content_name: "whatsapp_click",
                    content_type: "lead",
                    client_slug: client.slug,
                    client_name: client.name,
                  });
                } catch (error) {
                  console.error("TikTok tracking error:", error);
                }

                setTimeout(() => {
                  window.location.href = whatsappUrl;
                }, 500);
              }
            }}
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
