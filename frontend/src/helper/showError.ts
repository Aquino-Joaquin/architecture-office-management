import { toast } from "react-toastify";
import i18n from "../i18n/i18n";

export function showErrors(error: any) {
  const msg = error?.response?.data?.message;

  if (Array.isArray(msg)) {
    msg.forEach((m) => {
      if (typeof m === "object" && m.constraints) {
        Object.values(m.constraints).forEach((key) => {
          toast.error(i18n.t(key as string));
        });
      } else if (typeof m === "string") {
        toast.error(i18n.t(`errors:${m}`));
      }
    });
  } else if (typeof msg === "string") {
    toast.error(i18n.t(msg));
  } else {
    toast.error(i18n.t("common.error"));
  }
}
