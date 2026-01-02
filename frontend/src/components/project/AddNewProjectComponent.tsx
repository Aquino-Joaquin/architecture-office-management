import {
  Button,
  Card,
  Checkbox,
  Label,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import { HiPlus, HiPencil } from "react-icons/hi";
import Header from "../common/Header";
import { api } from "../../helper/api";
import type { User } from "../../types/User";
import type { Client } from "../../types/Client";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { checkAdmin } from "../../helper/checkAdmin";

export default function AddNewProjectComponent() {
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const isAdmin = checkAdmin();

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

  async function fetchProject(projectId: string) {
    const res = await api.get(`projects/${projectId}`);
    const project = res.data;

    setName(project.name);
    setDescription(project.description);
    setStatus(project.status);
    setTotalPrice(project.totalPrice);
    setAmountPaid(project.amountPaid);
    setClientId(project.client.id);
    setUserIds(project.users.map((u: User) => u.id));
  }

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchClients();
    }

    if (isEditMode && id) {
      fetchProject(id);
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!clientId) {
      toast.warning("Please select a client");
      return;
    }

    const payload = {
      name,
      description,
      status,
      totalPrice,
      amountPaid,
      clientId: Number(clientId),
      userIds,
    };

    try {
      if (isEditMode) {
        await api.patch(`projects/${id}`, payload);
        toast.success("Project updated successfully");
      } else {
        await api.post("projects", payload);
        toast.success("Project created successfully");
      }
    } catch (error) {
      toast.error("Error saving project");
    }
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen">
      <ToastContainer position="top-center" autoClose={2000} />

      <Header
        title={isEditMode ? "Edit Project" : "Create New Project"}
        subTitle="Enter project information and assign team members"
      />

      <form onSubmit={handleSubmit} className="w-full mx-auto space-y-6 p-4">
        {/* Basic Information */}
        <Card className="bg-white! border-none">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Project Name</Label>
              <TextInput
                value={name}
                required
                readOnly={!isAdmin}
                onChange={(e) => setName(e.target.value)}
                color="white"
              />
            </div>

            <div>
              <Label>Client</Label>
              <Select
                value={clientId}
                required
                disabled={!isAdmin}
                onChange={(e) => setClientId(Number(e.target.value))}
                color="white"
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

            <div>
              <Label>Status</Label>
              <Select
                value={status}
                required
                onChange={(e) => setStatus(e.target.value)}
                color="white"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
            </div>

            <div>
              <Label>Total Budget</Label>
              <TextInput
                type="number"
                value={totalPrice}
                readOnly={!isAdmin}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
                color="white"
              />
            </div>

            <div>
              <Label>Amount Paid</Label>
              <TextInput
                type="number"
                value={amountPaid}
                readOnly={!isAdmin}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
                color="white"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                value={description}
                readOnly={!isAdmin}
                onChange={(e) => setDescription(e.target.value)}
                color="white"
              />
            </div>
          </div>
        </Card>

        {/* Assign Users */}
        {isAdmin && (
          <Card className="bg-white! border-none">
            <h3 className="text-lg font-semibold mb-2">Assign Team Members</h3>

            <div className="flex flex-col gap-4">
              {users.map(({ id, name, role }) => (
                <label
                  key={id}
                  className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer"
                >
                  <Checkbox
                    disabled={!isAdmin}
                    checked={userIds.includes(id)}
                    onChange={(e) =>
                      setUserIds((prev) =>
                        e.target.checked
                          ? [...prev, id]
                          : prev.filter((uid) => uid !== id)
                      )
                    }
                  />
                  <div className="font-medium">
                    {name}
                    <div className="text-xs text-gray-500">{role}</div>
                  </div>
                </label>
              ))}
            </div>
          </Card>
        )}

        <div className="flex justify-end">
          <Button type="submit">
            {isEditMode ? (
              <>
                <HiPencil className="mr-2" /> Update Project
              </>
            ) : (
              <>
                <HiPlus className="mr-2" /> Create Project
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
