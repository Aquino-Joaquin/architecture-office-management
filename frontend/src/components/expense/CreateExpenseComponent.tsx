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
import { showErrors } from "../../helper/showError";
import { useTranslation } from "react-i18next";

export default function CreateExpenseComponent() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [expenseTypeId, setExpenseTypeId] = useState<string>("");
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);

  const { t } = useTranslation(["expense", "successToast", "errors"]);

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
      setProjectId(String(expense.project.id));
    }
    if (expense.expenseType) {
      setExpenseTypeId(String(expense.expenseType.id));
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
      toast.warning(t("errors:expense.projectId.number"));
      return;
    }

    const payload = {
      amount,
      description,
      expenseTypeId: expenseTypeId ? Number(expenseTypeId) : null,
      projectId: projectId ? Number(projectId) : null,
    };
    try {
      if (isEditMode) {
        await api.patch(`expenses/${id}`, payload);
        toast.success(t("successToast:editExpense"));
      } else {
        await api.post("expenses", payload);
        toast.success("succesToast:createExpense");
      }

      navigate(-1);
    } catch (error) {
      showErrors(error);
    }
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header
        title={isEditMode ? t("editExpense") : t("createExpense")}
        subTitle={t("createSubtitle")}
        showBackButton={true}
      />
      <form onSubmit={handleSubmit} className="w-full">
        <Card className="bg-white! border-none shadow shadow-gray-400">
          <h3 className="text-lg font-semibold mb-2">
            {t("basicInformation")}
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Expense amount</Label>
              <TextInput
                value={amount}
                type="number"
                placeholder={t("holderExpenseAmount")}
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
                onChange={(e) => setProjectId(e.target.value)}
                color="white"
              >
                <option value="" disabled>
                  {t("holderSelectProject")}
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
                onChange={(e) => setExpenseTypeId(e.target.value)}
                color="white"
              >
                <option value="" disabled>
                  {t("holderSelectType")}
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
                placeholder={t("holderExpenseDescription")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                color="white"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">
              {isEditMode ? (
                <>
                  <HiPencil className="mr-2" /> {t("editButton")}
                </>
              ) : (
                <>
                  <HiPlus className="mr-2" /> {t("createButton")}
                </>
              )}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
