import type { Milestone } from "./Milestone";
import type { User } from "./User";

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  projectId: number;
  milestone: Milestone;
  users: User[];
};
