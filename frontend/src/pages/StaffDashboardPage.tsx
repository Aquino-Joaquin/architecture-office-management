import { VscFileSubmodule } from "react-icons/vsc";
import type { CardInfomation } from "../types/CardInformation";
import type { Project } from "../types/Project";
import { FiUsers } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { useEffect, useState } from "react";
import { api } from "../helper/api";
import StaffDashboard from "../components/StaffDashboard";
import type { Task } from "../types/Task";

export default function StaffDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  async function fetchProjects() {
    await api.get("projects").then((res) => setProjects(res.data));
  }
  async function fetchTasks(userId: number) {
    const res: Task[] = (await api.get(`tasks/users/${userId}`)).data;
    const activeTasks = res.filter((task) => !task.completed);
    setTasks(activeTasks);
  }
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;

  useEffect(() => {
    fetchProjects();
    fetchTasks(userId);
  }, []);

  const activeProjects = projects.length;
  const inProgressNumber = projects.filter(
    (project) => project.status === "In Progress"
  ).length;
  const completedNumber = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const cardInformations: CardInfomation[] = [
    {
      title: "My Projects",
      value: activeProjects,
      Icon: VscFileSubmodule,
    },
    {
      title: "In Progress",
      value: inProgressNumber,
      Icon: FiUsers,
    },
    {
      title: "Completed",
      value: completedNumber,
      Icon: GiMoneyStack,
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
