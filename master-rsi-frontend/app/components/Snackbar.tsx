interface SnackbarProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Snackbar({
  message,
  type = "success",
  onClose,
}: SnackbarProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`px-6 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 
        ${type === "success" ? "bg-green-600" : "bg-red-600"} text-white`}
      >
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </div>
  );
}
