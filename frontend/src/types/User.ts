import type { Project } from "./Project";

export type User = {
  id: number;

  name: string;

  email: string;

  role: string;

  projects?: Project[];
};
