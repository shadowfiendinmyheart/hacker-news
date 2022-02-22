import { ItemModel } from "./Item.model";

export type Story = Pick<
  ItemModel,
  | "by"
  | "descendants"
  | "id"
  | "kidsIds"
  | "score"
  | "time"
  | "title"
  | "type"
  | "url"
>;
