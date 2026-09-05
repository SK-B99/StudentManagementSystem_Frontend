import type { Student } from "@/app/lib/students/types";

type StudentStatsProps = {
  students: Student[];
};

export function StudentStats({
  students,
}: StudentStatsProps) {
  const total = students.length;

  const active = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactive = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const graduated = students.filter(
    (student) => student.status === "Graduated"
  ).length;

  const stats = [
    {
      label: "Total students",
      value: total,
    },
    {
      label: "Active",
      value: active,
    },
    {
      label: "Inactive",
      value: inactive,
    },
    {
      label: "Graduated",
      value: graduated,
    },
  ];

  return (
    <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
        >
          <p className="text-sm text-[#687083]">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}
