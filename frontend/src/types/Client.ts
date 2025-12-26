import type { Project } from "./Project";

export type Client = {
  id: number;
  name: string;
  email?: string;
  phone: number;
  companyName?: string;
  projects?: Project[];
};
