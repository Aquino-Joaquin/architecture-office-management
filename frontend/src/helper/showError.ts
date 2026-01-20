import { toast } from "react-toastify";
export function showErrors(error: any) {
  const msg = error?.response?.data?.message;
  if (Array.isArray(msg)) {
    msg.forEach((m: string) => toast.error(m));
  } else if (typeof msg === "string") {
    toast.error(msg);
  } else {
    toast.error("Something went wrong");
  }
}
