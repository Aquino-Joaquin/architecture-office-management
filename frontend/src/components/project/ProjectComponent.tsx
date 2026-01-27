import type { Project } from "../../types/Project";
import TableComponent from "../common/TableComponent";
import ProjectRowComponent from "./ProjectRowComponent";
import Header from "../common/Header";
import { api } from "../../helper/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../../helper/checkAdmin";
import { showErrors } from "../../helper/showError";
import { useTranslation } from "react-i18next";

export default function ProjectComponent() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const { t } = useTranslation(["project", "successToast"]);

  const titles: string[] = [
    t("tableId"),
    t("tableName"),
    t("tableStatus"),
    t("tableTotalPrice"),
    t("tableAmountPaid"),
    t("tableClientName"),
    t("tableActions"),
  ];

  const isAdmin = checkAdmin();
  function fetchProjects() {
    api.get("projects").then((res) => setProjects(res.data));
  }
  useEffect(() => {
    fetchProjects();
  }, []);
  async function handleDelete(id: number) {
    try {
      await api.request({
        url: `projects/${id}`,
        method: "delete",
      });
      toast.success(t("successToast:deleteProject"));
      fetchProjects();
    } catch (error) {
      showErrors(error);
    }
  }
  function handleEdit(id: number) {
    navigate(`editproject/${id}`);
  }
  return (
    <div>
      <Header
        title={t("title")}
        subTitle={t("subTitle")}
        buttonTitle={t("buttonTitle")}
        buttonPath="newproject"
        showButton={isAdmin}
      />
      <div className="overflow-x-auto">
        <TableComponent<Project>
          titles={titles}
          rows={projects}
          renderRow={(project) => (
            <ProjectRowComponent
              key={project.id}
              project={project}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              actionDelete={isAdmin}
            />
          )}
        />
      </div>
    </div>
  );
}
