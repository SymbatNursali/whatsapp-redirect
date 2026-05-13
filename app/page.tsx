"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { client } from "@/lib/clients";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getTikTokPixelScript } from "@/lib/tiktok";
import { trackClickAction } from "./r/[slug]/actions";

export default function Home() {
  const whatsappUrl = buildWhatsAppUrl(client.phone, client.whatsappMessage);
  const [clicked, setClicked] = useState(false);

  // ViewContent на загрузке страницы
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const win = window as any;
        if (win.ttq) {
          win.ttq.track("ViewContent", {
            content_name: "home_page",
            content_type: "lead",
          });
        }
      } catch (error) {
        console.error("TikTok ViewContent error:", error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    if (clicked) return;
    setClicked(true);

    const win = window as any;
    const eventId = `click-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    try {
      if (win.ttq) {
        win.ttq.track("Contact", {
          content_name: "whatsapp_click",
          content_type: "lead",
        }, { event_id: eventId });

        win.ttq.track("SubmitForm", {
          content_name: "whatsapp_click",
          content_type: "lead",
        }, { event_id: `sf-${eventId}` });
      }
    } catch (error) {
      console.error("TikTok click tracking error:", error);
    }

    trackClickAction("root", eventId).catch(console.error);

    setTimeout(() => {
      window.location.href = whatsappUrl;
    }, 200);
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

      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          margin: 0,
        }}
      >
        <button
          id="whatsapp-cta"
          onClick={handleWhatsAppClick}
          disabled={clicked}
          style={{
            width: "90%",
            maxWidth: "360px",
            height: "58px",
            backgroundColor: clicked ? "#a0d6b4" : "#25D366",
            color: "#ffffff",
            fontSize: "17px",
            fontWeight: 600,
            border: "none",
            borderRadius: "14px",
            cursor: clicked ? "default" : "pointer",
            fontFamily: "Arial, Helvetica, sans-serif",
            letterSpacing: "0.2px",
            transition: "background-color 0.2s ease, transform 0.1s ease",
            WebkitTapHighlightColor: "transparent",
            userSelect: "none",
          }}
          onMouseDown={(e) => {
            if (!clicked) (e.currentTarget.style.transform = "scale(0.97)");
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          onTouchStart={(e) => {
            if (!clicked) (e.currentTarget.style.transform = "scale(0.97)");
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {clicked ? "Переход..." : "Перейти в WhatsApp"}
        </button>
      </main>
    </>
  );
}
