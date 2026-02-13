import type { CardInfomation } from "../../types/CardInformation";
import { HiOutlineCurrencyDollar, HiOutlineTrendingUp } from "react-icons/hi";
import TableComponent from "../common/TableComponent";
import type { Expense } from "../../types/Expense";
import ExpenseRowComponent from "../expense/ExpenseRowComponent";
import Header from "../common/Header";
import { api } from "../../helper/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Project } from "../../types/Project";
import { checkAdmin } from "../../helper/checkAdmin";
import type { Milestone } from "../../types/Milestone";
import { showErrors } from "../../helper/showError";
import { useTranslation } from "react-i18next";
import type { Document } from "../../types/Document";
import ConfirmationDelete from "../common/ConfirmationDelete";
import { handleDelete } from "../../helper/handleDelete";
import InformationGrid from "../common/InformationGrid";
import MilestoneCard from "../common/MilestoneCard";
import DocumentCard from "../common/DocumentCard";
import TeamMemberCard from "../common/TeamMemberCard";
import BudgetOverviewCard from "../common/BudgetOverviewCard";

export default function ProjectDetails() {
  const [project, setProject] = useState<Project>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [docs, setDocs] = useState<Document[]>([]);
  const [openDeleteExpense, setOpenDeleteExpense] = useState(false);
  const [confirmActionExpense, setConfirmActionExpense] = useState<
    (() => Promise<void>) | null
  >(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation([
    "projectDetails",
    "expense",
    "documents",
    "successToast",
  ]);

  const titles: string[] = [
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

  async function fetchExpenses(projectId: number) {
    const res = (await api.get<Expense[]>(`expenses/projects/${projectId}`))
      .data;
    setExpenses(res);
  }

  async function fetchDocuments(projectId: number) {
    const res = (await api.get<Document[]>(`documents/projects/${projectId}`))
      .data;
    setDocs(res);
  }
  function handleEdit(id: number) {
    navigate(`editexpense/${id}`);
  }
  const projecInformation: CardInfomation[] = [
    {
      title: t("budget"),
      value: project?.totalPrice.toLocaleString("es-Py") || "0",
      Icon: HiOutlineCurrencyDollar,
    },
    {
      title: t("paid"),
      value: project?.amountPaid.toLocaleString("es-Py") || "0",
      Icon: HiOutlineTrendingUp,
    },
    {
      title: t("remaning"),
      value: project
        ? (project?.totalPrice - project?.amountPaid).toLocaleString("es-Py")
        : "0",
      Icon: HiOutlineCurrencyDollar,
    },
  ];
  useEffect(() => {
    if (!id) return;
    Promise.all([
      api.get(`projects/${id}`),
      api.get<Expense[]>(`expenses/projects/${id}`),
      api.get<Milestone[]>(`milestones/projects/${id}`),
      api.get<Document[]>(`documents/projects/${id}`),
    ])
      .then(([projectRes, expensesRes, milestonesRes, docsRes]) => {
        setProject(projectRes.data);
        setExpenses(expensesRes.data);
        setMilestones(milestonesRes.data);
        setDocs(docsRes.data);
      })
      .catch(showErrors);
  }, [id]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header
        title={t("title")}
        subTitle={t("subtitle")}
        showBackButton={true}
      />

      <InformationGrid information={projecInformation} columnNo={3} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BudgetOverviewCard project={project!} expenses={expenses} t={t} />
        </div>

        <div className="lg:col-span-1">
          <TeamMemberCard project={project!} t={t} />
        </div>
      </div>
      <MilestoneCard milestones={milestones} t={t} />
      <div className="bg-white rounded-xl flex flex-col gap-6 shadow-sm shadow-gray-400">
        <h2 className="mt-6 text-xl font-bold tracking-tight text-gray-900 pl-6">
          {t("projectExpense")}
        </h2>

        <TableComponent<Expense>
          titles={finalTitles}
          rows={expenses}
          renderRow={(expense) => (
            <ExpenseRowComponent
              key={expense.id}
              expense={expense}
              handleDelete={() => {
                setConfirmActionExpense(() => async () => {
                  if (await handleDelete(expense.id, "expenses", t)) {
                    fetchExpenses(Number(id));
                  }
                });
                setOpenDeleteExpense(true);
              }}
              handleEdit={handleEdit}
              canDoActions={isAdmin}
            />
          )}
        />
      </div>
      <DocumentCard
        docs={docs}
        t={t}
        fetchDocuments={() => fetchDocuments(Number(id))}
      />
      <ConfirmationDelete
        open={openDeleteExpense}
        onClose={() => setOpenDeleteExpense(false)}
        onConfirm={async () => {
          await confirmActionExpense?.();
          setOpenDeleteExpense(false);
        }}
        description={t("expense:deleteDescription")}
        yes={t("expense:yesOption")}
        no={t("expense:noOption")}
      />
    </div>
  );
}
