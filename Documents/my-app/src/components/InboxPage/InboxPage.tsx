import React, { useEffect, useState } from "react";
import mailIcon from "../../assets/mail.webp";
import meetIcon from "../../assets/meet.webp";
import teamsIcon from "../../assets/teams.webp";
import phoneIcon from "../../assets/phone.webp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddAnotherCard from "../AddAnotherList/AddAnotherCard";
import { addCardApi, updateCardApi, deleteCard as apiDeleteCard } from "../../service/Service";
import "./InboxPage.scss";
import { FaQuestionCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { FiInbox } from "react-icons/fi";
import CustomArchiveToast from "../Toast/CustomArchiveToast";
import SearchBar from "../SearchBar/SearchBar";
import clsx from "clsx";
import { LocalStorage } from "../../Utils/LocalStorage";
import { useDebounce } from "../../Utils/useDebounce";



const LOCAL_STORAGE_KEY = "inboxCardsLocal";

interface Card {
  id?: number;
  tempId?: number;
  title: string;
}

interface InboxPageProps {
  size?: number;
  initialCards?: Card[];
  isInitialLoad?: boolean;
  setIsCardInitialLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const InboxPage: React.FC<InboxPageProps> = ({ size,initialCards,isInitialLoad,setIsCardInitialLoad }) => {
  const queryClient = useQueryClient();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [checkedCards, setCheckedCards] = useState<Record<number, boolean>>({});
  
  const [localCards, setLocalCards] = useState<Card[]>(() => {
    
    if (isInitialLoad && initialCards.length > 0 ) {
      
      setIsCardInitialLoad(false);
      return initialCards;
    }
    
    const stored = LocalStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? stored : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 500);

  const filteredCards = localCards.filter(card =>
    card.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

    useEffect(() => {
      if (isInitialLoad && initialCards?.length > 0 ) {
        
        
        setLocalCards(initialCards);
        
        LocalStorage.setItem(LOCAL_STORAGE_KEY, initialCards);
        
      }
    }, [isInitialLoad, initialCards]);

  useEffect(() => {
    LocalStorage.setItem(LOCAL_STORAGE_KEY, localCards);
  }, [localCards]);

  // API Mutations
  const addCardMutation = useMutation({
    mutationFn: addCardApi,
    onError: (err) => console.error("Add card API error:", err),
  });

  const updateCardMutation = useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) =>
      updateCardApi(id, title),
    onError: (err) => console.error("Update card API error:", err),
  });
  const deleteCardMutation = useMutation({
    mutationFn: ({ id, title }: { id: number; title: string }) => apiDeleteCard(id),
    onSuccess: (_, variables) => {
      const { id, title } = variables; // get title from passed variables
      setLocalCards((prev) => prev.filter((c) => c.id !== id));
      toast.success(
        <CustomArchiveToast
          title={`${title} auto archived`}
          onUndo={() => console.log("Undo clicked")}
        />,
        {
          hideProgressBar: true,
          icon: false, // remove default toast icon
        }
      );
    },
    onError: (_, variables) => {
      const { id,title } = variables;
      setLocalCards((prev) => prev.filter((c) => c.id !== id));
      toast.success(
        <CustomArchiveToast
          title={`${title} auto archived`}
          onUndo={() => console.log("Undo clicked")}
        />,
        {
          hideProgressBar: true,
          icon: false, // remove default toast icon
        }
      );
    },
  });
  

  // Add card
  const handleAddCard = (title: string) => {
    if (!title.trim()) return;
    const id = Date.now();
    const newCard: Card = { id, title };
    setLocalCards([...localCards, newCard]);
    addCardMutation.mutate(title);
  };

  // Edit card inline
  const handleEditChange = (index: number, value: string) => {
    const updatedCards = [...localCards];
    updatedCards[index].title = value;
    setLocalCards(updatedCards);
  };

  const handleSaveEdit = (index: number) => {
    const cardToEdit = localCards[index];
    setEditingIndex(null);
    console.log("loca",cardToEdit);
    if (cardToEdit.id) {
      updateCardMutation.mutate({ id: cardToEdit.id, title: cardToEdit.title });
    }
  };

  // Delete card
  const handleDeleteCard = (card: Card) => {
    if (card.id) {
      deleteCardMutation.mutate({ id: card.id!, title: card.title });

    } else {
      // local-only card
      setLocalCards((prev) => prev.filter((c) => c.id !== card.id));
      toast.success(<CustomArchiveToast title={`${card.title} auto archived`} onUndo={() => console.log("Undo clicked")} />, {
        hideProgressBar:true,
        icon: false, // remove default toast icon
      });
    
    }
  };

  return (
    <div className="inbox-page-layout">
      <main className="inbox-content">
        <div className="inbox-header">
          <div className="inbox-header-left">
            <FiInbox className="logo-placeholder"/>
            <h2 className="header-title">Inbox</h2>
          </div>
          <div className="inbox-header-right desktop-only">
            <button className="icon-btn" aria-label="Notifications">
              <span className="icon-sm">🔊</span>
            </button>
            <FaQuestionCircle className="icon" />
            <button className="icon-btn" aria-label="More Options">
              <span className="icon-sm">···</span>
            </button>
          </div>
        </div>
        <div className="search-bar-container">
        <SearchBar placeholder="Search cards..." onSearch={setSearchQuery} /></div>
        {/* Add Card */}
        <div
          className="add-card-container"
          style={{ marginBottom: localCards.length === 0 ? "80px" : "10px" }}
        >
          <AddAnotherCard onAddCard={handleAddCard} size={size}  />
        </div>

        {/* Cards */}
        <div className="fetched-cards">
          {filteredCards.length === 0 ? (
            <p></p>
          ) : (
            filteredCards.map((card, i) => (
              <div
                key={card.id ?? card.tempId}
                className="cards"
                // style={{ width: size === 1 ? "240px" : "775px" }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {editingIndex === i ? (
                  <div className="edit-card-inline">
                    <input
                      type="text"
                      value={editTitle}
                      className="edit-input"
                      onChange={(e) => {
                        setEditTitle(e.target.value);
                        handleEditChange(i, e.target.value);
                      }}
                    />
                    <button onClick={() => handleSaveEdit(i)}>Save</button>
                  </div>
                ) : (
                  <div className="card-content">
  {/* Checkbox for selecting card */}
  <div className="left">
  <input
  type="checkbox"
  className="card-radio"
  data-tooltip={checkedCards[card.id ?? card.tempId!] ? "Mark incomplete" : "Mark complete"}
  checked={!!checkedCards[card.id ?? card.tempId!]}
  onChange={() => {
    const cardKey = card.id ?? card.tempId!;
    setCheckedCards((prev) => ({
      ...prev,
      [cardKey]: !prev[cardKey],
    }));

    // Automatically delete if checkbox is now checked
    if (!checkedCards[cardKey]) {
      handleDeleteCard(card);
    }
  }}
/>

  <span className="card-text">{card.title}</span>
  </div>
  {/* Edit button */}
  <div className="right">

  <button
    className="edit-btn"
    onClick={() => {
      setEditingIndex(i);
      setEditTitle(card.title);
    }}
  >
    ✎
  </button>

  {/* Delete button only if hovered AND checked */}
 
  </div>
</div>

                )}
              </div>
            ))
          )}
        </div>
        {localCards.length==0 && <div className="consolidation-section">
        <h3 className="section-title">Consolidate your to-dos</h3>
        <p className="section-subtitle">
          Email it, say it, forward it — however it comes, get it into Trello fast.
        </p>
      </div>}
      <div
  className={clsx({
    "integration-icons": localCards.length === 0,
    "integration-icons-row fixed-bottom": localCards.length !== 0,
  })}
>
  <div className={clsx("icon-circle", localCards.length === 0 ? "email-icon" : "email-icons")}>
    <img src={mailIcon} alt="Email" />
  </div>
  <div className={clsx("icon-circle", localCards.length === 0 ? "teams-icon" : "teams-icons")}>
    <img src={meetIcon} alt="Teams" />
  </div>
  <div className={clsx("icon-circle", localCards.length === 0 ? "mobile-icon" : "mobile-icons")}>
    <img src={teamsIcon} alt="Mobile" />
  </div>
  <div className={clsx("icon-circle", localCards.length === 0 ? "slack-icon" : "slack-icons")}>
    <img src={phoneIcon} alt="Slack" />
  </div>
</div>
      {localCards.length==0 && <div className="visibility-message">
        <span className="icon-sm">🔒</span> Inbox is only visible to you
      </div>}
      
      </main>
    </div>
  );
};

export default InboxPage;
