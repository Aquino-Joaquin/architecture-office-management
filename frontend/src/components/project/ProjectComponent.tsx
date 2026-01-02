import type { Project } from "../../types/Project";
import TableComponent from "../common/TableComponent";
import ProjectRowComponent from "./ProjectRowComponent";
import Header from "../common/Header";
import { api } from "../../helper/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../../helper/checkAdmin";

const titles: string[] = [
  "Id",
  "Name",
  "Status",
  "Total Price",
  "Amount Paid",
  "Client Name",
  "Actions",
];
export default function ProjectComponent() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

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
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error("Error deleting project");
    }
  }
  function handleEdit(id: number) {
    navigate(`editproject/${id}`);
  }
  return (
    <div>
      <Header
        title={"Projects"}
        subTitle={"Here you can see all the projects"}
        buttonTitle={"Add new project"}
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
