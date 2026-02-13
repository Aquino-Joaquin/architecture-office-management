import { Card } from "flowbite-react";
import type { CardInfomation } from "../../types/CardInformation";

export type Props = {
  information: CardInfomation[];
  columnNo: number;
};
export default function InformationGrid({ information, columnNo }: Props) {
  return (
    <div
      className="grid w-full grid-cols-1 gap-6 md:grid-cols-2"
      style={{ gridTemplateColumns: `repeat(${columnNo}, minmax(0, 1fr))` }}
    >
      {information.map(({ title, value, Icon }, index) => (
        <Card
          key={index}
          className="w-full shadow-sm shadow-gray-400 hover:shadow-md transition-shadow bg-white! border-none"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-black ">{title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600 ">
              {Icon && <Icon className="w-6 h-6" />}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
