import {
  Card,
  Label,
  TextInput,
  Button,
  Select,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { HiPencil, HiPlus } from "react-icons/hi";
import type { Project } from "../../types/Project";
import type { Expense } from "../../types/Expense";
import Header from "../common/Header";
import { api } from "../../helper/api";
import type { ExpenseType } from "../../types/ExpenseType";

export default function CreateExpenseComponent() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState<number | "">("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [expenseTypeId, setExpenseTypeId] = useState<number | "">("");
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);

  const { id } = useParams();
  const isEditMode = Boolean(id);

  async function fetchProjects() {
    const res = await api.get("projects");
    setProjects(res.data);
  }
  async function fetchExpenseTypes() {
    const res = await api.get("expense-types");
    setExpenseTypes(res.data);
  }

  async function fetchExpense(expenseId: string) {
    const res = await api.get<Expense>(`expenses/${expenseId}`);
    const expense = res.data;

    setAmount(expense?.amount);
    setDescription(expense.description);
    if (expense.project) {
      setProjectId(expense.project.id);
    }
    if (expense.expenseType) {
      setExpenseTypeId(expense.expenseType.id);
    }
  }

  useEffect(() => {
    fetchProjects();
    fetchExpenseTypes();
  }, []);

  useEffect(() => {
    if (isEditMode && id && projects.length > 0 && expenseTypes.length > 0) {
      fetchExpense(id);
    }
  }, [id, projects, expenseTypes]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isEditMode && !projectId) {
      toast.warning("Please select a project");
      return;
    }

    const payload = {
      amount,
      description,
      expenseTypeId: Number(expenseTypeId),
      projectId: Number(projectId),
    };
    console.log(payload);
    try {
      if (isEditMode) {
        await api.patch(`expenses/${id}`, payload);
        toast.success("Expense updated successfully");
      } else {
        await api.post("expenses", payload);
        toast.success("Expense created successfully");
      }

      navigate(-1);
    } catch (error) {
      toast.error("Error expense");
    }
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen">
      <Header
        title={isEditMode ? "Edit Expense" : "Create New Expense"}
        subTitle="Enter expense information "
      />
      <form onSubmit={handleSubmit} className="w-full mx-auto space-y-6 p-4">
        <Card className="bg-white! border-none">
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Expense amount</Label>
              <TextInput
                value={amount}
                type="number"
                placeholder="Expense amount"
                required
                onChange={(e) => setAmount(Number(e.target.value))}
                color="white"
              />
            </div>

            <div>
              <Label>Project</Label>
              <Select
                value={projectId}
                required={!isEditMode}
                onChange={(e) => setProjectId(Number(e.target.value))}
                color="white"
              >
                <option value="" disabled>
                  Select a project
                </option>
                {projects.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label>Type</Label>
              <Select
                value={expenseTypeId}
                required={!isEditMode}
                onChange={(e) => setExpenseTypeId(Number(e.target.value))}
                color="white"
              >
                <option value="" disabled>
                  Select status
                </option>
                {expenseTypes.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                placeholder="Expense description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                color="white"
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">
            {isEditMode ? (
              <>
                <HiPencil className="mr-2" /> Update Expense
              </>
            ) : (
              <>
                <HiPlus className="mr-2" /> Create Expense
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
