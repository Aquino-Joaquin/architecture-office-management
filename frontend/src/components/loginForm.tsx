import { Button, Card, Label, TextInput } from "flowbite-react";

export default function loginForm() {
  return (
    <Card className="w-full max-w-md  !bg-white !border-none">
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
      <form className="flex flex-col gap-4">
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
          />
        </div>
        <Button className="!bg-[rgb(236,202,110)] hover:!brightness-105 !border-transparent focus:!ring-4 focus:!ring-[rgba(236,202,110,0.5)] text-white">
          Sign In
        </Button>
      </form>
    </Card>
  );
}
