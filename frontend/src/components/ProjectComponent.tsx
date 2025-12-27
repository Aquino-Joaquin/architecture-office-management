import { Button } from "flowbite-react";
import type { Project } from "../types/Project";
import TableComponent from "./TableComponent";
import { HiPlus } from "react-icons/hi";
import ProjectRowComponent from "./ProjectRowComponent";

const titles: string[] = [
  "Id",
  "Name",
  "Status",
  "Total Price",
  "Amount Paid",
  "Client Name",
];

// Nota: Asegúrate de que tu interfaz Project tenga "amoutPaid" (parece un typo de amountPaid)
const projectRow: Project[] = [
  {
    id: 1,
    name: "Joaquin",
    description: "Bueno bueno bueno chicos",
    status: "On going",
    totalPrice: 1200,
    amoutPaid: 500,
    client: {
      id: 1,
      name: "Pepe",
      phone: 4238719,
    },
  },
  // ... resto de tus datos
  {
    id: 2,
    name: "Joaquin",
    description: "Bueno bueno bueno chicos",
    status: "On going",
    totalPrice: 1200,
    amoutPaid: 500,
    client: {
      id: 1,
      name: "Pepe",
      phone: 4238719,
    },
  },
];

export default function ProjectComponent() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-black ">
            Projects
          </h1>
          <p className="text-base font-normal text-gray-500 ">
            Here you can see all the projects
          </p>
        </div>
        <Button color="blue">
          <HiPlus className="mr-2 h-5 w-5" />
          New Project
        </Button>
      </div>

      <div className="overflow-x-auto">
        <TableComponent<Project>
          titles={titles}
          rows={projectRow}
          renderRow={(project) => (
            <ProjectRowComponent key={project.id} project={project} />
          )}
        />
      </div>
    </div>
  );
}
