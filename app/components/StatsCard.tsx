import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  description?: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="min-h-[194px] rounded-[17px] border border-gray-200 bg-white p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
        <Icon
          size={22}
          strokeWidth={1.7}
          className="text-gray-700"
        />
      </div>

      <div className="mt-7">
        <p className="text-[16px] text-gray-500">
          {title}
        </p>

        <p className="mt-1 text-[35px] font-medium tracking-tight text-black">
          {value}
        </p>

        {description && (
          <p className="mt-1 text-sm text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
