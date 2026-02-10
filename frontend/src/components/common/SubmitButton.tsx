import { Button, Spinner } from "flowbite-react";
import type { TFunction } from "i18next";
import { HiPencil, HiPlus } from "react-icons/hi";
export type Props = {
  isUploading: boolean;
  isEditMode?: boolean;
  t: TFunction;
};
export default function SubmitButton({
  isUploading,
  isEditMode = false,
  t,
}: Props) {
  return (
    <div className="flex justify-end">
      <Button type="submit" disabled={isUploading}>
        {isUploading ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" />
            {t("uploading")}
          </div>
        ) : isEditMode ? (
          <>
            <HiPencil className="mr-2" /> {t("editButton")}
          </>
        ) : (
          <>
            <HiPlus className="mr-2" /> {t("createButton")}
          </>
        )}
      </Button>
    </div>
  );
}
