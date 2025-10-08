import React, { useState } from "react";
import "./TrelloList.scss";
import { addCard as apiAddCard, editCard as apiEditCard, deleteCard as apiDeleteCard } from "../../service/Service";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

interface Card {
  id: number;
  title: string;
  description?: string;
}

interface TrelloListProps {
  listId?: number;
  colors: string;
  title: string;
  cards: Card[];
  updateCards: (updatedCards: Card[]) => void;
}

const TrelloList: React.FC<TrelloListProps> = ({ listId, colors, title, cards, updateCards }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newCard, setNewCard] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [checkedCards, setCheckedCards] = useState<Record<number, boolean>>({});

  // Mutations
  const addCardMutation = useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) => apiAddCard(id, title),
    onSuccess: (_, variables) => {
      updateCards([...cards, { id: variables.id, title: variables.title }]);
      setNewCard("");
      setAdding(false);
      
    },
    onError: (err, variables) => {
      console.error("Error adding card:", err);
      updateCards([...cards, { id: variables.id, title: variables.title }]);
      setNewCard("");
      setAdding(false);
    },
  });

  const editCardMutation = useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) => apiEditCard(id, title),
    onSuccess: (_, variables) => {
      updateCards(cards.map(c => c.id === variables.id ? { ...c, title: variables.title } : c));
      setEditingIndex(null);
      setEditTitle("");
    },
    onError: (err, variables) => {
      console.error("Error editing card:", err);
      updateCards(cards.map(c => c.id === variables.id ? { ...c, title: variables.title } : c));
      setEditingIndex(null);
      setEditTitle("");
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: (id: number) => apiDeleteCard(id),
    onSuccess: (_, id) => {
      updateCards(cards.filter(c => c.id !== id));
      const copy = { ...checkedCards };
      delete copy[id];
      setCheckedCards(copy);
      toast.success("Card deleted successfully");
    },
    onError:(_,id)=>{
      updateCards(cards.filter(c => c.id !== id));
      const copy = { ...checkedCards };
      delete copy[id];
      setCheckedCards(copy);
      
    }
  });

  // Handlers
  const handleAddCard = () => {
    if (!newCard.trim()) return;
    const id = Date.now();
    addCardMutation.mutate({ id, title: newCard });
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim() || editingIndex === null) return;
    const cardToEdit = cards[editingIndex];
    editCardMutation.mutate({ id: cardToEdit.id, title: editTitle });
  };

  const handleDeleteCard = (id: number) => {
    deleteCardMutation.mutate(id);
  };

  return (
    <div className="trello-container">
      <ToastContainer position="bottom-left" autoClose={2000} />

      {collapsed ? (
        <div className="collapsed" style={{ backgroundColor: colors }}>
          <button className="expand-btn" onClick={() => setCollapsed(false)}>
            <FaArrowLeft size={8} /><FaArrowRight size={8} />
          </button>
          <span className="collapsed-title">{title}</span>
          <span className="collapsed-length">{cards.length}</span>
        </div>
      ) : (
        <div className="list" style={{ backgroundColor: colors }}>
          <div className="list-header">
            <span>{title}</span>
            <div className="list-actions">
              <button className="collapse-btn" onClick={() => setCollapsed(true)}>
                <FaArrowRight size={10} /><FaArrowLeft size={10} />
              </button>
              <button className="options-btn" onClick={() => alert("Options menu clicked")}>⋯</button>
            </div>
          </div>

          <div className="cardss">
            {cards.map((card, i) => {
              const isChecked = !!checkedCards[card.id];
              return (
                <div
                  key={card.id}
                  className="card"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {editingIndex === i ? (
                    <div className="edit-card-inline">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                      <button onClick={handleSaveEdit}>Save</button>
                    </div>
                  ) : (
                    <div className="card-content">
                      <div className="left">
                        <input
                          type="checkbox"
                          className={`card-radio ${isChecked ? "complete" : "incomplete"}`}
                          checked={isChecked}
                          data-tooltip={checkedCards[card.id] ? "Mark incomplete" : "Mark complete"}
                          onChange={() => setCheckedCards(prev => ({ ...prev, [card.id]: !prev[card.id] }))}
                        />
                        <span className="card-text">{card.title}</span>
                      </div>
                      <div className="right">
                        {isChecked && hoveredCard === i && (
                          <button className="delete-btn" onClick={() => handleDeleteCard(card.id)}>🗑</button>
                        )}
                        <button className="edit-btn" onClick={() => { setEditingIndex(i); setEditTitle(card.title); }}>✎</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {adding ? (
            <div className="add-card-form">
              <input
                type="text"
                value={newCard}
                onChange={(e) => setNewCard(e.target.value)}
                placeholder="Enter card title..."
              />
              <div className="actions">
                <button onClick={handleAddCard} className="add-btn-card">Add card</button>
                <button className="cancel" onClick={() => setAdding(false)}><FaTimes /></button>
              </div>
            </div>
          ) : (
            <button className="add-card-btn" style={{ backgroundColor: colors }} onClick={() => setAdding(true)}>+ Add a card</button>
          )}
        </div>
      )}
    </div>
  );
};

export default TrelloList;
