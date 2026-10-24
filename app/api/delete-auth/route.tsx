import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();

    const privateKey = (
      env.IMAGEKIT_PRIVATE_KEY ||
      process.env.IMAGEKIT_PRIVATE_KEY ||
      ""
    ).trim();

    if (!privateKey) {
      console.error("ImageKit private key is missing at runtime.");

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

      console.error("ImageKit deletion rejected:", {
        status: imageKitResponse.status,
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
      },
      { status: 500 },
    );
  }
}
