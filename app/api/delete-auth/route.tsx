
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim();

    if (!privateKey) {
      console.error("IMAGEKIT_PRIVATE_KEY is missing.");

      return NextResponse.json(
        { error: "ImageKit private key is not configured on the server." },
        { status: 500 },
      );
    }

    const body = await request.json().catch(() => null);
    const fileId = body?.fileId;

    if (typeof fileId !== "string" || !fileId.trim()) {
      return NextResponse.json(
        { error: "A valid ImageKit fileId is required." },
        { status: 400 },
      );
    }

    // ImageKit requires HTTP Basic Auth using "privateKey:".
    // The private key must never be sent to the browser.
    const authorization =
      "Basic " + Buffer.from(`${privateKey}:`).toString("base64");

    const imageKitResponse = await fetch(
      `https://api.imagekit.io/v1/files/${encodeURIComponent(fileId.trim())}`,
      {
        method: "DELETE",
        headers: {
          Authorization: authorization,
          Accept: "application/json",
        },
        cache: "no-store",
      },
    );

    if (!imageKitResponse.ok) {
      const details = await imageKitResponse.text();

      // Log the underlying ImageKit error in the server terminal.
      console.error("ImageKit API rejected file deletion:", {
        status: imageKitResponse.status,
        details,
        fileId,
      });

      return NextResponse.json(
        {
          error: "ImageKit rejected the file deletion request.",
          details,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      fileId,
      message: "ImageKit image deleted successfully.",
    });
  } catch (error) {
    console.error("ImageKit delete route error:", error);

    return NextResponse.json(
      {
        error: "The server could not complete the ImageKit deletion request.",
        details:
          error instanceof Error ? error.message : "Unknown server error.",
      },
      { status: 500 },
    );
  }
}
