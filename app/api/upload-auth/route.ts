import { NextResponse } from "next/server";

export async function GET() {
  try {
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY?.trim();
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim();

    if (!publicKey || !privateKey) {
      console.error("ImageKit environment variables are missing.");
      return NextResponse.json(
        {
          message:
            "ImageKit keys are missing. Check your environment variables.",
        },
        { status: 500 }
      );
    }

    const token = crypto.randomUUID();
    const expire = Math.floor(Date.now() / 1000) + 30 * 60;

    // Standard Web Crypto HMAC for universal compatibility
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(privateKey),
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(token + expire)
    );
    const signature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return NextResponse.json({
      token,
      expire,
      signature,
      publicKey,
    });
  } catch (error) {
    console.error("ImageKit authentication error:", error);
    return NextResponse.json(
      { message: "Failed to generate ImageKit authentication parameters." },
      { status: 500 }
    );
  }
}