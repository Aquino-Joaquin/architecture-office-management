import type { User } from "./User";

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  projectId: number;
  milestoneId: number;
  users: User[];
};
