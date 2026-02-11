import {
  HiOutlineBriefcase,
  HiOutlineShieldCheck,
  HiOutlineUsers,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../../types/User";
import type { CardInfomation } from "../../types/CardInformation";
import { api } from "../../helper/api";
import Header from "../common/Header";
import TableComponent from "../common/TableComponent";
import UserRowComponent from "./UserRowComponent";
import { useTranslation } from "react-i18next";
import ConfirmationDelete from "../common/ConfirmationDelete";
import InformationGrid from "../common/InformationGrid";
import { handleDelete } from "../../helper/handleDelete";

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
      <InformationGrid information={usersInformation} columnNo={3} />
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
                setConfirmAction(() => async () => {
                  if (await handleDelete(user.id, "users", t)) {
                    fetchUser();
                  }
                });
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
