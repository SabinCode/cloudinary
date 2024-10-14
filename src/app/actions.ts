"use server";

import { prisma } from "@/db";
import { File } from "buffer";

import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

export async function uploadFile(formData: FormData) {
  const file = formData.get("profile_picture");
  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const stream = cloudinary.uploader.upload_stream(
      {},
      async (error, result) => {
        if (error || !result) {
          throw new Error(error?.message || "Upload failed");
        }
        //console.log({ result }); // result.secure_url ma upload gareko img aaucha
        await prisma.image.create({
          data: {
            name: "sabin",
            url: result.secure_url,
          },
        });
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  }
}
//uploadFile ma bind vayera yo form ma pathako data yeha params ma formData aaucha.
//js ma properle use garnalai cosnt buffer = Buffer.from(arrayBuffer) gareko.
//configuration for claudinary.config and API keys saved in .env ma rakhera yeta process.env garera leko cha
//stramifier isntall
