import { serializable, list, object } from "serializr";
import { Card } from "./Card";

export class List {
  @serializable
  id?: number;

  @serializable
  title?: string;

  @serializable(list(object(Card)))
  card?: Card[] = [];
}
