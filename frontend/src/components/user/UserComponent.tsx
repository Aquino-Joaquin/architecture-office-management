import { Card } from "flowbite-react";
import {
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/User";
import type { CardInfomation } from "../../types/CardInformation";
import { api } from "../../helper/api";
import Header from "../common/Header";
import TableComponent from "../common/TableComponent";
import UserRowComponent from "./UserRowComponent";
import { useTranslation } from "react-i18next";
import { showErrors } from "../../helper/showError";
import ConfirmationDelete from "../common/ConfirmationDelete";

export default function UserComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [usersInformation, setUsersInfomation] = useState<CardInfomation[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const navigate = useNavigate();
  const { t } = useTranslation(["user", "successToast"]);
  const titles: string[] = [
    t("tableUserName"),
    t("tableUserEmail"),
    t("tableUserRole"),
    t("tableUserProjects"),
    t("tableUserActions"),
  ];

  async function fetchUser() {
    const res = await api.get<User[]>("users");
    const data = res.data;

    setUsers(data);

    setUsersInfomation([
      {
        title: t("totalUser"),
        value: data.length.toString(),
        Icon: HiOutlineUsers,
      },
      {
        title: t("admins"),
        value: data.filter((u) => u.role === "Admin").length.toString(),
        Icon: HiOutlineShieldCheck,
      },
      {
        title: t("staff"),
        value: data.filter((u) => u.role === "Staff").length.toString(),
        Icon: HiOutlineBriefcase,
      },
    ]);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function handleDelete(id: number) {
    try {
      await api.request({
        url: `users/${id}`,
        method: "delete",
      });
      toast.success(t("successToast:deleteUser"));
      fetchUser();
    } catch (error) {
      showErrors(error);
    }
  }
  function handleEdit(id: number) {
    navigate(`editUser/${id}`);
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header
        title={t("title")}
        subTitle={t("subTitle")}
        buttonTitle={t("buttonTitle")}
        buttonPath="newuser"
        showButton={true}
      />
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {usersInformation.map(({ title, value, Icon }, index) => (
          <Card
            key={index}
            className="w-full shadow-sm shadow-gray-400 hover:shadow-md transition-shadow bg-white! border-none"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {value}
                </h3>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                {Icon && <Icon className="w-6 h-6" />}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="rounded-2xl shadow-sm shadow-gray-400 bg-white">
        <TableComponent<User>
          titles={titles}
          rows={users}
          tabs={[t("allUsers"), "Admin", "Staff"]}
          renderRow={(user) => (
            <UserRowComponent
              key={user.id}
              user={user}
              handleEdit={handleEdit}
              handleDelete={() => {
                setConfirmAction(() => () => handleDelete(user.id));
                setOpenDelete(true);
              }}
            />
          )}
          filterFn={(users, search, activeTab) => {
            const matchesSearch = users.name
              .toLowerCase()
              .includes(search.toLowerCase());

            const matchesTab =
              activeTab === t("allUsers") || users.role === activeTab;

            return matchesSearch && matchesTab;
          }}
          searchPlaceHolder={t("search")}
        />
      </div>

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
