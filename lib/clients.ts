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

export const client: ClientConfig = {
  slug: "Lida_mama",
  name: "Lida_mama",
  pixelId: "D81ILDJC77U5JTTNKJUG",
  phone: "996551050163",
  whatsappMessage: "Здравствуйте, хочу разбор",
  title: "Оставьте заявку в WhatsApp",
  subtitle: "Нажмите на кнопку ниже, чтобы перейти в WhatsApp.",
  buttonText: "Перейти в WhatsApp",
  accessToken: "f6ffada54ad074b8825e428cc5d0c9a7dc3f6cb4",
};
