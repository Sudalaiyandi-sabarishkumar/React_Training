import React from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

interface CustomArchiveToastProps {
  title: string;
  onUndo?: () => void;
}

const CustomArchiveToast: React.FC<CustomArchiveToastProps> = ({ title, onUndo }) => {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      {/* Left Icon */}
      <FaTrash style={{ marginRight: "10px", marginTop: "4px", color: "black" }} />

      {/* Content: Title + Undo below */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <p style={{ margin: 0, fontWeight: 500 }}>{title}</p>

        <button
          style={{
            marginTop: "6px",
            padding: "4px 12px",
            color: "blue",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
          }}
          onClick={() => {
            if (onUndo) onUndo();
            toast.dismiss();
          }}
        >
          Undo
        </button>
      </div>
    </div>
  );
};

export default CustomArchiveToast;
