export type ClientConfig = {
  slug: string;
  name: string;
  pixelId: string;
  phone: string;
  whatsappMessage: string;
  title: string;
  subtitle: string;
  buttonText: string;
};

export const clients: Record<string, ClientConfig> = {
  client1: {
    slug: "client1",
    name: "Client 1",
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
    slug: "client3",
    name: "Client 3",
    pixelId: "TIKTOK_PIXEL_ID_3",
    phone: "77000000003",
    whatsappMessage: "Здравствуйте, хочу узнать подробнее",
    title: "Оставьте заявку в WhatsApp",
    subtitle: "Нажмите на кнопку ниже, чтобы перейти в WhatsApp.",
    buttonText: "Перейти в WhatsApp",
  },
};

export function getClientBySlug(slug: string) {
  return clients[slug] ?? null;
}
