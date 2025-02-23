import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleEnterApp = () => {
    navigate("/city/New York/NY");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <nav className="fixed w-full top-0 z-50 px-4 py-3">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-full border border-white/20 px-6 py-3 flex items-center justify-between">
        <a href="/" className="text-white font-semibold text-xl">
          StatCrime
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-white/90 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-white/90 hover:text-white transition-colors"
            onClick={handleContact}
          >
            About
          </a>
          <button
            onClick={handleEnterApp}
            className="bg-gradient-to-r from-blue-400/20 to-blue-600/20 hover:from-blue-400/30 hover:to-blue-600/30 text-white px-6 py-2 rounded-full backdrop-blur-lg border border-white/20 transition-all duration-300"
          >
            Enter App
          </button>
        </div>
      </div>
    </nav>
  );
};
