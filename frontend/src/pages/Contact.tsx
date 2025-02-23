import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";

export default function Contact() {
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-load");
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.2}s`;
      el.classList.add("animate-fade-up");
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <div className="animate-on-load opacity-0">
            <h1 className="text-4xl font-bold mb-8 text-center">Pitch</h1>
          </div>

          {/* YouTube Video Embed */}
          <div className="animate-on-load opacity-0">
            <div className="aspect-w-16 aspect-h-9 bg-white/10 rounded-2xl overflow-hidden mb-8">
              <iframe
                className="w-full h-64 md:h-96 lg:h-[500px] object-contain"
                src="https://www.youtube.com/embed/wQig2RBaMu0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
