import type { Client } from "./Client";
import type { Expense } from "./Expense";
import type { User } from "./User";

export type Project = {
  id: number;

  name: string;

  description: string;

  status: string;

  totalPrice: number;

  amountPaid: number;

  client: Client;

  expenses?: Expense[];

  users?: User[];
};
