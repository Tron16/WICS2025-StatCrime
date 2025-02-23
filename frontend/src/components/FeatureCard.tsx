
import { FC } from "react";
import { Shield } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

export const FeatureCard: FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="w-12 h-12 mb-4 text-white bg-white/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};
