import type { User } from "./User";

export type Document = {
  id: number;
  title: string;
  url: string;
  type: string;
  createdAt: string;
  user: User;
};
