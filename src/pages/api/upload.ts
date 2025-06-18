import type {APIRoute} from "astro";
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
    region: "us-east-2",
    credentials: {
        accessKeyId: import.meta.env.S3_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.S3_SECRET_ACCESS_KEY
    }
});


export const POST: APIRoute = async ({ request }) => {
    try {
        const command = new ListBucketsCommand();
        const data = await client.send(command)

        return new Response(
            JSON.stringify({
                message: "This was a POST!",
                data: data.Buckets
            }),
        );
    } catch (e) {

        return new Response(
            JSON.stringify({
                error: "Failed to fetch s3 buckets"
            }), {status: 500}
        );
    }



};
