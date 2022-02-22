import { ItemModel } from "./Item.model";

export type Comment = Pick<
  ItemModel,
  "by" | "id" | "kidsIds" | "parent" | "text" | "time" | "type"
>;
