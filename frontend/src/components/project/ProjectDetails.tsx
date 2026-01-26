import type { CardInfomation } from "../../types/CardInformation";
import {
  HiDocumentText,
  HiOutlineCurrencyDollar,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlineTrendingUp,
  HiOutlineUpload,
} from "react-icons/hi";
import TableComponent from "../common/TableComponent";
import type { Expense } from "../../types/Expense";
import ExpenseRowComponent from "../expense/ExpenseRowComponent";
import Header from "../common/Header";
import { Badge, Button, Card, Progress } from "flowbite-react";
import { api } from "../../helper/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Project } from "../../types/Project";
import { toast } from "react-toastify";
import { checkAdmin } from "../../helper/checkAdmin";
import { LuTarget } from "react-icons/lu";
import type { Milestone } from "../../types/Milestone";
import { showErrors } from "../../helper/showError";
import { useTranslation } from "react-i18next";
import type { Document } from "../../types/Document";
import { formatDateDMY } from "../../helper/formatDateDMY";

export default function ProjectDetails() {
  const [project, setProject] = useState<Project>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [docs, setDocs] = useState<Document[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation(["projectDetails", "expense"]);

  const titles: string[] = [
    "Id",
    t("expense:tableExpenseDescription"),
    t("expense:tableExpenseCreatedAt"),
    t("expense:tableExpenseType"),
    t("expense:tableExpenseProject"),
    t("expense:tableExpenseAmount"),
  ];

  const isAdmin = checkAdmin();
  const finalTitles = isAdmin
    ? [...titles, t("expense:tableExpenseActions")]
    : titles;

  async function fetchProject(id: number) {
    await api.get(`projects/${id}`).then((res) => setProject(res.data));
  }

  async function fetchExpenses(projectId: number) {
    const res = (await api.get<Expense[]>("expenses")).data;

    setExpenses(res.filter((expense) => expense.project?.id === projectId));
  }
  async function fetchMilestones(projectId: number) {
    const res = (await api.get<Milestone[]>(`milestones/projects/${projectId}`))
      .data;
    setMilestones(res);
  }
  async function fetchDocuments(projectId: number) {
    const res = (await api.get<Document[]>(`documents/projects/${projectId}`))
      .data;
    setDocs(res);
  }

  async function handleDelete(id: number) {
    try {
      await api.request({
        url: `expenses/${id}`,
        method: "delete",
      });
      toast.success("Expense deleted successfully");
      fetchExpenses(id);
    } catch (error) {
      showErrors(error);
    }
  }
  function handleEdit(id: number) {
    navigate(`editexpense/${id}`);
  }
  function handleMilestone(milestoneId: number) {
    navigate(`milestones/tasks/${milestoneId}`);
  }
  function handleUploadDocument() {
    navigate("documents");
  }
  function handleDownloadDocument(documentId: number) {
    const doc = docs.find((d) => d.id === documentId);
    if (!doc) return;

    const link = window.document.createElement("a");
    link.href = doc.url;
    link.download = doc.title || "document";
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  }
  async function handleDeleteDocument(documentId: number) {
    try {
      await api.delete(`documents/${documentId}`);
      toast.success("Deleted successfully");
      fetchDocuments(Number(id));
    } catch (error) {
      showErrors(error);
    }
  }

  const projecInformation: CardInfomation[] = [
    {
      title: t("budget"),
      value: project?.totalPrice || 0,
      Icon: HiOutlineCurrencyDollar,
    },
    {
      title: t("paid"),
      value: project?.amountPaid || 0,
      Icon: HiOutlineTrendingUp,
    },
    {
      title: t("remaning"),
      value: project ? project?.totalPrice - project?.amountPaid : 0,
      Icon: HiOutlineCurrencyDollar,
    },
  ];
  useEffect(() => {
    fetchProject(Number(id));
    fetchExpenses(Number(id));
    fetchMilestones(Number(id));
    fetchDocuments(Number(id));
  }, [id]);

  const budget = project?.totalPrice || 0;
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );
  const remaining = budget - totalExpense;

  const percentage =
    budget > 0 ? Math.min((totalExpense / budget) * 100, 100) : 0;

  return (
    <div>
      <Header title={t("title")} subTitle={t("subtitle")} />

      <div className="grid w-full grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-3">
        {projecInformation.map(({ title, value, Icon }, index) => (
          <Card
            key={index}
            className="w-full shadow-sm hover:shadow-md transition-shadow bg-white! border-none"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black ">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {value}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600 ">
                {Icon && <Icon className="w-6 h-6" />}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="p-4 w-full bg-gray-50 ">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <Card className="bg-white! border-none shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t("projectInformation")}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    {t("description")}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {project?.description}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-white! border-none shadow-sm h-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("budgetOverview")}
              </h3>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {t("budgetUsage")}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {`${percentage}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    {t("totalBudget")}
                  </p>
                  <p className="text-lg font-bold text-gray-900">{budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    {t("totalSpent")}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {totalExpense}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    {t("totalRemaning")}
                  </p>
                  <p className="text-lg font-bold text-gray-900">{remaining}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="bg-white! border-none shadow-sm h-full">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {t("teamMember")}
                </h3>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                {project?.users &&
                  project?.users.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                        {member.name.charAt(0)}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="p-4 w-full bg-gray-50 ">
        <Card className="bg-white! border-none shadow-sm h-full">
          <div className="flex items-center gap-2 mb-4">
            <LuTarget className="text-gray-600" />
            <h2 className="text-lg font-semibold">{t("milestones")}</h2>
          </div>
          <div>
            {milestones &&
              milestones.map((milestone) => (
                <Card
                  key={milestone.id}
                  onClick={() => handleMilestone(milestone.id)}
                  className="bg-white! border-none shadow-md mb-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{milestone.title}</h3>
                    <Badge color="info">in-progress</Badge>
                  </div>

                  <p className="text-sm text-gray-500">
                    {milestone.description}
                  </p>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {milestone.tasks.length > 0
                          ? Math.round(
                              Math.min(
                                (milestone.tasks.filter(
                                  (task) => task.completed === true,
                                ).length /
                                  milestone.tasks.length) *
                                  100,
                                100,
                              ),
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <Progress
                      color="green"
                      progress={
                        milestone.tasks.length > 0
                          ? Math.round(
                              Math.min(
                                (milestone.tasks.filter(
                                  (task) => task.completed === true,
                                ).length /
                                  milestone.tasks.length) *
                                  100,
                                100,
                              ),
                            )
                          : 0
                      }
                    />
                  </div>
                </Card>
              ))}
          </div>
        </Card>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 pl-3">
            {t("projectExpense")}
          </h2>
        </div>

        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <TableComponent<Expense>
            titles={finalTitles}
            rows={expenses}
            renderRow={(expense) => (
              <ExpenseRowComponent
                key={expense.id}
                expense={expense}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                canDoActions={isAdmin}
              />
            )}
          />
        </div>
      </div>
      <Card className="mt-10 w-full mx-auto shadow-none border-gray-200 bg-white! border-none">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HiDocumentText className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Project Documents
            </h2>
          </div>
          <Button
            className="border-blue-600 text-white! hover:bg-blue-50"
            onClick={handleUploadDocument}
          >
            <HiOutlineUpload className="mr-2 h-5 w-5" />
            Upload Document
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="group flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 transition-all duration-200"
            >
              <div
                className={`p-3 mr-4 rounded-lg ${doc.type === "design" ? "bg-blue-50" : "bg-red-50"}`}
              >
                {<HiDocumentText />}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">
                  {doc.title}
                </h4>
                <div className="flex flex-wrap items-center mt-1 gap-3 text-xs text-gray-500">
                  <Badge
                    color="blue"
                    size="sm"
                    className="px-2 py-0.5 rounded-full lowercase"
                  >
                    {doc.type}
                  </Badge>
                  <span>Uploaded by {doc.user.name}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{formatDateDMY(doc.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => handleDownloadDocument(doc.id)}
                >
                  <HiOutlineDownload className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  onClick={() => handleDeleteDocument(doc.id)}
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
