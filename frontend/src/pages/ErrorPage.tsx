import { Button, Card } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation("errorPage");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md bg-white! border-none! text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <img
            src="../logo.svg"
            alt="Architecture Office Logo"
            className="w-12 h-12 rounded-lg opacity-80"
          />
          <div>
            <h1 className="text-lg font-medium text-black">{t("title")}</h1>
            <span className="text-gray-500 text-sm">{t("subTitle")}</span>
          </div>
        </div>

        <div className="my-6 flex flex-col items-center gap-2">
          <h2 className="text-6xl font-black text-gray-200 tracking-widest">
            {t("errorCode")}
          </h2>

          <div className="relative -mt-2 mb-2">
            <span className="bg-white px-2 text-lg font-semibold text-gray-900">
              {t("notFound")}
            </span>
          </div>

          <p className="px-4 text-center text-sm text-gray-500">
            {t("errorMessage")}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            color="light"
            onClick={() => navigate(-1)}
            className="w-full bg-[rgb(236,202,110)]! hover:brightness-105! border-transparent! focus:ring-4! focus:ring-[rgba(236,202,110,0.5)]! text-white"
          >
            {t("goBack")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
