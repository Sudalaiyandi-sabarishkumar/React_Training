import axios from "axios";
import { ApiRoutes as routes } from "../Routes/Routes";
import { generatePath } from "react-router-dom";
import { List } from "../models/List";
import { deserialize } from "serializr";
import { Card } from "../models/Card";
import { LocalStorage } from "../Utils/LocalStorage";

/** Fetch all lists */
export const getLists = async (): Promise<List[]> => {
  const response = await axios.get(routes.lists);
  const listsJson = response.data || [];

  // Deserialize each list (cards nested automatically)
  const lists: List[] = listsJson.map((item: any) => deserialize(List, item));

  // Store the actual deserialized lists in localStorage
  LocalStorage.setItem("trelloLists", lists);
  console.log("ll",lists);
  return lists;
};

/** Add a new list */
export const addList = async (title: string) => {
  const response = await axios.post(routes.addList, {
    list: { id: Math.floor(Math.random() * 1000000), title },
  });
  return response.data;
};

/** Add a card to a list */
export const addCard = async (listId: number, cardTitle: string) => {
  const url = generatePath(routes.list, { id:listId });
  console.log("dsd",url);
  const response = await axios.put(url, { title: cardTitle });
  return response.data;
};

/** Edit a card by ID */
export const editCard = async (cardId: number | string, newTitle: string) => {
  const url = generatePath(routes.list, { id: cardId });
  const response = await axios.put(url, { card: { title: newTitle } });
  return response.data;
};

/** Delete a card */
export const deleteCard = async (cardId: number) => {
  const url = generatePath(routes.list, { id: cardId });
  const response = await axios.delete(url);
  return response.data;
};

/** Fetch cards of a list */
export const fetchCards = async (listId: number = 1): Promise<Card[]> => {
  const url = generatePath(routes.cards, { listId });
  const response = await axios.get(url);
  const cardsJson = response.data.cards || [];

  // Deserialize each card
  const cards: Card[] = cardsJson.map((item: any) => deserialize(Card, item));

  // Store the actual deserialized cards in localStorage
  LocalStorage.setItem(`inboxCardsLocal`, cards);

  return cards;
};

/** Add a new card */
export const addCardApi = async (title: string, listId: number = 1) => {
  const url = generatePath(routes.card, { listId });
  const response = await axios.post(url, { title });
  return response.data.card;
};

/** Update a card */
export const updateCardApi = async (id: number | string, title: string, listId: number = 1) => {
  const url = generatePath(routes.card, { listId, cardId: id });
  const response = await axios.put(url, { title });
  return response.data.card;
};
