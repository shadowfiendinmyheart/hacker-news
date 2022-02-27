import { ItemModel } from "./Item.model";

export type Comment = Pick<
  ItemModel,
  | "by"
  | "id"
  | "kids"
  | "parent"
  | "text"
  | "time"
  | "type"
  | "dead"
  | "deleted"
>;
