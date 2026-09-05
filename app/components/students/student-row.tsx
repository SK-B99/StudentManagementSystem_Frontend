import { Mail, Pencil, Trash2 } from "lucide-react";
import type { Student } from "./types";

type StudentRowProps = {
  student: Student;
};

export function StudentRow({
  student,
}: StudentRowProps) {
  return (
    <tr className="border-t border-[#ededed]">
      <td className="px-6 py-5">
        <p className="font-semibold">
          {student.name}
        </p>

        <div className="mt-1 flex items-center gap-2 text-sm text-[#687083]">
          <Mail size={15} />
          {student.email}
        </div>
      </td>

      <td className="px-6 py-5 text-sm text-[#687083]">
        {student.id}
      </td>

      <td className="px-6 py-5">
        {student.course}
      </td>

      <td className="px-6 py-5">
        <span className="rounded-full bg-[#e9e9e9] px-3 py-1.5 text-sm font-medium">
          {student.status}
        </span>
      </td>

      <td className="px-6 py-5">
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="rounded-lg p-1.5 text-[#777] hover:bg-gray-100 hover:text-black"
          >
            <Pencil size={19} />
          </button>

          <button
            type="button"
            className="rounded-lg p-1.5 text-[#777] hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={19} />
          </button>
        </div>
      </td>
    </tr>
  );
}
