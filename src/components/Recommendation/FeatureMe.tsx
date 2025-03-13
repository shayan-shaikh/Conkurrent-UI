import React from 'react';

interface FeatureMeProps {
  featureMe: boolean;
}

const FeatureMeBadge: React.FC<FeatureMeProps> = ({ featureMe }) => {
  const getBadgesByStyles = (): string => {
    switch (featureMe) {
      case true:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case false:
        return "bg-red-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getBadgesByStyles()}`}>
      {featureMe ? "Feature Me✅" : "Feature Me❌"}
    </span>
  );
};

export default FeatureMeBadge;