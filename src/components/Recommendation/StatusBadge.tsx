import React from 'react';
import { Suggestion } from '../../types/types';

interface StatusBadgeProps {
  status: Suggestion['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (): string => {
    switch (status) {
      case "Done":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "ToDo":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "In Progress":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "New":
        return "bg-violet-100 text-violet-800 border-violet-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;