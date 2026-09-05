import { Search } from "lucide-react";

type StudentDirectoryHeaderProps = {
  search: string;
  total: number;
  loading: boolean;
  firstStudentNumber: number;
  lastStudentNumber: number;
  onSearchChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export default function StudentDirectoryHeader({
  search,
  total,
  loading,
  firstStudentNumber,
  lastStudentNumber,
  onSearchChange,
}: StudentDirectoryHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-5 sm:px-6 lg:flex-row lg:items-center">
      <div>
        <h2 className="text-[18px] font-semibold">
          All students
        </h2>

        <p className="mt-1 text-[15px] text-gray-500">
          {loading ? (
            "Loading students..."
          ) : total === 0 ? (
            "No records found"
          ) : (
            <>
              Showing {firstStudentNumber}–{lastStudentNumber} of{" "}
              {total} {total === 1 ? "record" : "records"}
            </>
          )}
        </p>
      </div>

      <div className="relative">
        <Search
          size={19}
          strokeWidth={1.7}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="search"
          value={search}
          onChange={onSearchChange}
          placeholder="Search students..."
          aria-label="Search students"
          className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-[15px] outline-none transition placeholder:text-gray-500 focus:border-gray-400 sm:w-[315px]"
        />
      </div>
    </div>
  );
}
