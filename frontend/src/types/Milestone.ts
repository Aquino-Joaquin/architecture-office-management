import type { Task } from "./Task";

export type Milestone = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  projectId: number;
  tasks: Task[];
};
