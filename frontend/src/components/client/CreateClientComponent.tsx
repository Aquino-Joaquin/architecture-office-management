import { Card, Label, TextInput, Button } from "flowbite-react";
import { HiUserAdd } from "react-icons/hi";
import Header from "../common/Header";
import { useEffect, useState } from "react";
import { api } from "../../helper/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { showErrors } from "../../helper/showError";
import { useTranslation } from "react-i18next";

export default function CreateClientComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation("client");

  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!id) return;
    api.get(`clients/${id}`).then((res) => {
      const client = res.data;
      setName(client.name);
      setEmail(client.email);
      setPhone(client.phone);
      setCompanyName(client.companyName);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.request({
        url: isEditMode ? `clients/${id}` : "clients",
        method: isEditMode ? "patch" : "post",
        data: {
          name,
          email: email.trim() === "" ? null : email,
          phone,
          companyName,
        },
      });
      toast.success(
        isEditMode
          ? "Client edited successfully"
          : "Client created successfully"
      );
      navigate(-1);
    } catch (error) {
      showErrors(error);
    }
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen">
      <Header
        title={isEditMode ? t("editTitle") : t("createTitle")}
        subTitle={t("createSubtitle")}
      />

      <div className="w-full mx-auto space-y-6">
        <Card className="bg-white! w-full border-none shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("basicInformation")}
          </h3>

          <form
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
            onSubmit={handleSubmit}
          >
            <div className="md:col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder={t("holderClientName")}
                value={name}
                required
                color="white"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="companyName" />
              </div>
              <TextInput
                id="companyName"
                type="text"
                placeholder={t("holderClientCompany")}
                value={companyName}
                color="white"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder={t("holderClientEmail")}
                value={email}
                icon={() => <span className="text-gray-500">@</span>}
                color="white"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" />
              </div>
              <TextInput
                id="phone"
                type="tel"
                value={phone}
                placeholder={t("holderClientPhone")}
                required
                color="white"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="md:col-span-2 flex justify-end mt-4">
              <Button color="blue" type="submit">
                <HiUserAdd className="mr-2 h-5 w-5" />
                {isEditMode ? t("editButton") : t("createButton")}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
