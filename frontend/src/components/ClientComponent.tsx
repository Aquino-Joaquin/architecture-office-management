import { Card } from "flowbite-react";
import type { Client } from "../types/Client";
import { MdContacts, MdEmail, MdPhone } from "react-icons/md";
import { api } from "../helper/api";
import { useEffect, useState } from "react";
import Header from "./common/Header";
import { HiPencil, HiTrash } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ClientComponent() {
  const [clients, setClients] = useState<Client[]>([]);
  const navigate = useNavigate();

  async function fetchClient() {
    await api.get("clients").then((res) => setClients(res.data));
  }

  async function handleDelete(id: number) {
    try {
      await api.request({
        url: `clients/${id}`,
        method: "delete",
      });
      toast.success("Client deleted successfully");
      fetchClient();
    } catch (error) {
      toast.error("Error deleting client");
    }
  }

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <Header
        title={"Clients"}
        subTitle={"Here you can see all the Clients"}
        buttonTitle={"Add new client"}
        buttonPath="newclient"
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
                    onClick={() => handleDelete(id)}
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
                    Active Projects
                  </span>
                  <span className="text-lg font-semibold text-gray-900 mt-1">
                    {projects?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
