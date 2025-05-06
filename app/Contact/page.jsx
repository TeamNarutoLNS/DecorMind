"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Home } from "lucide-react";
import Link from "next/link";

const ContactForm = dynamic(() => import("./ContactForm"), { ssr: false });

const Contact = () => {
  const [year, setYear] = useState("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fefaf6]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full bg-gradient-to-r from-[#8b6a55] to-[#5f4339] text-white py-8 sm:py-10 text-center shadow-md px-4"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Contact Us
        </h1>
        <p className="mt-2 sm:mt-4 text-base sm:text-lg max-w-xl mx-auto">
          Whether you have a question, feedback, or a dream to share, we're here to listen and collaborate.
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="flex-grow max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8">
        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white shadow-xl rounded-xl p-6 sm:p-8 border border-[#8b6a55] space-y-6"
        >
          <img
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
            alt="Contact illustration"
            className="mx-auto rounded-lg w-full sm:w-[400px] sm:h-[300px]"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#5f4339] text-center">
            Let’s Create Magic Together
          </h2>
          <p className="text-[#8b6a55] text-center text-sm sm:text-base">
            At <strong>DecorMind</strong>, we blend creativity with technology to deliver interiors that inspire.
            Share your ideas, ask questions, or just say hello — we’d love to chat!
          </p>
          <div className="space-y-3 text-[#8b6a55] text-sm sm:text-base">
            <p className="flex items-center gap-2">
              <Mail className="text-[#5f4339]" /> support@decormind.com
            </p>
            <p className="flex items-center gap-2">
              <Phone className="text-[#5f4339]" /> +1 (123) 456-7890
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="text-[#5f4339]" /> 123 AI Street, Design City, DX 56789
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <ContactForm />
      </div>

      {/* Floating Home Button */}
      <Link href="/" passHref>
        <div className="fixed right-4 bottom-8 bg-[#8b6a55] text-white p-3 rounded-full shadow-lg hover:bg-[#5f4339] transition duration-300 cursor-pointer z-50">
          <Home className="w-5 h-5" />
        </div>
      </Link>

      {/* Sticky Footer */}
      <footer className="w-full bg-[#8b6a55] text-white text-center py-6 shadow-md">
        <p className="text-sm">&copy; {year} DecorMind. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
