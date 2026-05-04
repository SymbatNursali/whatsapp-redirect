# WhatsApp Redirect MVP

A simple Next.js application for TikTok Pixel to WhatsApp redirection.

## Features
- TikTok Pixel `Contact` event tracking on button click.
- 500ms delay before redirecting to WhatsApp.
- Static client configuration in `lib/clients.ts`.
- No database or server-side events needed.

## Setup
1. Edit `lib/clients.ts` to add/remove clients.
2. Deploy to Vercel.

## Routes
- `/r/[slug]` - Redirect page for a specific client.
- `/` - List of all clients.
