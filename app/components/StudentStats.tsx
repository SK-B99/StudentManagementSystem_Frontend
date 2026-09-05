import {
  BookOpen,
  GraduationCap,
  Users,
} from "lucide-react";

type Stat = {
  label: string;
  value: number;
  icon: React.ElementType;
};

type StudentStatsProps = {
  total: number;
  programsRepresented: number;
  loading: boolean;
};

export default function StudentStats({
  total,
  programsRepresented,
  loading,
}: StudentStatsProps) {
  const stats: Stat[] = [
    {
      label: "Total students",
      value: total,
      icon: Users,
    },
    {
      label: "Active students",
      value: total,
      icon: GraduationCap,
    },
    {
      label: "Programs represented",
      value: programsRepresented,
      icon: BookOpen,
    },
  ];

  return (
    <section className="mt-10 grid gap-5 md:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="min-h-[194px] rounded-[17px] border border-gray-200 bg-white p-6"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
            <Icon size={22} strokeWidth={1.7} />
          </div>

          <div className="mt-7">
            <p className="text-[16px] text-gray-500">
              {label}
            </p>

            <p className="mt-1 text-[35px] font-medium tracking-tight">
              {loading && total === 0 ? "—" : value}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
