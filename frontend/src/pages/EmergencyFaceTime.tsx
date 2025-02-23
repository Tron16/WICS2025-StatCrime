import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";

const EmergencyFaceTime = () => {
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
            <h1 className="text-4xl font-bold mb-8 text-center">
              Emergency FaceTime
            </h1>
          </div>

          {/* Video placeholder */}
          <div className="animate-on-load opacity-0">
            <div className="aspect-w-16 aspect-h-9 bg-white/10 rounded-2xl overflow-hidden mb-8">
              <video
                className="w-full h-full object-cover"
                playsInline
                loop
                muted
                autoPlay
                poster="/placeholder.svg"
              >
                <source src="/your-video.mp4" type="video/mp4" />
              </video>
            </div>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFaceTime;
