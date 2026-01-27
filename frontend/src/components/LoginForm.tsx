import { Button, Card, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { api } from "../helper/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation(["login", "errors"]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post("auth/login", { userName, password });

      localStorage.setItem("token", res.data.accessToken);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: res.data.id,
          name: res.data.userName,
          role: res.data.role,
        }),
      );

      if (res.data.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/staff");
      }
    } catch (error) {
      toast.error(t("errors:login"));
      setUserName("");
      setPassword("");
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ToastContainer position="top-center" autoClose={2000} />
      <Card className="w-full max-w-md  bg-white! border-none!">
        <div className="flex items-center justify-center">
          <img
            src="../logo.svg"
            alt="Architecture Office Logo"
            className="w-12 h-12 rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-center text-lg font-medium text-black">
            {t("companyName")}
            <br />
            <span className="text-gray-500">{t("managementSystem")}</span>
          </h1>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <div className="mb-2 block">
              <Label color="black" htmlFor="userName">
                {t("userName")}
              </Label>
            </div>
            <TextInput
              id="userName"
              type="userName"
              placeholder={t("holderUserName")}
              color="white"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label color="white" htmlFor="password1">
                {t("password")}
              </Label>
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder={t("holderPassword")}
              color="white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="bg-[rgb(236,202,110)]! hover:brightness-105! border-transparent! focus:ring-4! focus:ring-[rgba(236,202,110,0.5)]! text-white"
          >
            {t("signIn")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
