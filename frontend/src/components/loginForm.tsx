import { Button, Card, Label, TextInput, Toast } from "flowbite-react";
import { useState } from "react";
import { api } from "../helper/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post("auth/login", { userName, password });
      localStorage.setItem("token", res.data.accessToken);
      const user = {
        role: res.data.role,
      };
      if (user.role === "Staff") {
        navigate("/");
      } else {
        navigate("/projects");
      }
    } catch (error: any) {
      toast.error("Login failed");
      setUserName("");
      setPassword("");
    }
  }
  return (
    <>
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
            Architecture Office
            <br />
            <span className="text-gray-500">Management System</span>
          </h1>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <div className="mb-2 block">
              <Label color="black" htmlFor="userName">
                User Name
              </Label>
            </div>
            <TextInput
              id="userName"
              type="userName"
              placeholder="Enter your user name "
              color="white"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label color="white" htmlFor="password1">
                Password
              </Label>
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="Enter your password"
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
            Sign In
          </Button>
        </form>
      </Card>
    </>
  );
}
