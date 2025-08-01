import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

// Convert image to Base64
async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  return Buffer.from(resp.data).toString("base64");
}

// Get Cloudinary Config
function getCloudinaryConfig() {
  return {
    cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
    uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
  };
}

// Upload image to Cloudinary
async function saveImageToCloudinary(base64Image) {
  const { cloudName, uploadPreset } = getCloudinaryConfig();
  const formData = new FormData();

  formData.append("file", `data:image/png;base64,${base64Image}`);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", "decormind");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.secure_url;
}

export async function POST(req) {
  try {
    const { imageUrl, roomType, designType, additionalReq } = await req.json();

    const prompt = `A ${roomType} with a ${designType} style interior ${additionalReq || ""}`;
    const input = { image: imageUrl, prompt };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    const base64Image = await ConvertImageToBase64(output);
    const uploadedImageUrl = await saveImageToCloudinary(base64Image);

    return NextResponse.json({ result: uploadedImageUrl });
  } catch (e) {
    console.error("Error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
