import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
export type Props = {
  title: string;
  subTitle: string;
  buttonTitle?: string;
  buttonPath?: string;
  showButton?: boolean;
};
export default function Header({
  title,
  subTitle,
  buttonTitle,
  buttonPath,
  showButton,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-base font-normal text-gray-500 ">{subTitle}</p>
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
