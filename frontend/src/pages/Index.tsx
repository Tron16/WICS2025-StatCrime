import { Navbar } from "@/components/Navbar";
import { CityButton } from "@/components/CityButton";
import { FeatureCard } from "@/components/FeatureCard";
import { Shield, MapPin, PhoneCall, Bell } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-load");
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${index * 0.2}s`;
      el.classList.add("animate-fade-up");
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  const handleGetStarted = () => {
    navigate("/city/New York/NY");
  };
  const handleCityClick = (city: string, state: string) => {
    navigate(`/city/${city}/${state}`);
  };
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/9196e026-f35c-40b0-83e0-3f8a8eb2190a.png"
            alt="City at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black/90" />
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 mt-32 animate-on-load opacity-0">
              StatCrime
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 animate-on-load opacity-0">
              Know Before You Go. Stay Safe with Data-Driven Crime Insights
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                "New York",
                "Los Angeles",
                "Chicago",
                "Houston",
                "Washington DC",
              ].map((city, index) => (
                <div key={city} className="animate-on-load opacity-0">
                  <CityButton
                    city={city}
                    state={["NY", "CA", "IL", "TX", "VA"][index]}
                    onClick={() =>
                      handleCityClick(
                        city,
                        ["NY", "CA", "IL", "TX", "VA"][index]
                      )
                    }
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 animate-on-load opacity-0">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </button>
              <div>
                <button
                  onClick={scrollToFeatures}
                  className="text-white/70 hover:text-white transition-colors text-sm mt-4 flex flex-col items-center gap-2 mx-auto"
                >
                  Learn More
                  <svg
                    className="w-6 h-6 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-32">
            {/* Predictive Safety Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-on-scroll opacity-0">
              <div>
                <img
                  src="/lovable-uploads/667c5c95-6861-46e2-94a7-9fe775f37a00.png"
                  alt="Safety Analysis Dashboard"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-semibold">Predictive Safety</h3>
                <p className="text-lg text-white/70">
                  Stay informed about potentially unsafe areas and times based
                  on our comprehensive crime data analysis. Our machine learning
                  model helps you make safer decisions about your routes and
                  timing.
                </p>
              </div>
            </div>

            {/* Hot Spot Mapping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-on-scroll opacity-0">
              <div className="order-2 md:order-1 space-y-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-semibold">Hot Spot Mapping</h3>
                <p className="text-lg text-white/70">
                  Visual identification of high-risk areas with our advanced
                  heat mapping technology. Plan safer routes and avoid dangerous
                  zones with real-time data visualization.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src="/lovable-uploads/27cca6c0-f25f-4721-8b2e-2a9c14884405.png"
                  alt="Hot Spot Map"
                  className="rounded-2xl shadow-2xl scale-150"
                />
              </div>
            </div>

            {/* Emergency FaceTime */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-on-scroll opacity-0">
              <div>
                <img
                  alt="Safety Analysis Interface"
                  className="rounded-2xl shadow-2xl scale-150"
                  src="/lovable-uploads/facetime.png"
                />
              </div>
              <div className="space-y-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <PhoneCall className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-semibold">Emergency FaceTime</h3>
                <p className="text-lg text-white/70">
                  Feel safer in unknown areas with our Emergency FaceTime
                  feature. One tap activates a simulated call that looks and
                  sounds real.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">
                      Realistic Interface
                    </h3>
                    <p className="text-white/70">
                      Mimics the authentic FaceTime UI for credibility
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">
                      One-Touch Activation
                    </h3>
                    <p className="text-white/70">
                      Quickly activate with a single tap when needed
                    </p>
                  </div>
                  <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl">
                    <h3 className="text-xl font-semibold mb-3">
                      Customizable Call
                    </h3>
                    <p className="text-white/70">
                      Choose from different caller profiles and scenarios
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/emergency-facetime")}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-300"
                >
                  Try Emergency FaceTime
                </button>
              </div>
            </div>

            {/* SOS Alert System */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-on-scroll opacity-0">
              <div className="order-2 md:order-1 space-y-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-semibold">SOS Alert System</h3>
                <p className="text-lg text-white/70">
                  Instantly notify emergency contacts with your live location
                  and alert authorities when needed. Your safety is just one tap
                  away.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <div className="aspect-w-16 aspect-h-9 bg-white/5 rounded-2xl flex items-center justify-center">
                  <div className="text-white/30">
                    Alert System Visualization
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
