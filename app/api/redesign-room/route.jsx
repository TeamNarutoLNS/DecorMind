import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";
import { AiGeneratedImage } from "@/config/schema";
import { db } from "@/config/db"; // Adjust the path based on your project structure

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

// 🔧 Convert image to Base64
async function ConvertImageToBase64(imageUrl) {
  try {
    const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64ImageRaw = Buffer.from(resp.data).toString("base64");
    return base64ImageRaw;
  } catch (error) {
    console.error("❌ Error converting image to Base64:", error.message);
    throw new Error("Failed to convert image to Base64.");
  }
}

// 🔧 Get Cloudinary Config
function getCloudinaryConfig() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    console.error("❌ Missing Cloudinary configuration.");
    throw new Error("Cloudinary configuration is missing. Check environment variables.");
  }

  return { cloudName, uploadPreset };
}

// ☁️ Upload image to Cloudinary with quality settings
async function saveImageToCloudinary(base64Image, fileName = Date.now(), quality = 80) {
  const config = getCloudinaryConfig();

  const uploadFormData = new FormData();
  uploadFormData.append("file", `data:image/png;base64,${base64Image}`);
  uploadFormData.append("upload_preset", config.uploadPreset);
  uploadFormData.append("public_id", fileName);
  uploadFormData.append("folder", "decormind");
  uploadFormData.append("quality", 100); // Adjust image quality

  try {
    console.log(`⏳ Uploading image to Cloudinary with quality: ${quality}...`);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadFormData,
      }
    );

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    console.log("✅ Cloudinary Upload Successful:", data.secure_url);
    const transformedUrl = data.secure_url.replace(
      "/upload/",
      "/upload/q_100,f_webp/"
    );

    return transformedUrl;
  } catch (error) {
    console.error("❌ Cloudinary Upload Failed:", error.message);
    throw new Error("Failed to upload image to Cloudinary.");
  }
}

export async function POST(req) {
  try {
    // Parse request body
    const { imageUrl, roomType, designType, additionalReq, userEmail, quality } = await req.json();

    if (!imageUrl || !roomType || !designType) {
      throw new Error("Missing required fields: imageUrl, roomType, or designType.");
    }

    // 🔧 Prepare prompt for AI model
    const prompt = `A ${roomType} with a ${designType} style interior ${additionalReq || ""}`;
    const input = {
      image: imageUrl,
      prompt,
    };

    console.log("📤 Sending input to Replicate:", input);

    // 🧠 Generate image using Replicate
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );
    console.log("✅ Replicate output received:", output);

    // Convert output image to Base64
    const base64Image = await ConvertImageToBase64(output);

    // Upload generated image to Cloudinary with optional quality adjustment
    const uploadedImageUrl = await saveImageToCloudinary(base64Image, Date.now(), quality || 80);

    if (!uploadedImageUrl) {
      throw new Error("Image upload to Cloudinary failed.");
    }

    // 💾 Save to Database
    const dbResult = await db
      .insert(AiGeneratedImage)
      .values({
        roomType,
        designType,
        orgImage: imageUrl,
        aiImage: uploadedImageUrl,
        userEmail,
      })
      .returning({ id: AiGeneratedImage.id });

    console.log("✅ Database Insert Successful:", dbResult);

    // Return uploaded image URL
    return NextResponse.json({ result: uploadedImageUrl });
  } catch (e) {
    console.error("❌ Error in redesign-room API:", e.message);
    return NextResponse.json({ error: e.message || "Internal Server Error" }, { status: 500 });
  }
}
