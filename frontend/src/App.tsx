
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CityStats from "./pages/CityStats";
import NotFound from "./pages/NotFound";
import EmergencyFaceTime from "./pages/EmergencyFaceTime";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/city/:city/:state" element={<CityStats />} />
        <Route path="/emergency-facetime" element={<EmergencyFaceTime />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
