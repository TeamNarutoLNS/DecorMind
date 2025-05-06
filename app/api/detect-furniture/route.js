// // // pages/api/detect-furniture.js
// // import { NextResponse } from "next/server";
// // import { db } from "@/config/db";
// // import { AiGeneratedImage } from "@/config/schema";

// // export async function GET() {
// //   try {
// //     console.log("🔍 Detect Furniture API Called");

// //     // 1. Get latest AI image from DB
// //     const latestImage = await db
// //       .select()
// //       .from(AiGeneratedImage)
// //       .orderBy(AiGeneratedImage.id) // Or use created_at for better sorting
// //       .limit(1);

// //     if (!latestImage || latestImage.length === 0) {
// //       console.log("⚠️ No AI image found in DB.");
// //       return NextResponse.json({ message: "No AI image found" }, { status: 404 });
// //     }

// //     const aiImageUrl = latestImage[0].aiImage;
// //     console.log("🖼️ Latest AI image URL:", aiImageUrl);

// //     // 2. Prepare data for RapidAPI request
// //     const encodedData = new URLSearchParams({ url: aiImageUrl });

// //     // 3. Make API call
// //     console.log("📡 Sending request to RapidAPI...");
// //     const apiResponse = await fetch("https://furniture-and-household-items.p.rapidapi.com/v1/results?kind=moving", {
// //       method: "POST",
// //       headers: {
// //         "x-rapidapi-key": process.env.RAPID_API_KEY,
// //         "x-rapidapi-host": "furniture-and-household-items.p.rapidapi.com",
// //         "Content-Type": "application/x-www-form-urlencoded",
// //       },
// //       body: encodedData,
// //     });

// //     if (!apiResponse.ok) {
// //       const errorText = await apiResponse.text();
// //       console.error("❌ RapidAPI Error Response:", errorText);
// //       return NextResponse.json({ error: "Failed to fetch data from RapidAPI" }, { status: 502 });
// //     }

// //     const results = await apiResponse.json();
// //     console.log("✅ API Response Received:", results);

// //     return NextResponse.json({
// //       imageUrl: aiImageUrl,
// //       results,
// //     });

// //   } catch (error) {
// //     console.error("🔥 Detection failed:", error);
// //     return NextResponse.json({ error: "Detection failed" }, { status: 500 });
// //   }
// // }

// // pages/api/detect-furniture.js
// import { NextResponse } from "next/server";
// import { db } from "@/config/db";
// import { AiGeneratedImage } from "@/config/schema";

// export async function GET() {
//   try {
//     console.log("🔍 Detect Furniture API Called");

//     // 1. Get latest AI image from DB
//     const latestImage = await db
//       .select()
//       .from(AiGeneratedImage)
//       .orderBy(AiGeneratedImage.id) // Or use created_at for better sorting
//       .limit(1);

//     if (!latestImage || latestImage.length === 0) {
//       console.log("⚠️ No AI image found in DB.");
//       return NextResponse.json({ message: "No AI image found" }, { status: 404 });
//     }

//     const aiImageUrl = latestImage[0].aiImage;
//     console.log("🖼️ Latest AI image URL:", aiImageUrl);

//     // 2. Prepare data for RapidAPI request
//     const encodedData = new URLSearchParams({ url: aiImageUrl });

//     // 3. Make API call
//     console.log("📡 Sending request to RapidAPI...");
//     const apiResponse = await fetch("https://furniture-and-household-items.p.rapidapi.com/v1/results?kind=moving", {
//       method: "POST",
//       headers: {
//         "x-rapidapi-key": process.env.RAPID_API_KEY,
//         "x-rapidapi-host": "furniture-and-household-items.p.rapidapi.com",
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: encodedData,
//     });

//     if (!apiResponse.ok) {
//       const errorText = await apiResponse.text();
//       console.error("❌ RapidAPI Error Response:", errorText);
//       return NextResponse.json({ error: "Failed to fetch data from RapidAPI" }, { status: 502 });
//     }

//     const results = await apiResponse.json();
//     console.log("✅ API Response Received:", results);

//     return NextResponse.json({
//       imageUrl: aiImageUrl,
//       results,
//     });

//   } catch (error) {
//     console.error("🔥 Detection failed:", error);
//     return NextResponse.json({ error: "Detection failed" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";

export async function POST(request) { // Changed from GET to POST
  try {
    console.log("🔍 Detect Furniture API Called");

    // 1. Extract imageUrl from the request body
    const { imageUrl } = await request.json();  // Get imageUrl from request body
    console.log("Received imageUrl:", imageUrl);

    if (!imageUrl) {
      console.log("⚠️ Image URL not provided in the request.");
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    // 2. Prepare data for RapidAPI request
    const encodedData = new URLSearchParams({ url: imageUrl });

    // 3. Make API call
    console.log("📡 Sending request to RapidAPI...");
    const apiResponse = await fetch(
      "https://furniture-and-household-items.p.rapidapi.com/v1/results?kind=moving",
      {
        method: "POST",
        headers: {
          "x-rapidapi-key": process.env.RAPID_API_KEY,
          "x-rapidapi-host": "furniture-and-household-items.p.rapidapi.com",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodedData,
      }
    );

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("❌ RapidAPI Error Response:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch data from RapidAPI" },
        { status: 502 }
      );
    }

    const results = await apiResponse.json();
    console.log("✅ API Response Received:", results);

    return NextResponse.json({
      imageUrl: imageUrl, // Return the imageUrl we received
      results,
    });
  } catch (error) {
    console.error("🔥 Detection failed:", error);
    return NextResponse.json({ error: "Detection failed" }, { status: 500 });
  }
}