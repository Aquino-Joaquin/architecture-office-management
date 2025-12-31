import { VscFileSubmodule } from "react-icons/vsc";
import type { CardInfomation } from "../types/CardInformation";
import type { Project } from "../types/Project";
import { FiUsers } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { useEffect, useState } from "react";
import { api } from "../helper/api";
import StaffDashboard from "../components/StaffDashboard";

export default function StaffDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  async function fetchProjects() {
    await api.get("projects").then((res) => setProjects(res.data));
  }

  useEffect(() => {
    fetchProjects();
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
    />
  );
}
