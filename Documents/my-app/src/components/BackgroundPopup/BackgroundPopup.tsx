import React, { useState } from "react";
import { FiX, FiPlus, FiArrowLeft } from "react-icons/fi";
import "./BackgroundPopup.scss";
import { LocalStorage } from "../../Utils/LocalStorage";
import { Blobs } from "../../Utils/Blob";

interface BackgroundPopupProps {
  onClose: () => void;
  onSelectBackground: (bg: string) => void; 
}

// Preloaded photos (add your URLs here)
const preloadedPhotos: string[] = [
  // Example: "https://via.placeholder.com/150",
  "src/assets/mail.webp",
  "src/assets/teams.webp",
  "src/assets/meet.webp",
  "src/assets/phone.webp"
];

// Gradient colors
const gradientColors: string[] = [
  "linear-gradient(45deg, #ff9a9e, #fad0c4)",
  "linear-gradient(45deg, #a1c4fd, #c2e9fb)",
  "linear-gradient(45deg, #d4fc79, #96e6a1)",
  "linear-gradient(45deg, #fbc2eb, #a6c1ee)",
  "linear-gradient(45deg, #ffecd2, #fcb69f)",
];

const BackgroundPopup: React.FC<BackgroundPopupProps> = ({ onClose,onSelectBackground }) => {
  const [tab, setTab] = useState<"All" | "Photos" | "Colors">("All");
  const [customPhotos, setCustomPhotos] = useState<string[]>([]);
  const [selectedBg, setSelectedBg] = useState<string>(LocalStorage.getItem("boardBackground") || "");

  // Handle custom photo upload
const handleAddPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
  Blobs.handleAddPhoto(event, (base64) => {
    setCustomPhotos((prev) => [base64, ...prev]);
  });
  // const file = event.target.files?.[0];
  // if (!file) return;

  // const reader = new FileReader();
  // reader.onload = () => {
  //   const base64 = reader.result as string; // this is a data URL
  //   setCustomPhotos((prev) => [base64, ...prev]);
  // };
  // reader.readAsDataURL(file); // convert Blob/File to base64
};


  // Save selected background to localStorage
  const handleSelectBackground = (bg: string) => {
    
    onSelectBackground(bg); // update Board background state dynamically
    LocalStorage.setItem("boardBackground", bg); // persist
    //onClose();
  };

  // Header text
  const headerTitle = tab === "All" ? "Change background" : tab;

  return (
    <div className="background-popup">
      {/* Header */}
      <div className="popup-header">
        {tab !== "All" && (
          <button className="back-button" onClick={() => setTab("All")}>
            <FiArrowLeft />
          </button>
        )}
        <span className="header-title">{headerTitle}</span>
        <button className="close-button" onClick={onClose}>
          <FiX />
        </button>
      </div>

      {/* Tabs (only show on "All") */}
      {tab === "All" && (
     <div className="top-tabs">
     <div className="tab-preview tab-preview-photos" onClick={() => setTab("Photos")}>
       <div className="photos-preview">
         <div className="photo photo-1"></div>
         <div className="photo photo-2"></div>
       </div>
       <span className="tab-label">Photos</span>
     </div>
   
     <div className="tab-preview tab-preview-color" onClick={() => setTab("Colors")}>
       <div className="color-preview">
         <div className="tabs tab-1"></div>
         <div className="tabs tab-2"></div>
       </div>
       <span className="tab-label">Colors</span>
     </div>
   </div>
   
     
      )}

      {/* Custom Section */}
      <div className="custom-section">
        <h4>Custom</h4>
        <div className="custom-grid">
          {/* Photos section */}
          {(tab === "Photos" || tab === "All") &&
            [...customPhotos, ...preloadedPhotos].map((src, idx) => (
              <img className="imgs"
                key={idx}
                src={src}
                alt={`Photo ${idx}`}
                onClick={() => handleSelectBackground(`url(${src})`)} // store as CSS url()
              />
            ))}

          {/* + button for uploading photos */}
          {tab === "All" && (
            <label className="add-item">
              <FiPlus />
              <input
                type="file"
                accept="image/*"
                onChange={handleAddPhoto}
                style={{ display: "none" }}
              />
            </label>
          )}

          {/* Colors section */}
          {(tab === "Colors" ) &&
            gradientColors.map((color, idx) => (
              <div
                key={idx}
                className="color-swatch"
                style={{ background: color }}
                onClick={() => handleSelectBackground(color)} // store gradient string
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundPopup;
