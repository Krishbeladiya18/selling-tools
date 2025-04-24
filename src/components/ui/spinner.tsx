import React from "react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, color = "var(--background)" }) => {
  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `${size / 8}px solid rgba(0, 0, 0, 0.1)`,
    borderTop: `${size / 8}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return <div style={spinnerStyle} />;
};

export { Spinner };
