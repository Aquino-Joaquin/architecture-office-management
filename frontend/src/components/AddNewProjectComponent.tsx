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
import Header from "./common/Header";
import { api } from "../helper/api";
import type { User } from "../types/User";
import { useEffect, useState } from "react";
import type { Client } from "../types/Client";
import { toast, ToastContainer } from "react-toastify";

export default function AddNewProjectComponent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [clientId, setClientId] = useState<number | "">("");
  const [userIds, setUserIds] = useState<number[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  async function fetchUsers() {
    const res = await api.get("users");
    setUsers(res.data);
  }

  async function fetchClients() {
    const res = await api.get("clients");
    setClients(res.data);
  }

  useEffect(() => {
    fetchUsers();
    fetchClients();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!clientId) {
      toast.warning("Please select a client");
      return;
    }

    try {
      await api.post("projects", {
        name,
        description,
        status,
        totalPrice,
        amountPaid,
        clientId: Number(clientId),
        userIds,
      });

      toast.success("Project created successfully");
      setName("");
      setDescription("");
      setStatus("");
      setTotalPrice(0);
      setAmountPaid(0);
      setClientId("");
      setUserIds([]);
    } catch (error) {
      toast.error("Error creating project");
    }
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen">
      <ToastContainer position="top-center" autoClose={2000} />
      <Header
        title="Create New Project"
        subTitle="Enter project information and assign team members"
      />

      <form onSubmit={handleSubmit} className="w-full mx-auto space-y-6 p-4">
        {/* --- CARD 1: Basic Information --- */}
        <Card className="bg-white! w-full border-none">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Project Name */}
            <div className="md:col-span-2">
              <Label htmlFor="projectName">Project Name</Label>
              <TextInput
                id="projectName"
                type="text"
                placeholder="Enter project name"
                value={name}
                color="white"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Client */}
            <div>
              <Label htmlFor="client">Client</Label>
              <Select
                id="client"
                value={clientId}
                color="white"
                required
                onChange={(e) => setClientId(Number(e.target.value))}
              >
                <option value="" disabled>
                  Select a client
                </option>
                {clients.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                color="white"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
            </div>

            {/* Budget */}
            <div>
              <Label htmlFor="budget">Total Budget</Label>
              <TextInput
                id="budget"
                type="number"
                color="white"
                value={totalPrice}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
              />
            </div>

            {/* Amount Paid */}
            <div>
              <Label htmlFor="amountPaid">Amount Paid</Label>
              <TextInput
                id="amountPaid"
                type="number"
                color="white"
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                color="white"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* --- CARD 2: Assign Team Members --- */}
        <Card className="bg-white! border-none">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Assign Team Members
          </h3>

          <div className="flex flex-col gap-4">
            {users.map(({ id, name, role }) => (
              <div
                key={id}
                className="flex items-center gap-4 rounded-lg border p-4 hover:bg-gray-50"
              >
                <Checkbox
                  id={`member-${id}`}
                  checked={userIds.includes(id)}
                  onChange={(e) => {
                    setUserIds((prev) =>
                      e.target.checked
                        ? [...prev, id]
                        : prev.filter((uid) => uid !== id)
                    );
                  }}
                />

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                  {name.charAt(0)}
                </div>

                <div>
                  <label
                    htmlFor={`member-${id}`}
                    className="font-medium cursor-pointer"
                  >
                    {name}
                  </label>
                  <div className="text-xs text-gray-500">{role}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit" color="blue">
            <HiPlus className="mr-2 h-5 w-5" />
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
}
