import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
export type Props = {
  title: string;
  subTitle: string;
  buttonTitle?: string;
  buttonPath?: string;
};
export default function Header({
  title,
  subTitle,
  buttonTitle,
  buttonPath,
}: Props) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-black ">
            {title}
          </h1>
          <p className="text-base font-normal text-gray-500 ">{subTitle}</p>
        </div>
        {buttonTitle && buttonPath && (
          <Button color="blue" onClick={() => navigate(buttonPath)}>
            <HiPlus className="mr-2 h-5 w-5" />
            {buttonTitle}
          </Button>
        )}
      </div>
    </div>
  );
}
