import React, { useState } from "react";
import "./AddAnotherList.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addList } from "../../service/Service";
import { LocalStorage } from "../../Utils/LocalStorage";

interface AddAnotherListProps {
  onAddList?: (title: string) => void;
}

const AddAnotherList: React.FC<AddAnotherListProps> = ({ onAddList }) => {
  const [addingList, setAddingList] = useState<boolean>(false);
  const [newListTitle, setNewListTitle] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (title: string) => addList(title),
    onSuccess: (_, title) => {
      const storedLists = LocalStorage.getItem("trelloLists");
      const updatedLists = [...storedLists, { title, card: [] }];
      LocalStorage.setItem("trelloLists", updatedLists);
      onAddList?.(title);
     // queryClient.invalidateQueries({ queryKey: ["lists"] });

      setNewListTitle("");
     // setAddingList(false);
    },
    onError: (error, title) => {
      
      // 1️⃣ Add to localStorage immediately even if API failed
      const storedLists: { title: string; card: any[] }[] = LocalStorage.getItem("trelloLists");
      const updatedLists = [...storedLists, { title, card: [] }];
      console.log("ds",updatedLists);
      LocalStorage.setItem("trelloLists",updatedLists);
  
      // 2️⃣ Optional callback to parent
      onAddList?.(title);
  
      // 3️⃣ Update React Query cache immediately
      queryClient.setQueryData(["lists"], updatedLists);
  
      // 4️⃣ Reset input & close form
      setNewListTitle("");
      //setAddingList(false);
  
      console.error("Failed to add list via API:", error);
    },
  });

  const handleSaveList = () => {
    if (newListTitle.trim() !== "") {
      mutation.mutate(newListTitle);
    }
  };

  const handleCancel = () => {
    setNewListTitle("");
    setAddingList(false);
  };

  return (
    <div className="add-another-list-container">
      {!addingList ? (
        <div className="add-another-list-btn" onClick={() => setAddingList(true)}>
          <span className="plus-icon">+</span> Add another list
        </div>
      ) : (
        <div className="add-another-list-form">
          <input
            type="text"
            placeholder="Enter list title..."
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <div className="actions">
            <button className="save-btn" onClick={handleSaveList}>Add List</button>
            <button className="cancel-btn" onClick={handleCancel}>✖</button>
          </div>
          {/* {mutation.isLoading && <p>Adding list...</p>} */}
          
        </div>
      )}
    </div>
  );
};

export default AddAnotherList;
