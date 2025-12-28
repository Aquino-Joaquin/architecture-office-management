import type { Project } from "./Project";

export type Client = {
  id: number;
  name: string;
  email?: string;
  phone: string;
  companyName?: string;
  projects?: Project[];
};
