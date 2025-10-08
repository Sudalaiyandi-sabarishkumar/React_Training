import React, { useEffect, useState } from "react";
import BoardHeader from "../BoardHeader/BoardHeader";
import TrelloList from "../TrelloList/TrelloList";
import AddAnotherList from "../AddAnotherList/AddAnotherList";
import { useMutation } from "@tanstack/react-query";
import { addList } from "../../service/Service";
import BackgroundPopup from "../BackgroundPopup/BackgroundPopup";
import  "./Board.scss";
import { LocalStorage } from "../../Utils/LocalStorage";
import { useDebounce } from "../../Utils/useDebounce";

interface Card {
  id: number;
  title: string;
  description?: string;
}

interface List {
  id: number;
  title: string;
  card: Card[];
}

interface BoardProps {
  initialLists?: List[];
  isInitialLoad?: boolean; // New prop to track if this is a fresh page load
}

const Board: React.FC<BoardProps> = ({ initialLists = [], isInitialLoad = false }) => {
  const [lists, setLists] = useState<List[]>(() => {
    // On initial page load, use API data
    if (isInitialLoad && initialLists.length > 0) {
      return initialLists;
    }
    // Otherwise, use localStorage
    const stored = LocalStorage.getItem("trelloLists");
    return stored ? stored : initialLists;
  });
  const [searchQuery, setSearchQuery] = useState("");
  

  // Debounce search query
  const debouncedQuery = useDebounce(searchQuery, 500);

  const filteredLists = lists.filter(list =>
    list.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  

  const [showBackgroundPopup, setShowBackgroundPopup] = useState(false);

  // Background state
  const [background, setBackground] = useState<string>(
    LocalStorage.getItem("boardBackground") || "linear-gradient(160deg, #7a4ee6, #e25dbd)"
  );

  // Only update from API on initial load
  useEffect(() => {
    if (isInitialLoad && initialLists.length > 0) {
      setLists(initialLists);
      LocalStorage.setItem("trelloLists", initialLists);
    }
  }, [isInitialLoad, initialLists]);

  useEffect(() => {
    LocalStorage.setItem("boardBackground", background);
  }, [background]);

  const addListMutation = useMutation({
    mutationFn: (title: string) => addList(title),
    onError: (err) => console.error(err),
  });

  const handleAddList = (title: string) => {
    if (!title.trim()) return;
    const newList: List = {
      id: Math.floor(Math.random() * 1000000),
      title,
      card: [],
    };
    setLists([...lists, newList]);
    addListMutation.mutate(title);
  };

  useEffect(() => {
    LocalStorage.setItem("trelloLists", lists);
  }, [lists]);

  return (
    <div className="board-page" style={{ background }}>
      <BoardHeader 
        onChangeBackground={(bg: string) => {
          setBackground(bg);
        }} 
        onSearch={(query) => setSearchQuery(query)}
      />

      <div className="lists" style={{ display: "flex", gap: "10px" }}>
        {filteredLists.map((list, index) => (
          <TrelloList
            key={list.id}
            listId={list.id}
            colors={index === 0 ? "#f7e48a" : index === 1 ? "#8fdf82" : "white"}
            title={list.title}
            cards={list.card}
            updateCards={(updatedCards) => {
              const updatedLists = lists.map((l) =>
                l.id === list.id ? { ...l, card: updatedCards } : l
              );
              setLists(updatedLists);
            }}
          />
        ))}
        <AddAnotherList onAddList={handleAddList} />
      </div>

      {showBackgroundPopup && (
        <BackgroundPopup
          onClose={() => setShowBackgroundPopup(false)}
          onSelectBackground={(bg: string) => {
            setBackground(bg);
            //setShowBackgroundPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Board;