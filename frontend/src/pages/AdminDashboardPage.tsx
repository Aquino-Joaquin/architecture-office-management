import { VscFileSubmodule } from "react-icons/vsc";
import AdminDashboard from "../components/AdminDashboard";
import type { CardInfomation } from "../types/CardInformation";
import type { Project } from "../types/Project";
import { FiUsers } from "react-icons/fi";
import { GiExpense, GiMoneyStack } from "react-icons/gi";
import type { Expense } from "../types/Expense";
import { useEffect, useState } from "react";
import { api } from "../helper/api";
import type { Client } from "../types/Client";
import { useTranslation } from "react-i18next";

export default function AdminDashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const { t } = useTranslation("adminDashboard");

  async function fetchExpenses() {
    await api.get("expenses").then((res) => setExpenses(res.data));
  }

  async function fetchProjects() {
    await api.get("projects").then((res) => setProjects(res.data));
  }

  async function fetchClients() {
    await api.get("clients").then((res) => setClients(res.data));
  }

  useEffect(() => {
    fetchExpenses();
    fetchProjects();
    fetchClients();
  }, []);

  const activeProjects = projects.length;
  const clientNumber = clients.length;
  const generalBudget = projects.reduce(
    (count, project) => count + project.amountPaid,
    0
  );
  const generalExpense = expenses.reduce(
    (count, expense) => count + expense.amount,
    0
  );

  const cardInformations: CardInfomation[] = [
    {
      title: t("activeProjects"),
      value: activeProjects,
      Icon: VscFileSubmodule,
    },
    {
      title: t("clients"),
      value: clientNumber,
      Icon: FiUsers,
    },
    {
      title: t("budget"),
      value: generalBudget,
      Icon: GiMoneyStack,
    },
    {
      title: t("expenses"),
      value: generalExpense,
      Icon: GiExpense,
    },
  ];

  return (
    <AdminDashboard
      itemsInformation={cardInformations}
      itemsProjects={projects}
      itemsExpenses={expenses}
    />
  );
}
