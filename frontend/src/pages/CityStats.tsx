import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CrimeData {
  location: string;
  crimeCount: number;
  hour: number;
}

const CityStats = () => {
  const { city, state } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [selectedCity, setSelectedCity] = useState(city);

  const cities = [
    {
      name: "New York",
      state: "NY",
      safetyscore: "21",
      highrisk: "/lovable-uploads/crimedata/nyhighrisk.png",
      timeofcrime: "/lovable-uploads/crimedata/nytimeofday.png",
      heatmap: "/lovable-uploads/crimedata/nyheatmap.png",
      dngstreet: "Corner of 61st St. and 6th Ave",
      dnghour: "3 pm",
      safehour: "5 am",
    },
    {
      name: "Los Angeles",
      state: "CA",
      safetyscore: "21",
      highrisk: "/lovable-uploads/crimedata/LAhighrisk.jpeg",
      timeofcrime: "/lovable-uploads/crimedata/LAtimeofday.png",
      heatmap: "/lovable-uploads/crimedata/LAheatmap.png",
      dngstreet: "Corner of 7th St. and S Hill St.",
      dnghour: "12 pm",
      safehour: "7 am",
    },
    {
      name: "Chicago",
      state: "IL",
      safetyscore: "44",
      highrisk: "/lovable-uploads/crimedata/chicagohighrisk.png",
      timeofcrime: "/lovable-uploads/crimedata/chicagotimeofday.png",
      heatmap: "/lovable-uploads/crimedata/chicagoheatmap.jpeg",
      dngstreet: "Corner of W Hubbard St and N Dearborn St",
      dnghour: "11 pm",
      safehour: "4 am",
    },
    {
      name: "Houston",
      state: "TX",
      safetyscore: "25",
      highrisk: "/lovable-uploads/crimedata/houstonhighrisk.jpeg",
      timeofcrime: "/lovable-uploads/crimedata/houstontimeofday.png",
      heatmap: "/lovable-uploads/crimedata/houstonheatmap.png",
      dngstreet: "Corner of Lousiana St. and Webster St.",
      dnghour: "12 pm",
      safehour: "7 am",
    },
    {
      name: "Washington",
      state: "DC",
      safetyscore: "23",
      highrisk: "/lovable-uploads/crimedata/dchighrisk.jpeg",
      timeofcrime: "/lovable-uploads/crimedata/dctimeofday.png",
      heatmap: "/lovable-uploads/crimedata/dcheatmap.png",
      dngstreet: "Corner of 13th St NW and Wallach Pl NW",
      dnghour: "2 pm",
      safehour: "9 am",
    },
  ];

  const selectedCityData = cities.find((el) => el.name === selectedCity);

  useEffect(() => {
    // Reset animations when city changes
    const elements = document.querySelectorAll(".animate-fade-up");
    elements.forEach((el) => {
      el.classList.remove("animate-fade-up");
      requestAnimationFrame(() => {
        el.classList.add("animate-fade-up");
      });
    });
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* City Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-lg border-b border-white/10 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Home
            </button>
            <div className="flex items-center justify-center space-x-8">
              {cities.map((cityItem) => (
                <button
                  key={cityItem.name}
                  onClick={() => {
                    setSelectedCity(cityItem.name);
                    navigate(`/city/${cityItem.name}/${cityItem.state}`);
                  }}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    selectedCity === cityItem.name
                      ? "bg-white/20 text-white shadow-lg"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {cityItem.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                navigate("/emergency-facetime");
              }}
              className="bg-gradient-to-r from-blue-400/20 to-blue-600/20 hover:from-blue-400/30 hover:to-blue-600/30 text-white px-6 py-2 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300"
            >
              Facetime someone 📲
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-48 pb-24">
        <h1
          className="text-4xl font-bold mb-8 animate-fade-up opacity-0"
          style={{ animationDelay: "0.2s" }}
        >
          {selectedCity} Safety Analysis
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Safety Score */}
          <div
            className="bg-white/5 rounded-xl p-6 animate-fade-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-xl font-semibold mb-4">Safety Score</h2>
            <div className="flex items-center justify-center h-32">
              <div className="text-6xl font-bold text-white">
                {selectedCityData.safetyscore}
              </div>
              <div className="text-2xl text-white/70 ml-2">/100</div>
            </div>
            <p className="text-center text-white/70 mt-4">
              Average hourly safety score at the most{" "}
              <span className="font-bold">concentrated crime </span>
              location on map
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl">
                <h3 className="text-xl font-semibold mb-3">
                  Most Dangerous Street
                </h3>
                <p className="text-white/70">{selectedCityData.dngstreet}</p>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Safest Hour</h3>
                <p className="text-white/70">{selectedCityData.safehour}</p>
              </div>
              <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl">
                <h3 className="text-xl font-semibold mb-3">
                  Most Dangerous Hour
                </h3>
                <p className="text-white/70">{selectedCityData.dnghour}</p>
              </div>
            </div>
            <p className="text-center text-white/70 mt-4">
              <span className="font-bold">Safety score</span> is calculated
              based on crimes including{" "}
              <span className="font-bold">
                theft, robbery, murders, and any general crimes
              </span>{" "}
              that lead to an arrest
            </p>
          </div>

          {/* Crime by Time */}
          <div
            className="bg-white/5 rounded-xl p-6 animate-fade-up opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-xl font-semibold mb-4">Crime by Time of Day</h2>
            <div className="h-auto">
              <img
                src={selectedCityData.timeofcrime}
                alt="Time of crime"
                className="rounded-2xl shadow-2md"
              />
              <p className="text-center text-white/70 mt-4">
                Hourly safety score at the most dangerous area of {selectedCity}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* High Risk Areas */}
          <div
            className="bg-white/5 rounded-xl p-6 animate-fade-up opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <h2 className="text-xl font-semibold mb-4">High-Risk Areas</h2>
            <div className="space-y-4">
              <img
                src={selectedCityData.highrisk}
                alt="Heat Map"
                className="rounded-2xl shadow-2md"
              />
              <p className="text-center text-white/70 mt-4">
                Overlayed <span className="font-bold">heat map</span> on the map
                of {selectedCity} to show high risk areas
              </p>
            </div>
          </div>

          {/* Crime Heatmap */}
          <div
            className="bg-white/5 rounded-xl p-6 animate-fade-up opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            <h2 className="text-xl font-semibold mb-4">Crime Heatmap</h2>
            <div className=" bg-white/10 rounded-lg">
              <img
                src={selectedCityData.heatmap}
                alt="Heat Map"
                className="rounded-2xl shadow-2md"
              />
            </div>
            <p className="text-center text-white/70 mt-4">
              Advanced <span className="font-bold">ML Model</span> output
              creating the heatmap based on the past five years of crime data
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CityStats;
