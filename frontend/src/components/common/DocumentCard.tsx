import { Badge, Button, Card } from "flowbite-react";
import type { Document } from "../../types/Document";
import {
  HiDocumentText,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlineUpload,
} from "react-icons/hi";
import { formatDateDMY } from "../../helper/formatDateDMY";
import ConfirmationDelete from "./ConfirmationDelete";
import { useState } from "react";
import { handleDelete } from "../../helper/handleDelete";
import { useNavigate } from "react-router-dom";
import type { TFunction } from "i18next";
export type Props = {
  docs: Document[];
  t: TFunction;
  fetchDocuments: () => void;
};
export default function DocumentCard({ docs, t, fetchDocuments }: Props) {
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    (() => Promise<void>) | null
  >(null);
  const navigate = useNavigate();

  function handleUploadDocument() {
    navigate("documents");
  }
  function handleDownloadDocument(documentId: number) {
    const doc = docs.find((d) => d.id === documentId);
    if (!doc) return;

    const link = window.document.createElement("a");
    link.href = doc.url;
    link.download = doc.title || "document";
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  }
  return (
    <>
      <Card className="w-full mx-auto shadow-sm shadow-gray-400 bg-white! border-none">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HiDocumentText className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {t("documents:title1")}
            </h2>
          </div>
          <Button
            className="border-blue-600 text-white! hover:bg-blue-50"
            onClick={handleUploadDocument}
          >
            <HiOutlineUpload className="mr-2 h-5 w-5" />
            {t("documents:createButton")}
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="group flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 transition-all duration-200"
            >
              <div
                className={`p-3 mr-4 rounded-lg ${doc.type === "design" ? "bg-blue-50" : "bg-red-50"}`}
              >
                {<HiDocumentText />}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">
                  {doc.title}
                </h4>
                <div className="flex flex-wrap items-center mt-1 gap-3 text-xs text-gray-500">
                  <Badge
                    color="blue"
                    size="sm"
                    className="px-2 py-0.5 rounded-full lowercase"
                  >
                    {doc.type}
                  </Badge>
                  <span>
                    {t("documents:uploadBy")} {doc.user.name}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>{formatDateDMY(doc.createdAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => handleDownloadDocument(doc.id)}
                >
                  <HiOutlineDownload className="w-5 h-5" />
                </button>
                <button
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  onClick={() => {
                    setConfirmAction(() => async () => {
                      if (await handleDelete(doc.id, "documents", t)) {
                        fetchDocuments();
                      }
                    });
                    setOpenDelete(true);
                  }}
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <ConfirmationDelete
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={async () => {
          await confirmAction?.();
          setOpenDelete(false);
        }}
        description={t("deleteDescription")}
        yes={t("yesOption")}
        no={t("noOption")}
      />
    </>
  );
}
