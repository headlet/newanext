
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { createHmac, randomUUID } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { env } = getCloudflareContext();

    const publicKey = (
      env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ||
      process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ||
      ""
    ).trim();

    const privateKey = (
      env.IMAGEKIT_PRIVATE_KEY ||
      process.env.IMAGEKIT_PRIVATE_KEY ||
      ""
    ).trim();

    if (!publicKey || !privateKey) {
      console.error("ImageKit configuration missing:", {
        publicKeyPresent: Boolean(publicKey),
        privateKeyPresent: Boolean(privateKey),
      });

      return NextResponse.json(
        { message: "ImageKit server configuration is missing." },
        { status: 500 },
      );
    }

    const token = randomUUID();
    const expire = Math.floor(Date.now() / 1000) + 30 * 60;

    const signature = createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex");

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey,
    });
  } catch (error) {
    console.error("ImageKit auth route failed:", error);

    return NextResponse.json(
      { message: "Failed to generate ImageKit authentication." },
      { status: 500 },
    );
  }
}
