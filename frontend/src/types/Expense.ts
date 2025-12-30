import type { Project } from "./Project";

export type Expense = {
  id: number;
  amount: number;
  description: string;
  createdAt: string;
  type: string;
  project?: Project;
};
