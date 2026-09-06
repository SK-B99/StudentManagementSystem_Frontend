
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
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
            {value.toLocaleString()}
          </p>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
          <Icon
            size={17}
            strokeWidth={1.8}
            className="text-gray-600"
            aria-hidden="true"
          />
        </div>
      </div>

      {description && (
        <p className="mt-3 text-[11px] text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}

