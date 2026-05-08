import { redirect } from "next/navigation";

export default function Home() {
  // Временно перенаправляем всех сразу на страницу Анна_гадалка (client3)
  redirect("/r/client3");
}
