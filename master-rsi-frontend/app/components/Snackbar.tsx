import { useEffect } from "react";

interface SnackbarProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Snackbar({
  message,
  type = "success",
  onClose,
  duration = 3000, // 3 seconds by default
}: SnackbarProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div
        className={`px-6 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 
        ${type === "success" ? "bg-green-600" : "bg-red-600"} text-white
        transform transition-all duration-300 hover:scale-105`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
