import React from "react";

export function Button({ children, onClick, className, type = "button", variant }) {
  let base = "px-4 py-2 rounded-lg font-semibold transition ";
  let style =
    variant === "outline"
      ? "border border-gray-400 text-gray-700 hover:bg-gray-100"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button type={type} onClick={onClick} className={`${base} ${style} ${className}`}>
      {children}
    </button>
  );
}
