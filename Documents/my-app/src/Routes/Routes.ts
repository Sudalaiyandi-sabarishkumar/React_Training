const apiBase = import.meta.env.VITE_API_BASE;
export const ApiRoutes = {
  lists: `${apiBase}/list_management/lists`,
  list: `${apiBase}/list_management/list/:id`,         // :id param
  addList: `${apiBase}/list_management/list/`,
  cards: `${apiBase}/card_management/lists/1/card`,
  card: `${apiBase}/card_management/lists/1/card/:cardId?`,
};
