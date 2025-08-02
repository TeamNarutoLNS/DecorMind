"use client";

import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useRouter } from 'next/navigation'

import FeaturesSection from "@/components/ui/FeaturesSection";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/ui/HeroSection";
import { Check } from "lucide-react";
import { useState } from "react";
import GenerateButton from "@/components/ui/GenerateButton";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const [isGenerating, setIsGenerating] = useState(false);
  const [showGeneratedImage, setShowGeneratedImage] = useState(false);

  const steps = [
    {
      step: "01",
      title: "Share Your Space",
      description: "Upload photos & room dimensions for AI-powered design.",
      image: "/ai-output/page3.png",
    },
    {
      step: "02",
      title: "AI Design Generation",
      description: "Our AI analyzes your inputs and generates multiple design options.",
      image: "/ai-output/page3.png",
    },
    {
      step: "03",
      title: "Customize & Purchase",
      description: "Refine your design & purchase recommended furniture instantly.",
      image: "/ai-output/page3.png",
    },
  ];

  const features = ["Free design consultations", "Access to exclusive products", "Custom AI recommendations"];

  const handleGetStarted = () => {
    setIsGenerating(true);
    setShowGeneratedImage(false);

    setTimeout(() => {
      setIsGenerating(false);
      setShowGeneratedImage(true);
    }, 2000);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Navbar />
      </div>

      <HeroSection />
      <FeaturesSection />

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold text-decor-primary mb-4">
              How DecorMind Works
            </h2>
            <p className="text-base sm:text-lg text-decor-secondary">
              A simple process making interior design accessible for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((item, index) => (
              <div key={index} className="relative group">
                <div className="overflow-hidden rounded-xl shadow-md mb-6">
                  <Image src={item.image} alt={item.title} width={500} height={240} priority className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-start">
                  <span className="text-2xl sm:text-3xl font-bold text-decor-accent mr-4 font-serif">{item.step}</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-decor-primary mb-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-decor-secondary">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-[#5f4339] text-[#f5ebe0]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Ready to transform your space?</h2>
          <p className="text-sm sm:text-lg text-[#f5ebe0]/80 mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners who have revolutionized their interiors with DecorMind.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-start sm:justify-center">
                <div className="h-8 w-8 rounded-full bg-[#d4a373] flex items-center justify-center mr-3">
                  <Check className="h-4 w-4 text-[#5f4339]" />
                </div>
                <span className="text-[#f5ebe0]/90 text-sm sm:text-base">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <GenerateButton onClick={handleGetStarted} className="bg-[#d4a373] text-[#5f4339] hover:bg-[#d4a373]/90 w-full sm:w-auto py-3 px-6 rounded-lg font-medium">Get Started Free</GenerateButton>
            <Link href="/Contact">
              <GenerateButton className="border-[#f5ebe0] text-[#f5ebe0] hover:bg-[#f5ebe0]/10 w-full sm:w-auto py-3 px-6 rounded-lg font-medium border">Contact Sales</GenerateButton>
            </Link>
          </div>
        </div>
      </section>

      {isGenerating && (
        <div className="py-10 text-center text-lg text-decor-primary">
          Generating your dream room design...
        </div>
      )}

      {showGeneratedImage && (
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h3 className="text-2xl font-semibold text-center text-decor-primary mb-6">
            Here's your AI-Generated Room ✨
          </h3>
          <div className="rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/ai-output/livingroom-modern.png"
              alt="Generated Room"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
