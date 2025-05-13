"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import Link from "next/link";
import { FaSearch, FaSpinner, FaImage } from "react-icons/fa";

const DetectFurniturePage = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchingLabel, setSearchingLabel] = useState(null);
  const [searchError, setSearchError] = useState(null);

  useEffect(() => {
    const fetchAndDetect = async () => {
      setLoading(true);
      setSearchError(null);
      try {
        const storedImageUrl = sessionStorage.getItem("targetImageUrl");
        if (!storedImageUrl) {
          setLoading(false);
          setSearchError("No image URL provided for analysis.");
          return;
        }
        setImageUrl(storedImageUrl);

        const res = await fetch("/api/detect-furniture", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl: storedImageUrl }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          setSearchError(errorData?.error || `Detection failed: ${res.status}`);
          throw new Error(errorData?.error || `Detection failed: ${res.status}`);
        }

        const data = await res.json();
        setImageUrl(data.imageUrl);
        setItems(
          data?.results?.results?.[0]?.entities?.[0]?.mapping
            ? Object.entries(data.results.results[0].entities[0].mapping).map(
              ([label, count]) => ({ label, count })
            )
            : []
        );
      } catch (err) {
        console.error("Detection error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndDetect();
  }, []);

  const handleSearch = async (label) => {
    setSearchingLabel(label);
    setSearchResults([]);
    setSearchError(null);

    try {
      const res = await fetch("/api/search-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: label }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSearchError(data?.error || `Search failed with status: ${res.status}`);
        return;
      }
      setSearchResults(data?.results || []);
    } catch (err) {
      setSearchError("A network error occurred. Please try again.");
    } finally {
      setSearchingLabel(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-[#f6e9dd] to-white">
      {/* Header */}
      <header className="bg-[#f6e9dd] text-[#5C4431] shadow-sm py-4 px-4 sm:px-6 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">DecorMind</h1>

        {/* Dashboard Button */}
        <Link href="/dashboard">
          <button className="bg-[#5C4431] hover:bg-[#4a3628] text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300">
            Go to Dashboard
          </button>
        </Link>
      </header>


      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#5C4431] mb-6 sm:mb-8">
          <FaImage className="inline-block mr-2" /> Furniture Detection
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <FaSpinner className="animate-spin text-[#5C4431] text-5xl" />
            <span className="ml-3 text-[#5C4431]">Detecting furniture...</span>
          </div>
        ) : (
          <>
            {imageUrl && (
              <div className="mb-8 rounded-lg overflow-hidden shadow border border-[#d6c2b2]">
                <img
                  src={imageUrl}
                  alt="Detected Furniture"
                  className="w-full max-h-[400px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}

            {items.length > 0 ? (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[#1C1C1C] mb-4">Detected Items:</h3>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.label}
                      className="bg-[#f6e9dd] border border-[#e5d3c1] rounded-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between hover:shadow-md transition-shadow"
                    >
                      <span className="px-4 py-3 text-[#1C1C1C] font-medium">{item.label}</span>
                      <button
                        onClick={() => handleSearch(item.label)}
                        className="bg-[#5C4431] hover:bg-[#4a3628] text-white px-4 py-2 rounded-b-md sm:rounded-b-none sm:rounded-r-md transition-colors duration-300"
                        disabled={searchingLabel === item.label}
                      >
                        {searchingLabel === item.label ? (
                          <>
                            <FaSpinner className="animate-spin inline-block mr-2" /> Searching...
                          </>
                        ) : (
                          <>
                            <FaSearch className="inline-block mr-2" /> Search
                          </>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              !loading && (
                <div className="text-center py-6">
                  <p className="text-[#5C4431] italic">No furniture detected in the image.</p>
                </div>
              )
            )}
          </>
        )}

        {searchResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-[#1C1C1C] mb-4">Related Products:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-[#5C4431] mb-2 line-clamp-2">{product.title}</h4>
                    <p className="text-gray-600 mb-3">{product.price}</p>
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#5C4431] hover:bg-[#4a3628] text-white py-2 px-4 rounded-md text-sm font-medium"
                    >
                      View Product
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchError && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="text-center">{searchError}</p>
          </div>
        )}
      </main>
      {/* Floating Home Button */}
      <Link href="/" passHref>
        <div className="fixed right-4 bottom-8 bg-[#8b6a55] text-white p-3 rounded-full shadow-lg hover:bg-[#5f4339] transition duration-300 cursor-pointer z-50">
          <Home className="w-5 h-5" />
        </div>
      </Link>

      {/* Sticky Footer */}
      <footer className="bg-[#f6e9dd] text-[#5C4431] text-center py-4">
        <p>&copy; 2025 DecorMind. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DetectFurniturePage;
