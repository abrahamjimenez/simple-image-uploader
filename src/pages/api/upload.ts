import type { APIRoute } from "astro";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: import.meta.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: import.meta.env.S3_SECRET_ACCESS_KEY!
  }
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file found" }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `${Date.now()}-${file.name}`; // unique filename

    const command = new PutObjectCommand({
      Bucket: "simpleimageuploader",
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    await client.send(command);

    return new Response(
      JSON.stringify({
        message: "Upload successful",
        url: `https://simpleimageuploader.s3.us-east-2.amazonaws.com/${key}`
      }),
      { status: 200 }
    );
  } catch (e: any) {
    console.error("Upload failed", e);
    return new Response(JSON.stringify({ error: "Failed to upload file" }), { status: 500 });
  }
};
