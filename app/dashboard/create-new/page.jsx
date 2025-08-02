"use client";

import React, { useState, useEffect, useCallback, useContext } from "react";
import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth, useUser } from "@clerk/nextjs";
import { addListener } from "process";
import CustomLoading from "./_components/CustomLoading";
import AiOutputDialog from "../_components/AiOutputDialog";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import Link from "next/link";
import { Home } from "lucide-react";
import GenerateButton from "@/components/ui/generatebutton";

function CreateNew() {
  const { user } = useUser();
  const [formData, setFormData] = useState({});
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [aiGeneratedImageUrl, setAiGeneratedImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [outputResult, setOutputResult]= useState();
  const [aiOutputImage, setAiOutputImage] = useState();
  const [openOutputDialog, setOpenOutputDialog] = useState(false);
  const [orgImage, setOrgImage] = useState();

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleInputChange = useCallback((value, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value || "" }));
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      console.log("Updated FormData:", formData);
    }
  }, [formData]);

  const getCloudinaryConfig = () => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      setErrorMessage("Cloudinary configuration missing.");
      console.error("❌ Cloudinary env variables are not set.");
      return null;
    }

    return { cloudName, uploadPreset };
  };

  const saveImageToCloudinary = async () => {
    if (!formData.image) {
      setErrorMessage("⚠️ Please select an image.");
      return null;
    }

    const config = getCloudinaryConfig();
    if (!config) return null;

    const uploadFormData = new FormData();
    uploadFormData.append("file", formData.image);
    uploadFormData.append("upload_preset", config.uploadPreset);

    try {
      setLoading(true);
      console.log("⏳ Uploading image to Cloudinary...");

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
      setOrgImage(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("❌ Cloudinary Upload Failed:", error);
      setErrorMessage("⚠️ Cloudinary upload failed. Try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateAiImage = async () => {
  setLoading(true);

  const rawImageUrl = await saveImageToCloudinary(); // keeps real upload

  // Simulate delay like AI is processing
  setTimeout(() => {
    const fakeAIImage = "/ai-output/page1.png"; // Put your dummy output image
    setOrgImage(rawImageUrl);
    setAiOutputImage(fakeAIImage);
    setOpenOutputDialog(true);
    setLoading(false);
  }, 2000); // 2 seconds fake delay
};

  const updateUserCredits = async () => {
    const result = await db.update(Users).set({
      credits: userDetail?.credits - 1

    }).returning({ id: Users.id });

    if (result) {
      setUserDetail(prev => ({
        ...prev,
        credits: userDetail?.credits - 1

      }))
      return result[0].id
    }

  }
  // const { getToken } = useAuth();

  // const generateAiImage = async () => {
  //   // if (loading) return;

  //   // setErrorMessage("");
  //   // const rawImageUrl = await saveImageToCloudinary();
  //   // if (!rawImageUrl) return;

  //   // setUploadedImageUrl(rawImageUrl);

  //   // try {
  //   //   setLoading(true);
  //   //   console.log("🚀 Fetching authentication token...");

  //   //   const token = await getToken();
  //   //   console.log("🆔 Token received in frontend:", token); // Debugging

  //   //   if (!token) {
  //   //     setErrorMessage("⚠️ Authentication failed! Please log in.");
  //   //     return;
  //   //   }

  //   //   console.log("🚀 Sending request to AI model...");

  //     const response = await axios.post(
  //       "/api/redesign-room",formData);
  //       console.log(result);
  //       // {
  //       //   ...formData,
  //       //   imageUrl: rawImageUrl,
  //       // },
  //       // {
  //       //   headers: {
  //       //     Authorization: `Bearer ${token}`, // Attach the token
  //       //     "Content-Type": "application/json",
  //       //   },
  //       //   withCredentials: true,
  //       // }
  //     );

  //     console.log("✅ AI Response:", response.data);

  //     if (response.data.generatedImageUrl) {
  //       setAiGeneratedImageUrl(response.data.generatedImageUrl);
  //     } else {
  //       throw new Error("⚠️ AI did not return an image. Try again.");
  //     }
  //   } catch (error) {
  //     console.error("❌ AI Generation Error:", error);
  //     console.log("🔴 Response Data:", error.response?.data); // Debugging
  //     setErrorMessage(error.response?.data?.error || "⚠️ AI generation failed. Try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <div className="px-4">
        {/* Navigation buttons */}
        <div className="flex justify-between items-center mb-6 px-2">
          <Link href="/dashboard">
            <Button variant="outline" className="flex items-center gap-2 px-5 py-3 text-base sm:text-lg ">
              <Home className="w-20 h-20" />
              Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" className="flex items-center gap-2 px-5 py-3 text-base sm:text-lg">
              <Home className="w-20 h-2" />
              Home
            </Button>
          </Link>
        </div>
        <h2 className="font-bold text-2xl text-primary text-center mb-4">
          Experience the Magic of AI Remodeling
        </h2>
        <p className="text-center text-lg mb-6" style={{ color: "#8B4513" }}>
          Transform any room with a click. Select a space, choose a style, and watch as AI reimagines your environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 ml-[15px]">
          <ImageSelection selectedImage={(value) => onHandleInputChange(value, "image")} />
          <div className="mt-4">
            <RoomType selectedRoomType={(value) => onHandleInputChange(value, "roomType")} />
            <DesignType selectedDesignType={(value) => onHandleInputChange(value, "designType")} />
            <AdditionalReq additionalRequirementInput={(value) => onHandleInputChange(value, "additionalReq")} />

            <GenerateButton className="w-full mt-5" onClick={generateAiImage} disabled={loading}>
              {loading ? "Processing..." : "Generate"}
            </GenerateButton>
          </div>
        </div>

        {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" className="mt-4 rounded shadow-lg" />}
        {aiGeneratedImageUrl && <img src={aiGeneratedImageUrl} alt="AI Generated" className="mt-4 rounded shadow-lg" />}
        {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      </div>

      <div>
        <CustomLoading loading={loading} />
        <AiOutputDialog openDialog={openOutputDialog}
          closeDialog={() => setOpenOutputDialog(false)}
          orgImage={orgImage}
          aiImage={aiOutputImage}
        />
      </div>


    </>
  );

}

export default CreateNew;
