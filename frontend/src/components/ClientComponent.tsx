import { Button, Card } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import type { Client } from "../types/Client";
const clients: Client[] = [
  {
    id: 1,
    name: "Pepe",
    phone: 4238719,
  },
  {
    id: 1,
    name: "Pepe",
    phone: 4238719,
  },
  {
    id: 1,
    name: "Pepe",
    phone: 4238719,
  },
  {
    id: 1,
    name: "Pepe",
    phone: 4238719,
  },
  {
    id: 1,
    name: "Pepe",
    phone: 4238719,
  },
];
export default function ClientComponent() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-black ">
            Clients
          </h1>
          <p className="text-base font-normal text-gray-500 ">
            Here you can see all the clients
          </p>
        </div>
        <Button color="blue">
          <HiPlus className="mr-2 h-5 w-5" />
          New Client
        </Button>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-3">
        {clients.map(({ id, name, phone }) => (
          <Card
            key={id}
            className="w-full shadow-sm hover:shadow-md transition-shadow bg-white! border-none"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black ">{name}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {phone}
                </h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
