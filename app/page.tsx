import Link from "next/link";
import { clients } from "@/lib/clients";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Выберите клиента</h1>
          <p className="mt-2 text-sm text-neutral-400">Список доступных страниц редиректа</p>
        </div>

        <div className="grid gap-3">
          {Object.entries(clients).map(([key, client]) => (
            <Link
              key={key}
              href={`/r/${client.slug}`}
              className="group block p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{client.name}</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    Slug: {client.slug}
                  </div>
                </div>
                <div className="text-neutral-600 group-hover:text-neutral-400 transition-colors">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
