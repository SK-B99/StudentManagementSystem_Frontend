import Link from "next/link";
import { Student } from "@/app/types/students";

type StudentTableProps = {
  students: Student[];
};

function getInitials(student: Student) {
  return `${student.firstName.charAt(0)}${student.lastName
    .charAt(0)}`
    .toUpperCase();
}

export default function StudentTable({
  students,
}: StudentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/60">
            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Student
            </th>

            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Student ID
            </th>

            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Department
            </th>

            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Program
            </th>

            <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                    {getInitials(student)}
                  </div>

                  <div>
                    <p className="font-medium text-black">
                      {student.firstName} {student.lastName}
                    </p>

                    <p className="mt-0.5 text-sm text-gray-500">
                      {student.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {student.studentId}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {student.department || "—"}
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">
                {student.program || "—"}
              </td>

              <td className="px-6 py-4 text-right">
                <Link
                  href={`/students/${student.id}`}
                  className="text-sm font-medium text-black underline-offset-4 hover:underline"
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
