
import { FC } from "react";

interface CityButtonProps {
  city: string;
  state: string;
  onClick: () => void;
}

export const CityButton: FC<CityButtonProps> = ({ city, state, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group relative py-4 px-10 bg-white/15 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/25 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <div className="text-white text-center">
        <div className="font-semibold text-lg mb-1">{city}</div>
        <div className="text-sm font-medium text-white/80">{state}</div>
      </div>
    </button>
  );
};
