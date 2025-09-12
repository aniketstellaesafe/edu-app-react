import React from "react";

export function Progress({ value, className }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${className}`}>
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${value}%` }}
      >
        {Math.round(value)}%
      </div>
    </div>
  );
}
