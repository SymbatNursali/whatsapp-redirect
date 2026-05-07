import { redirect } from "next/navigation";

export default function Home() {
  // Автоматически перенаправляем на первого клиента (client1)
  redirect("/r/client1");
}
