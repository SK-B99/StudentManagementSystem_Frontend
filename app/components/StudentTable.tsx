
import Link from "next/link";
import { Student } from "@/app/types/students";

type StudentTableProps = {
  students: Student[];
};

function getInitials(student: Student) {
  return `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`.toUpperCase();
}

export default function StudentTable({
  students,
}: StudentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Student
            </th>

            <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Student ID
            </th>

            <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Department
            </th>

            <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Program
            </th>

            <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b border-gray-100 last:border-0 transition-colors hover:bg-gray-50"
            >
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                    {getInitials(student)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {student.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-3.5 text-sm text-gray-600">
                {student.studentId}
              </td>

              <td className="px-5 py-3.5 text-sm text-gray-600">
                {student.department || "—"}
              </td>

              <td className="px-5 py-3.5 text-sm text-gray-600">
                {student.program || "—"}
              </td>

              <td className="px-5 py-3.5 text-right">
                <Link
                  href={`/students/${student.id}`}
                  className="text-sm font-medium text-gray-900 underline-offset-4 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

