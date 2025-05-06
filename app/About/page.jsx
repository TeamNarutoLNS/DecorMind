"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-[#f5ebe0] flex flex-col items-center px-4 sm:px-6">
      {/* Back to Home Header */}
      <div className="w-full bg-[#5f4339] text-white py-4 px-4 flex items-center justify-center shadow-md z-10">
        <Link href="/" className="flex items-center space-x-2 hover:text-[#c2a68d] transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-base sm:text-lg font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-16 sm:py-24 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#c2a68d]/90 to-[#8b6a55]" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=2067&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4"
        >
          About <span className="text-[#2e0505] font-bold">DecorMind</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[#2c3e50] text-base sm:text-lg max-w-xl mx-auto"
        >
          AI-driven interior design solutions that transform your living space effortlessly.
        </motion.p>
      </section>

      {/* About Content */}
      <section className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-10 items-center py-12 sm:py-20 px-2">
        {/* Left Side - Text */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#5f4339]">Our Mission</h2>
          <p className="text-[#8b6a55] leading-relaxed text-base sm:text-lg">
            At <span className="font-semibold text-[#5f4339]">DecorMind</span>, we blend <strong>AI technology</strong> with <strong>creative design</strong> to help users
            visualize and personalize their dream interiors. Whether it's choosing furniture,
            colors, or layouts, our assistant provides tailored guidance for your unique style.
          </p>
          <Link href="/features">
            <button className="w-full sm:w-auto px-5 py-3 bg-[#5f4339] text-white rounded-md hover:bg-[#8b6a55] transition-all">
              Explore Our Features
            </button>
          </Link>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop"
            alt="Modern interior design"
            className="w-full h-64 sm:h-auto object-cover"
            loading="lazy"
          />
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full text-center py-12 sm:py-16 px-4">
        {[
          {
            title: "✨ AI-Powered Suggestions",
            desc: "Get personalized recommendations for furniture, color palettes, and layout planning.",
            img: "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg",
          },
          {
            title: "🎨 Realistic 3D Visuals",
            desc: "Preview high-quality renders of your designed space before implementation.",
            img: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
          },
          {
            title: "📊 Smart Budgeting",
            desc: "Stay on track financially with intelligent cost estimation and budget management.",
            img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="bg-white border border-[#decbb7] rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
          >
            <img src={feature.img} alt={feature.title} className="w-full h-40 object-cover" loading="lazy" />
            <div className="p-5">
              <h3 className="text-lg sm:text-xl font-semibold text-[#5f4339]">{feature.title}</h3>
              <p className="text-[#8b6a55] mt-2 text-sm sm:text-base leading-relaxed">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#8b6a55] text-white text-center py-6 mt-10 shadow-inner px-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} DecorMind. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;
