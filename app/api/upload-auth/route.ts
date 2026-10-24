
import { createHmac, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const publicKey =
      process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY?.trim();

    const privateKey =
      process.env.IMAGEKIT_PRIVATE_KEY?.trim();

    if (!publicKey || !privateKey) {
      console.error("ImageKit environment variables are missing.");

      return NextResponse.json(
        {
          message:
            "ImageKit keys are missing. Check your environment variables.",
        },
        { status: 500 },
      );
    }

    const token = randomUUID();

    // Authentication expires in 30 minutes.
    const expire = Math.floor(Date.now() / 1000) + 30 * 60;

    // ImageKit requires an HMAC-SHA1 signature of token + expire.
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
    console.error("ImageKit authentication error:", error);

    return NextResponse.json(
      { message: "Failed to generate ImageKit authentication parameters." },
      { status: 500 },
    );
  }
}
