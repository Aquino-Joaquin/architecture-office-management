import {
  Button,
  Card,
  Checkbox,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import { HiPencil } from "react-icons/hi";
import Header from "../common/Header";
import { api } from "../../helper/api";
import type { User } from "../../types/User";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { checkAdmin } from "../../helper/checkAdmin";
import TableComponent from "../common/TableComponent";
import TaskRowComponent from "./TaskRowComponent";
import type { Task } from "../../types/Task";
import { showErrors } from "../../helper/showError";
import { useTranslation } from "react-i18next";
import ConfirmationDelete from "../common/ConfirmationDelete";

export default function AddNewTaskComponent() {
  const { id } = useParams();
  const isAdmin = checkAdmin();
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const { t } = useTranslation(["task", "successToast"]);

  const taskTitles = isAdmin
    ? [
        t("tableTaskTitle"),
        t("tableTaskDescription"),
        t("tableTaskAssingUsers"),
        t("tableTaskStatus"),
        t("tableTaskActions"),
      ]
    : [
        t("tableTaskTitle"),
        t("tableTaskDescription"),
        t("tableTaskAssingUsers"),
        t("tableTaskStatus"),
      ];

  const [isEditTask, setIsEditTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState(0);

  const [userIds, setUserIds] = useState<number[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskArray, setTaskArray] = useState<Task[]>([]);

  async function handleMilestoneAdd(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!isEditTask) {
        await api.post("tasks", {
          title: taskTitle,
          description: taskDescription,
          milestoneId: Number(id),
          userIds: userIds,
        });
        toast.success(t("successToast:createTask"));
      }
      if (isEditTask) {
        await api.patch(`tasks/${editTaskId}`, {
          title: taskTitle,
          description: taskDescription,
          userIds: userIds,
        });
        toast.success(t("successToast:editTask"));
        setIsEditTask(false);
        setEditTaskId(0);
      }
      fetchTasks();
      setTaskTitle("");
      setTaskDescription("");
    } catch (error) {
      showErrors(error);
    }
  }
  async function handleTaskDelete(taskId: number) {
    try {
      await api.delete(`tasks/${taskId}`);
      fetchTasks();
      toast.success(t("successToast:deleteTask"));
    } catch (error) {
      showErrors(error);
    }
  }

  async function handleTaskEdit(taskId: number) {
    const editTask = taskArray.find((t) => t.id === taskId);
    if (editTask) {
      setTaskTitle(editTask.title);
      setTaskDescription(editTask.description);
      setIsEditTask(true);
      setEditTaskId(taskId);
      setUserIds(editTask.users.map((u: User) => u.id));
    }
  }

  async function handleStatusUpdate(taskId: number) {
    const editTask = taskArray.find((t) => t.id === taskId);
    if (editTask) {
      await api.patch(`tasks/${taskId}`, {
        completed: !editTask.completed,
      });
      toast.success("Status changed successfully");
      fetchTasks();
    }
  }

  async function fetchTasks() {
    const res = await api.get(`tasks/milestones/${id}`);
    setTaskArray(res.data);
  }

  async function fetchUsers() {
    const res = await api.get("users");
    setUsers(res.data);
  }

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
    if (id) {
      fetchTasks();
    }
  }, [id]);

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header
        title={isAdmin ? t("title") : t("titleStaff")}
        subTitle={isAdmin ? t("subtitle") : t("subtitleStaff")}
        showBackButton={true}
      />

      <form
        onSubmit={handleMilestoneAdd}
        className="w-full flex flex-col gap-6"
      >
        {isAdmin && (
          <Card className="bg-white! border-none shadow shadow-gray-400">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{t("basicInformation")}</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 -mt-7">
              <div className="md:col-span-2">
                <Label>Milestone Title</Label>
                <TextInput
                  value={taskTitle}
                  placeholder={t("holderTaskTitle")}
                  readOnly={!isAdmin}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  color="white"
                />
              </div>
              <div className="md:col-span-2 -mt-5">
                <Label>Milestone Description</Label>
                <Textarea
                  rows={4}
                  placeholder={t("holderTaskDescription")}
                  value={taskDescription}
                  readOnly={!isAdmin}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  color="white"
                />
              </div>
            </div>
          </Card>
        )}

        {isAdmin && (
          <Card className="bg-white! border-none">
            <h3 className="text-lg font-semibold mb-2">{t("assingTeam")}</h3>

            <div className="flex flex-col gap-4">
              {users.map(({ id, name, role }) => (
                <label
                  key={id}
                  className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer"
                >
                  <Checkbox
                    disabled={!isAdmin}
                    checked={userIds && userIds.includes(id)}
                    onChange={(e) =>
                      setUserIds((prev) =>
                        e.target.checked
                          ? [...prev, id]
                          : prev.filter((uid) => uid !== id),
                      )
                    }
                  />
                  <div className="font-medium">
                    {name}
                    <div className="text-xs text-gray-500">{role}</div>
                  </div>
                </label>
              ))}
            </div>
          </Card>
        )}
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <TableComponent<Task>
            titles={taskTitles}
            rows={taskArray}
            renderRow={(task) => (
              <TaskRowComponent
                key={task.id}
                task={task}
                handleDelete={() => {
                  setConfirmAction(() => () => handleTaskDelete(task.id));
                  setOpenDelete(true);
                }}
                handleEdit={handleTaskEdit}
                handleDoubleClick={handleStatusUpdate}
                canDoActions={isAdmin}
              />
            )}
          />
        </div>
        {isAdmin && (
          <div className="flex justify-end">
            <Button type="submit">
              {
                <>
                  <HiPencil className="mr-2" /> {t("buttonCreate")}
                </>
              }
            </Button>
          </div>
        )}
      </form>
      <ConfirmationDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={async () => {
          await confirmAction?.();
          setOpenDelete(false);
        }}
        description={t("deleteDescription")}
        yes={t("yesOption")}
        no={t("noOption")}
      />
    </div>
  );
}
