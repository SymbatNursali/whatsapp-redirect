import { createHash } from "crypto";

export function hashData(data: string): string {
  return createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

export async function sendTikTokEvent(config: {
  accessToken: string;
  pixelId: string;
  eventName: string;
  eventId: string;
  url: string;
  userAgent: string;
  ip: string;
}) {
  try {
    const payload = {
      pixel_code: config.pixelId,
      event: config.eventName,
      event_id: config.eventId,
      timestamp: new Date().toISOString(),
      context: {
        ad: {
          callback: null,
        },
        page: {
          url: config.url,
        },
        user_agent: config.userAgent,
        ip: config.ip,
      },
    };

    const response = await fetch(
      "https://business-api.tiktok.com/open_api/v1.3/event/track/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Token": config.accessToken,
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("TikTok Events API Error:", error);
    return { error: "Failed to send event" };
  }
}
