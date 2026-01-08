import { Button, Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md bg-white! border-none! text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <img
            src="../logo.svg"
            alt="Architecture Office Logo"
            className="w-12 h-12 rounded-lg  opacity-80"
          />
          <div>
            <h1 className="text-lg font-medium text-black">
              Architecture Office
            </h1>
            <span className="text-gray-500 text-sm">Management System</span>
          </div>
        </div>

        <div className="my-4 flex flex-col items-center gap-4">
          <div className="rounded-full bg-red-50 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-12 w-12 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">Access Denied</h2>
            <p className="mt-2 text-sm text-gray-500">
              You do not have permission to view this page. Please contact your
              administrator if you believe this is an error.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate(-1)}
            className="w-full bg-[rgb(236,202,110)]! hover:brightness-105! border-transparent! focus:ring-4! focus:ring-[rgba(236,202,110,0.5)]! text-white"
          >
            Go Back
          </Button>

          <Button
            color="light"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="w-full border-gray-200 hover:bg-gray-50 focus:ring-4 focus:ring-gray-100"
          >
            Back to Login
          </Button>
        </div>
      </Card>
    </div>
  );
}
