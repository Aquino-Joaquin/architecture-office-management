import { Card, Label, TextInput, Select } from "flowbite-react";
import Header from "../common/Header";
import { useEffect, useState } from "react";
import { api } from "../../helper/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { showErrors } from "../../helper/showError";
import SubmitButton from "../common/SubmitButton";

export default function CreateUserComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { t } = useTranslation(["user", "successToast"]);
  const [isUploading, setIsUploading] = useState(false);

  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!id) return;
    api.get(`users/${id}`).then((res) => {
      const user = res.data;
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setRole(user.role);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsUploading(true);
      await api
        .request({
          url: isEditMode ? `users/${id}` : "auth/register",
          method: isEditMode ? "patch" : "post",
          data: {
            name,
            email,
            password,
            role,
          },
        })
        .then(() => {
          toast.success(
            isEditMode
              ? t("successToast:editUser")
              : t("successToast:createUser"),
          );
          setName("");
          setEmail("");
          setPassword("");
          setRole("");
        });
    } catch (error) {
      showErrors(error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header
        title={isEditMode ? t("editUser") : t("createUser")}
        subTitle={t("createSubtitle")}
        showBackButton={true}
      />
      <form onSubmit={handleSubmit} className="w-full">
        <Card className="bg-white! w-full border-none shadow shadow-gray-400">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t("basicInformation")}
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder={t("holderUserName")}
                value={name}
                required
                color="white"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <div className="mb-2 block">
                <Label htmlFor="password" />
              </div>
              <TextInput
                id="password"
                type="text"
                placeholder={t("holderUserPassword")}
                value={password}
                color="white"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder={t("holderUserEmail")}
                value={email}
                icon={() => <span className="text-gray-500">@</span>}
                color="white"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" />
              </div>
              <Select
                value={role}
                required
                onChange={(e) => setRole(e.target.value)}
                color="white"
              >
                <option value="" disabled>
                  {t("holderSelectRole")}
                </option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
              </Select>
            </div>
          </div>
          <SubmitButton
            isUploading={isUploading}
            isEditMode={isEditMode}
            t={t}
          />
        </Card>
      </form>
    </div>
  );
}
