import {
  Button,
  Card,
  Checkbox,
  Label,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { HiPlus, HiPencil } from "react-icons/hi";
import Header from "../common/Header";
import { api } from "../../helper/api";
import type { User } from "../../types/User";
import type { Client } from "../../types/Client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { checkAdmin } from "../../helper/checkAdmin";
import { Status } from "../../types/Status";
import type { Milestone } from "../../types/Milestone";
import TableComponent from "../common/TableComponent";
import MilestoneRowComponent from "./MilestoneRowComponent";
import { showErrors } from "../../helper/showError";
import { useTranslation } from "react-i18next";
import ConfirmationDelete from "../common/ConfirmationDelete";

export default function AddNewProjectComponent() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const navigate = useNavigate();
  const isAdmin = checkAdmin();
  const { t } = useTranslation([
    "project",
    "milestone",
    "successToast",
    "badgeStatus",
  ]);

  const milestoneTitles = [
    t("milestone:tableMilestoneTitle"),
    t("milestone:tableMilestoneDescription"),
    t("milestone:tableMilestoneStatus"),
    t("milestone:tableMilestoneActions"),
  ];

  const [isEditMilestone, setIsEditMilestone] = useState(false);
  const [editMilestoneId, setEditMilestoneId] = useState(0);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status | "">("");
  const [totalPrice, setTotalPrice] = useState<number | string>("");
  const [amountPaid, setAmountPaid] = useState<number | string>("");
  const [clientId, setClientId] = useState<number | string>("");
  const [userIds, setUserIds] = useState<number[]>([]);

  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [milestoneArray, setMilestoneArray] = useState<Milestone[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  async function handleMilestoneAdd(isEditing: boolean) {
    try {
      setIsUploading(true);
      if (!isEditing) {
        await api.post("milestones", {
          title: milestoneTitle,
          description: milestoneDescription,
          projectId: Number(id),
        });
        toast.success(t("successToast:createMilestone"));
      }
      if (isEditing) {
        await api.patch(`milestones/${editMilestoneId}`, {
          title: milestoneTitle,
          description: milestoneDescription,
        });
        toast.success(t("successToast:editMilestone"));
        setIsEditMilestone(false);
        setEditMilestoneId(0);
      }
      fetchMilestones();
      setMilestoneTitle("");
      setMilestoneDescription("");
    } catch (error) {
      showErrors(error);
    } finally {
      setIsUploading(false);
    }
  }
  async function handleMilestoneDelete(milestoneId: number) {
    try {
      await api.delete(`milestones/${milestoneId}`);
      fetchMilestones();
      toast.success(t("successToast:deleteMilestone"));
    } catch (error) {
      showErrors(error);
    }
  }

  async function handleMilestoneEdit(milestoneId: number) {
    const editMilestone = milestoneArray.find((m) => m.id === milestoneId);
    if (editMilestone) {
      setMilestoneTitle(editMilestone.title);
      setMilestoneDescription(editMilestone.description);
      setIsEditMilestone(true);
      setEditMilestoneId(milestoneId);
    }
  }

  async function fetchMilestones() {
    const res = await api.get(`milestones/projects/${id}`);
    setMilestoneArray(res.data);
  }

  async function fetchUsers() {
    const res = await api.get("users");
    setUsers(res.data);
  }

  async function fetchClients() {
    const res = await api.get("clients");
    setClients(res.data);
  }

  async function fetchProject() {
    const res = await api.get(`projects/${id}`);
    const project = res.data;

    setName(project.name);
    setDescription(project.description);
    setStatus(project.status);
    setTotalPrice(project.totalPrice);
    setAmountPaid(project.amountPaid);
    setClientId(project.client.id);
    setUserIds(project.users.map((u: User) => u.id));
  }

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
      fetchClients();
    }

    if (isEditMode && id) {
      fetchProject();
      fetchMilestones();
    }
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!clientId) {
      toast.warning("Please select a client");
      return;
    }

    const payload = {
      name,
      description,
      status,
      totalPrice,
      amountPaid,
      clientId: Number(clientId),
      userIds,
    };

    try {
      if (isEditMode) {
        await api.patch(`projects/${id}`, payload);
        toast.success(t("successToast:editProject"));
      } else {
        await api.post("projects", payload);
        toast.success(t("successToast:createProject"));
      }
      navigate(-1);
    } catch (error) {
      showErrors(error);
    }
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header
        title={isEditMode ? t("editProject") : t("createProject")}
        subTitle={t("createEditSubTitle")}
        showBackButton={true}
      />

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        <Card className="bg-white! border-none shadow shadow-gray-400">
          <h3 className="text-lg font-semibold ">{t("basicInfomation")}</h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Project Name</Label>
              <TextInput
                value={name}
                required
                placeholder={t("holderProjectName")}
                readOnly={!isAdmin}
                onChange={(e) => setName(e.target.value)}
                color="white"
              />
            </div>

            <div>
              <Label>Client</Label>
              <Select
                value={clientId}
                required
                disabled={!isAdmin}
                onChange={(e) => setClientId(Number(e.target.value))}
                color="white"
              >
                <option value="" disabled>
                  {t("holderSelectClient")}
                </option>
                {clients.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select
                value={status}
                required
                onChange={(e) => setStatus(e.target.value as Status)}
                color="white"
              >
                <option value="" disabled>
                  {t("holderSelectStatus")}
                </option>
                <option value={Status.PLANNING}>
                  {t("badgeStatus:Planning")}
                </option>
                <option value={Status.IN_PROGRESS}>
                  {t("badgeStatus:InProgress")}
                </option>
                <option value={Status.COMPLETED}>
                  {t("badgeStatus:Completed")}
                </option>
              </Select>
            </div>

            <div>
              <Label>Total Budget</Label>
              <TextInput
                type="number"
                placeholder={t("holderTotalBudget")}
                value={totalPrice}
                readOnly={!isAdmin}
                onChange={(e) => setTotalPrice(Number(e.target.value))}
                color="white"
              />
            </div>

            <div>
              <Label>Amount Paid</Label>
              <TextInput
                type="number"
                placeholder={t("holderAmountPaid")}
                value={amountPaid}
                readOnly={!isAdmin}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
                color="white"
              />
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                rows={4}
                placeholder={t("holderDescription")}
                value={description}
                readOnly={!isAdmin}
                onChange={(e) => setDescription(e.target.value)}
                color="white"
              />
            </div>
          </div>
        </Card>

        {isAdmin && (
          <Card className="bg-white! border-none">
            <h3 className="text-lg font-semibold mb-2">
              {t("titleAssingTeam")}
            </h3>

            <div className="flex flex-col gap-4">
              {users.map(({ id, name, role }) => (
                <label
                  key={id}
                  className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer"
                >
                  <Checkbox
                    disabled={!isAdmin}
                    checked={userIds.includes(id)}
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
        {isEditMode && isAdmin && (
          <Card className="bg-white! border-none">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{t("milestone:title")}</h3>

              <Button
                type="button"
                disabled={isUploading}
                onClick={() => handleMilestoneAdd(isEditMilestone)}
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <Spinner size="sm" />
                    {t("milestone:uploading")}
                  </div>
                ) : (
                  <>
                    <HiPlus className="mr-2" />
                    {t("milestone:buttonTitle")}
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 -mt-7">
              <div className="md:col-span-2">
                <Label>Milestone Title</Label>
                <TextInput
                  value={milestoneTitle}
                  placeholder={t("milestone:holderMilestoneTitle")}
                  readOnly={!isAdmin}
                  onChange={(e) => setMilestoneTitle(e.target.value)}
                  color="white"
                />
              </div>
              <div className="md:col-span-2 -mt-5">
                <Label>Milestone Description</Label>
                <Textarea
                  rows={4}
                  placeholder={t("milestone:holderMilestoneDescription")}
                  value={milestoneDescription}
                  readOnly={!isAdmin}
                  onChange={(e) => setMilestoneDescription(e.target.value)}
                  color="white"
                />
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <TableComponent<Milestone>
                titles={milestoneTitles}
                rows={milestoneArray}
                renderRow={(milestone) => (
                  <MilestoneRowComponent
                    key={milestone.id}
                    milestone={milestone}
                    handleDelete={() => {
                      setConfirmAction(
                        () => () => handleMilestoneDelete(milestone.id),
                      );
                      setOpenDelete(true);
                    }}
                    handleEdit={handleMilestoneEdit}
                    canDoActions={isAdmin}
                  />
                )}
                filterFn={(milestoneArray, search) =>
                  milestoneArray.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                }
                searchPlaceHolder={t("milestone:search")}
              />
            </div>
          </Card>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                {t("uploading")}
              </div>
            ) : isEditMode ? (
              <>
                <HiPencil className="mr-2" /> {t("buttonEdit")}
              </>
            ) : (
              <>
                <HiPlus className="mr-2" /> {t("buttonCreate")}
              </>
            )}
          </Button>
        </div>
      </form>
      <ConfirmationDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={async () => {
          await confirmAction?.();
          setOpenDelete(false);
        }}
        description={t("milestone:deleteDescription")}
        yes={t("milestone:yesOption")}
        no={t("milestone:noOption")}
      />
    </div>
  );
}
