import { serializable, object } from "serializr";
import { List } from "./List";

export class Card {
  @serializable
  id?: number;

  @serializable
  title?: string;

  @serializable
  description?: string;

  
}
