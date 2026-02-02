import { Button } from "flowbite-react";
import { HiPlus, HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export type Props = {
  title: string;
  subTitle: string;
  buttonTitle?: string;
  buttonPath?: string;
  showButton?: boolean;
  showBackButton?: boolean;
};

export default function Header({
  title,
  subTitle,
  buttonTitle,
  buttonPath,
  showButton,
  showBackButton = false,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3">
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="mt-1 rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <HiArrowLeft className="h-5 w-5" />
          </button>
        )}

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          <p className="text-base font-normal text-gray-500">{subTitle}</p>
        </div>
      </div>

      {showButton && buttonTitle && buttonPath && (
        <Button color="blue" onClick={() => navigate(buttonPath)}>
          <HiPlus className="mr-2 h-5 w-5" />
          {buttonTitle}
        </Button>
      )}
    </div>
  );
}
