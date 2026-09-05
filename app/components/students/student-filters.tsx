import { Search } from "lucide-react";

type StudentFiltersProps = {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export function StudentFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: StudentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#707070]"
        />

        <input
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search students..."
          className="h-[47px] w-full rounded-[13px] border border-[#dedede] bg-white pl-11 pr-4 text-[16px] outline-none placeholder:text-[#687083] focus:border-[#999] sm:w-[320px]"
        />
      </div>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
        className="h-[47px] rounded-[13px] border border-[#dedede] bg-white px-4 text-[16px] outline-none focus:border-[#999]"
      >
        <option>All status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>
  );
}
