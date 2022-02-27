import { ItemModel } from "./Item.model";

export type Story = Pick<
  ItemModel,
  | "by"
  | "descendants"
  | "id"
  | "kids"
  | "score"
  | "time"
  | "title"
  | "type"
  | "url"
>;
