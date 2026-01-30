import { Card } from "flowbite-react";
import { MdContacts, MdEmail, MdPhone } from "react-icons/md";
import { useEffect, useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../../helper/api";
import type { Client } from "../../types/Client";
import Header from "../common/Header";
import { showErrors } from "../../helper/showError";
import { useTranslation } from "react-i18next";
import { Status } from "../../types/Status";
import ConfirmationDelete from "../common/ConfirmationDelete";

export default function ClientComponent() {
  const [clients, setClients] = useState<Client[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const navigate = useNavigate();
  const { t } = useTranslation(["client", "successToast"]);

  async function fetchClient() {
    await api.get("clients").then((res) => setClients(res.data));
  }

  async function handleDelete(id: number) {
    try {
      await api.request({
        url: `clients/${id}`,
        method: "delete",
      });
      toast.success(t("successToast:clientDelete"));
      fetchClient();
    } catch (error) {
      showErrors(error);
    }
  }

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen">
      <Header
        title={t("title")}
        subTitle={t("subTitle")}
        buttonTitle={t("buttonTitle")}
        buttonPath="newclient"
        showButton={true}
      />

      <div className="grid w-full grid-cols-1 gap-6 mb-6 md:grid-cols-2 xl:grid-cols-3 ">
        {clients.map(({ id, name, companyName, email, phone, projects }) => (
          <Card
            key={id}
            className="w-full shadow-sm hover:shadow-md transition-shadow bg-white! border-none rounded-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <MdContacts className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {name}
                    </h3>
                    {companyName && (
                      <p className="text-sm text-gray-500 mt-1">
                        {companyName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`editClient/${id}`)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit Client"
                  >
                    <HiPencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setConfirmAction(() => () => handleDelete(id));
                      setOpenDelete(true);
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Client"
                  >
                    <HiTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {email && (
                  <div className="flex items-center text-gray-600">
                    <MdEmail className="h-5 w-5 mr-3 text-gray-400" />
                    <span className="text-sm truncate">{email}</span>
                  </div>
                )}

                <div className="flex items-center text-gray-600">
                  <MdPhone className="h-5 w-5 mr-3 text-gray-400" />
                  <span className="text-sm">{phone}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    {t("activeProjects")}
                  </span>
                  <span className="text-lg font-semibold text-gray-900 mt-1">
                    {projects?.filter(
                      (project) => project.status !== Status.COMPLETED,
                    ).length || 0}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
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
