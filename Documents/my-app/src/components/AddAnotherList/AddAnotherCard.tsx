import React, { useState } from "react";
import "./AddAnotherCard.scss";

interface AddAnotherCardProps {
  onAddCard: (title: string) => void;
  size?: number;
}

const AddAnotherCard: React.FC<AddAnotherCardProps> = ({ onAddCard, size }) => {
  const [adding, setAdding] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAddCard(newTitle);
    setNewTitle("");
    setAdding(false);
  };

  return (
    <div
      className="add-another-list-containers"
      
    >
      {!adding ? (
        <div className="add-another-list-btns" onClick={() => setAdding(true)}>
          Add Card
        </div>
      ) : (
        <div className="add-another-list-forms">
          <input
            type="text"
            placeholder="Enter card title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className="actions">
            <button className="save-btn" onClick={handleAdd}>
              Add Card
            </button>
            <button className="cancel-btn" onClick={() => setAdding(false)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAnotherCard;
