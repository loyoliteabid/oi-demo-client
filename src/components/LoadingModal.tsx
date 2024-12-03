import React from "react";
import "./LoadingModal.css"; // Import the CSS file for styling

interface LoadingModalProps {
  isOpen: boolean;
  text?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({
  isOpen,
  text = "Please wait...",
}) => {
  if (!isOpen) return null;

  return (
    <div className="loading-modal flex flex-col justify-center items-center">
      <div className="loading-container">
        {[...Array(3)].map((_, index) => (
          <div key={index} className={`loading-circle circle-${index + 1}`} />
        ))}
      </div>
      <p className="loading-text text-gray-50">{text}</p>
    </div>
  );
};

export default LoadingModal;
