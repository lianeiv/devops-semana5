import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "online",
    items: ["Configurar Docker", "Automatizar CI", "Publicar no GHCR"]
  });
}