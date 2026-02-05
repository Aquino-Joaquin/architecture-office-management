import { VscProject } from "react-icons/vsc";
import type { CardInfomation } from "../types/CardInformation";
import type { Project } from "../types/Project";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { api } from "../helper/api";
import StaffDashboard from "../components/StaffDashboard";
import type { Task } from "../types/Task";
import { useTranslation } from "react-i18next";

export default function StaffDashboardPage() {
  const { t } = useTranslation("staffDashboard");
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchProjects() {
    await api.get("projects").then((res) => setProjects(res.data));
  }
  async function fetchTasks() {
    const res: Task[] = (await api.get("tasks/users")).data;
    const activeTasks = res.filter((task) => !task.completed);
    setTasks(activeTasks);
  }

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  const activeProjects = projects.length;
  const inProgressNumber = projects.filter(
    (project) => project.status === "In Progress",
  ).length;
  const completedNumber = projects.filter(
    (project) => project.status === "Completed",
  ).length;

  const cardInformations: CardInfomation[] = [
    {
      title: t("myProjects"),
      value: activeProjects.toString(),
      Icon: VscProject,
    },
    {
      title: t("inProgress"),
      value: inProgressNumber.toString(),
      Icon: FiClock,
    },
    {
      title: t("completed"),
      value: completedNumber.toString(),
      Icon: FiCheckCircle,
    },
  ];

  return (
    <StaffDashboard
      itemsInformation={cardInformations}
      itemsProjects={projects}
      itemsTasks={tasks}
    />
  );
}
