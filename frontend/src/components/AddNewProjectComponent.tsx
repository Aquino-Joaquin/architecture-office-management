import {
  Button,
  Card,
  Checkbox,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { HiPlus } from "react-icons/hi";
const teamMembers = [
  { id: 1, name: "John Smith", role: "Lead Architect", initials: "J" },
  { id: 2, name: "Sarah Johnson", role: "Interior Designer", initials: "S" },
];
export default function AddNewProjectComponent() {
  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen ">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-black ">
          Create New Project
        </h1>
        <p className="text-base font-normal text-gray-500 ">
          Enter project infomation and assign team members
        </p>
      </div>
      <div className="w-full  mx-auto space-y-6 p-4">
        {/* --- CARD 1: Basic Information --- */}
        <Card className="bg-white! w-full border-none">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Basic Information
          </h3>

          <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Project Name (Ocupa 2 columnas en desktop) */}
            <div className="md:col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="projectName" />
              </div>
              <TextInput
                id="projectName"
                type="text"
                placeholder="Enter project name"
                color="white"
                required
              />
            </div>

            {/* Client */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="client" />
              </div>
              <Select color="white" id="client" required>
                <option disabled selected>
                  Select a client
                </option>
                <option>Client A</option>
                <option>Client B</option>
              </Select>
            </div>

            {/* Status */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="status" />
              </div>
              <Select color="white" id="status" required>
                <option selected>Planning</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Select>
            </div>

            {/* Budget */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="budget" />
              </div>
              <TextInput
                id="budget"
                type="number"
                placeholder="Enter budget amount"
                color="white"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="amountPaid" />
              </div>
              <TextInput
                id="amountPaid"
                type="number"
                placeholder="Amount Paid"
                color="white"
              />
            </div>

            {/* Description (Ocupa 2 columnas) */}
            <div className="md:col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="description" />
              </div>
              <Textarea
                color="white"
                id="description"
                placeholder="Enter project description"
                required
                rows={4}
              />
            </div>
          </form>
        </Card>

        {/* --- CARD 2: Assign Team Members --- */}
        <Card className="bg-white! border-none">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Assign Team Members
          </h3>

          <div className="flex flex-col gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
              >
                {/* Checkbox */}
                <Checkbox
                  id={`member-${member.id}`}
                  className="h-5 w-5 bg-white!"
                />

                {/* Avatar con Iniciales */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                  {member.initials}
                </div>

                {/* Info Text */}
                <div className="flex flex-col">
                  <label
                    htmlFor={`member-${member.id}`}
                    className="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    {member.name}
                  </label>
                  <span className="text-xs text-gray-500">{member.role}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button color="blue" type="submit">
            <HiPlus className="mr-2 h-5 w-5" />
            Create Project
          </Button>
        </div>
      </div>
    </div>
  );
}
