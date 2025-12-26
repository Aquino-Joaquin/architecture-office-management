import type { Project } from "./Project";

export type Expense = {
  id: number;
  amount: number;
  description: string;
  createdAt: Date;
  type: string;
  project?: Project;
};
