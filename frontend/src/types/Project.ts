import type { Client } from "./Client";
import type { Expense } from "./Expense";
import type { User } from "./User";

export type Project = {
  id: number;

  name: string;

  description: string;

  status: string;

  totalPrice: number;

  amoutPaid: number;

  client: Client;

  expenses?: Expense[];

  users?: User[];
};
