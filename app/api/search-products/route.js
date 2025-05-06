// // // In /api/search-products/route.js
// // import { NextResponse } from "next/server";

// // export async function POST(request) {
// //   try {
// //     const { query } = await request.json();
// //     console.log("Received query:", query);

// //     if (!query || typeof query !== "string" || query.trim() === "") {
// //       return NextResponse.json(
// //         { error: "Missing or invalid search query" },
// //         { status: 400 }
// //       );
// //     }

// //     const encodedQuery = encodeURIComponent(query.trim());
// //     const apiKey = process.env.SERPAPI_KEY;

// //     if (!apiKey) {
// //       console.error("Missing SerpApi Key");
// //       return NextResponse.json(
// //         { error: "Server configuration error. Missing API key." },
// //         { status: 500 }
// //       );
// //     }

// //     const apiUrl = `https://serpapi.com/search.json?engine=google_shopping&q=${encodedQuery}&hl=en&gl=us&api_key=${apiKey}`;

// //     console.log("Fetching API with URL:", apiUrl);
// //     const res = await fetch(apiUrl);
// //     const json = await res.json();

// //     console.log("API Response Status:", res.status);
// //     console.log("API Response JSON:", json);

// //     if (!res.ok || json.error) {
// //       console.error("SerpApi Error:", json);
// //       return NextResponse.json(
// //         { error: json?.error?.message || "SerpApi error" },
// //         { status: res.status || 500 }
// //       );
// //     }

// //     const shoppingResults = Array.isArray(json.shopping_results)
// //       ? json.shopping_results
// //       : [];

// //     if (!shoppingResults.length) {
// //       return NextResponse.json(
// //         { error: "No products found." },
// //         { status: 404 }
// //       );
// //     }

// //     const results = shoppingResults.map((product) => ({
// //       id: product.product_id || product.position || Math.random().toString(36).substring(7),
// //       title: product.title || "No title",
// //       price: product.extracted_price ? `$${product.extracted_price}` : product.price || "N/A",
// //       imageUrl: product.thumbnail || null,
// //       link: product.link || "#",
// //     }));

// //     return NextResponse.json({ results });
// //   } catch (err) {
// //     console.error("Unexpected error:", err);
// //     return NextResponse.json(
// //       { error: "Unexpected server error." },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export const GET = POST;
// // In /api/search-products/route.js
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { query } = await request.json();
//     console.log("Received query:", query);

//     // Validate query
//     if (!query || typeof query !== "string" || query.trim() === "") {
//       return NextResponse.json(
//         { error: "Missing or invalid search query" },
//         { status: 400 }
//       );
//     }

//     const encodedQuery = encodeURIComponent(query.trim());
//     const apiKey = process.env.SERPAPI_KEY;

//     // Check if API key is present
//     if (!apiKey) {
//       console.error("Missing SerpApi Key");
//       return NextResponse.json(
//         { error: "Server configuration error. Missing API key." },
//         { status: 500 }
//       );
//     }

//     const apiUrl = `https://serpapi.com/search.json?engine=google_shopping&q=${encodedQuery}&hl=en&gl=us&api_key=${apiKey}`;

//     console.log("Fetching API with URL:", apiUrl);
//     const res = await fetch(apiUrl);
//     const json = await res.json();

//     // Log response status and data for debugging
//     console.log("API Response Status:", res.status);
//     console.log("API Response JSON:", JSON.stringify(json, null, 2));

//     if (!res.ok || json.error) {
//       console.error("SerpApi Error:", json);
//       return NextResponse.json(
//         { error: json?.error?.message || "SerpApi error" },
//         { status: res.status || 500 }
//       );
//     }

//     // Extract shopping results from API response
//     const shoppingResults = Array.isArray(json.shopping_results)
//       ? json.shopping_results
//       : [];

//     // If no products are found, return 404 error
//     if (!shoppingResults.length) {
//       return NextResponse.json(
//         { error: "No products found." },
//         { status: 404 }
//       );
//     }

//     // Map over results and extract relevant data (title, price, image, link)
//     const results = shoppingResults.map((product) => ({
//       id: product.product_id || product.position || Math.random().toString(36).substring(7),
//       title: product.title || "No title",
//       price: product.extracted_price ? `$${product.extracted_price}` : product.price || "N/A",
//       imageUrl: product.thumbnail || null,
//       link: product.product_link || "#", // Corrected to point to actual product link
//     }));

//     return NextResponse.json({ results });
//   } catch (err) {
//     console.error("Unexpected error:", err);
//     return NextResponse.json(
//       { error: "Unexpected server error." },
//       { status: 500 }
//     );
//   }
// }

// // GET is aliased to POST to support both methods
// export const GET = POST;
// In /api/search-products/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const { query } = await request.json();
    console.log("Received query:", query);

    // Validate query
    if (!query || typeof query !== "string" || query.trim() === "") {
      return NextResponse.json(
        { error: "Missing or invalid search query." },
        { status: 400 }
      );
    }

    const scrapingdogApiKey = process.env.SCRAPINGDOG_API_KEY; // Replace with your Scrapingdog API key
    if (!scrapingdogApiKey) {
      console.error("Missing Scrapingdog API Key");
      return NextResponse.json(
        { error: "Server configuration error. Missing API key." },
        { status: 500 }
      );
    }

    // Scrapingdog Amazon Search API URL and parameters
    const scrapingdogApiUrl = `https://api.scrapingdog.com/amazon/search`;
    const params = {
      api_key: scrapingdogApiKey,
      query: query.trim(),
      page: "1",
      domain: "in", // Use India-specific results
      country: "in",
    };

    console.log("Fetching Scrapingdog API with params:", params);

    const res = await axios.get(scrapingdogApiUrl, { params });
    const data = res.data;

    console.log("Scrapingdog API Response:", JSON.stringify(data, null, 2));

    // Check if the response contains valid results
    if (!data || !data.results || data.results.length === 0) {
      console.error("No results found in Scrapingdog response.");
      return NextResponse.json(
        { error: "No results found for your query. Please refine your search." },
        { status: 404 }
      );
    }

    // Extract relevant fields from the Amazon search results
    const results = data.results.map((product) => ({
      id: product.asin || Math.random().toString(36).substring(7),
      title: product.title || "No title available",
      price: product.price || "Price unavailable",
      imageUrl: product.image || "https://via.placeholder.com/150", // Placeholder image for missing data
      link: product.optimized_url || "#", // Use optimized_url for valid product links
    }));

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected server error. Please try again later." },
      { status: 500 }
    );
  }
}

// Alias GET to POST
export const GET = POST;
