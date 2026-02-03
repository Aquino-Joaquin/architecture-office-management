import {
  Button,
  Card,
  FileInput,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import Header from "../common/Header";
import { HiPlus } from "react-icons/hi";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../helper/api";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { showErrors } from "../../helper/showError";

export default function AddNewDocumentComponent() {
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState("");
  const { t } = useTranslation(["documents", "successToast"]);
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!file) {
      toast.warning(t("noFile"));
      return;
    }

    if (!id) {
      toast.error("Invalid project");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", documentName);
    formData.append("projectId", id);

    try {
      setIsUploading(true);
      await api.post("documents", formData);

      toast.success(t("successToast:uploadDocument"));
      setDocumentName("");
      setFile(null);
    } catch (error) {
      showErrors(error);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-gray-100 min-h-screen flex flex-col gap-6">
      <Header
        title={t("title2")}
        subTitle={t("subtitle")}
        showBackButton={true}
      />
      <form onSubmit={!isUploading ? handleSubmit : undefined}>
        <Card className="bg-white! border-none shadow shadow-gray-400">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Document Name</Label>
              <TextInput
                required
                value={documentName}
                disabled={isUploading}
                placeholder={t("holderDocumentName")}
                onChange={(e) => setDocumentName(e.target.value)}
                color="white"
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-center">
            <Label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white hover:bg-white"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">
                    {isUploading ? t("uploadingPlace") : t("uploadPlace")}
                  </span>
                </p>
              </div>
              <FileInput
                disabled={isUploading}
                id="dropzone-file"
                className="hidden "
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </Label>
          </div>
        </Card>
        <div className="flex justify-end mt-5">
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                {t("uploading")}
              </div>
            ) : (
              <>
                <HiPlus className="mr-2" />
                {t("buttonAddDocument")}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
