"use client";

import type { Student } from "@/app/lib/students/types";

type StudentTableProps = {
  students: Student[];
  search: string;
  status: string;
  loading: boolean;
  deletingId: string | null;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
};

export function StudentTable({
  students,
  search,
  status,
  loading,
  deletingId,
  onSearchChange,
  onStatusChange,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
}: StudentTableProps) {
  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white">
      <div className="flex flex-col gap-4 border-b border-[#E5E7EB] p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Student directory
          </h2>

          <p className="mt-1 text-sm text-[#687083]">
            View and manage registered students.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddStudent}
          className="rounded-xl bg-[#111] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2A2A2A]"
        >
          + Add student
        </button>
      </div>

      <div className="flex flex-col gap-3 border-b border-[#E5E7EB] p-5 md:flex-row">
        <input
          type="search"
          placeholder="Search students..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-xl border border-[#D9DDE5] px-4 py-3 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#111] md:max-w-md"
        />

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="rounded-xl border border-[#D9DDE5] bg-white px-4 py-3 text-sm outline-none focus:border-[#111]"
        >
          <option value="All status">All status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Graduated">Graduated</option>
        </select>
      </div>

      {loading ? (
        <div className="flex min-h-[240px] items-center justify-center">
          <div className="text-sm text-[#687083]">
            Loading students...
          </div>
        </div>
      ) : students.length === 0 ? (
        <div className="flex min-h-[240px] flex-col items-center justify-center px-6 text-center">
          <p className="text-base font-medium">
            No students found
          </p>

          <p className="mt-1 text-sm text-[#687083]">
            Try changing your search or status filter.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA] text-left">
                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#687083]">
                  Student ID
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#687083]">
                  Student
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#687083]">
                  Email
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#687083]">
                  Course
                </th>

                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-[#687083]">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-[#687083]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-[#E5E7EB] last:border-b-0"
                >
                  <td className="px-5 py-4 text-sm font-medium">
                    {student.id}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {student.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#687083]">
                    {student.email}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {student.course}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={student.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEditStudent(student)}
                        disabled={deletingId === student.id}
                        className="rounded-lg border border-[#D9DDE5] px-3 py-2 text-xs font-medium transition hover:bg-[#F7F7F8] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Modify
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteStudent(student)}
                        disabled={deletingId === student.id}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {deletingId === student.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function StatusBadge({
  status,
}: {
  status: Student["status"];
}) {
  const styles = {
    Active: "bg-green-50 text-green-700",
    Inactive: "bg-gray-100 text-gray-600",
    Graduated: "bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}
