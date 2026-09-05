import type { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: number;
};

export function StatCard({
  icon,
  label,
  value,
}: StatCardProps) {
  return (
    <div className="h-[197px] rounded-[17px] border border-[#dedede] p-6">
      <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[13px] bg-[#e9e9e9]">
        {icon}
      </div>

      <p className="mt-7 text-[16px] text-[#687083]">
        {label}
      </p>

      <p className="mt-2 text-[38px] font-medium leading-none">
        {value}
      </p>
    </div>
  );
}
