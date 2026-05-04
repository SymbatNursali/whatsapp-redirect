import Link from "next/link";
import { clients } from "@/lib/clients";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center px-5">
      <h1 className="text-3xl font-bold mb-8">WA Redirect MVP</h1>
      <div className="grid gap-4 w-full max-w-md">
        {Object.values(clients).map((client) => (
          <Link
            key={client.slug}
            href={`/r/${client.slug}`}
            className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 transition"
          >
            <div className="font-semibold">{client.name}</div>
            <div className="text-sm text-neutral-400">/r/{client.slug}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
