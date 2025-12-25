import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";

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
    </div>
  );
}
