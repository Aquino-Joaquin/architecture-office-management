import { FiSearch } from "react-icons/fi";

type SeachProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeHolder: string;
};
export default function Search({ search, setSearch, placeHolder }: SeachProps) {
  return (
    <div className="relative w-full max-w-3xl mt-2 pl-2 mb-2">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      <input
        type="text"
        placeholder={placeHolder}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
