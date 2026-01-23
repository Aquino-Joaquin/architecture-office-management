import type { User } from "./User";

export type Document = {
  title: string;
  url: string;
  type: string;
  user: User;
  project: User;
};
