export type ClientConfig = {
  slug: string;
  name: string;
  pixelId: string;
  phone: string;
  whatsappMessage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  accessToken?: string;
};

export const clients: Record<string, ClientConfig> = {
  client1: {
    slug: "Лидия_таро",
    name: "Лидия_таро",
    pixelId: "TIKTOK_PIXEL_ID_1",
    phone: "77000000001",
    whatsappMessage: "Здравствуйте, хочу узнать подробнее",
    title: "Оставьте заявку в WhatsApp",
    subtitle: "Нажмите на кнопку ниже, чтобы перейти в WhatsApp.",
    buttonText: "Перейти в WhatsApp",
  },

  client2: {
    slug: "client2",
    name: "Client 2",
    pixelId: "TIKTOK_PIXEL_ID_2",
    phone: "77000000002",
    whatsappMessage: "Здравствуйте, хочу узнать подробнее",
    title: "Оставьте заявку в WhatsApp",
    subtitle: "Нажмите на кнопку ниже, чтобы перейти в WhatsApp.",
    buttonText: "Перейти в WhatsApp",
  },

  client3: {
    slug: "Анна_гадалка",
    name: "Анна_гадалка",
    pixelId: "D7U6MHRC77U9TECLJ2QG",
    phone: "996559515561",
    whatsappMessage: "Здравствуйте, хочу разбор",
    title: "Оставьте заявку в WhatsApp",
    subtitle: "Нажмите на кнопку ниже, чтобы перейти в WhatsApp.",
    buttonText: "Перейти в WhatsApp",
    accessToken: "da2e22d8cce901e8809b81dd7a65be05a5981d2c",
  },
};

export function getClientBySlug(slug: string) {
  return clients[slug] ?? null;
}
