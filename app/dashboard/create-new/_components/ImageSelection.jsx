"use client";

import React, { useState } from "react";
import Image from "next/image";

function ImageSelection({ selectedImage }) {  // ✅ Correct Destructuring
  const [file, setFile] = useState(null);

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile); // Capture the selected file

    if (selectedImage) {
      selectedImage(selectedFile); // ✅ Call function only if it exists
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Centered Label */}
      <label htmlFor="upload-image" className="block text-lg font-bold mb-4">
        Select Image of your Room
      </label>

      {/* Upload Section */}
      <label htmlFor="upload-image" className="cursor-pointer">
        <div
          className={`${
            file ? "p-0" : "p-28"
          } border rounded-xl border-dotted flex justify-center items-center bg-gray-100 shadow-lg`}
        >
          {!file ? (
            <Image
              src="/uploadimage.png"
              width={50}
              height={50}
              alt="Upload Icon"
            />
          ) : (
            <Image
              src={URL.createObjectURL(file)}
              width={300}
              height={300}
              alt="Uploaded Room Image"
              className="w-[300px] h-[300px] object-cover"
            />
          )}
        </div>
      </label>

      {/* File Input Hidden */}
      <input
        type="file"
        accept="image/*"
        id="upload-image"
        style={{ display: "none" }}
        onChange={onFileSelected}
      />
    </div>
  );
}

export default ImageSelection;
