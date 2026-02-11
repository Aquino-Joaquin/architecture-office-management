import { toast } from "react-toastify";
import { api } from "./api";
import { showErrors } from "./showError";
import type { TFunction } from "i18next";

export async function handleDelete(id: number, endpoint: string, t: TFunction) {
  try {
    await api.request({
      url: `${endpoint}/${id}`,
      method: "delete",
    });
    toast.success(t(`successToast:${endpoint}Delete`));
    return true;
  } catch (error) {
    showErrors(error);
    return false;
  }
}
