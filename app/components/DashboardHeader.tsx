import Link from "next/link";
import { GraduationCap, Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="border-b border-gray-200">
      <div className="mx-auto flex h-[100px] max-w-[1420px] items-center justify-between px-6 lg:px-0">
        <div className="flex items-center gap-4">
          <div
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-black text-white"
          >
            <GraduationCap size={25} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.28em] text-gray-500">
              Campus Admin
            </p>

            <p className="mt-1 text-[22px] font-semibold tracking-tight text-black">
              Student records
            </p>
          </div>
        </div>

        <Link
          href="/students/new"
          className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-[15px] font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          <Plus size={18} strokeWidth={2} aria-hidden="true" />
          Add student
        </Link>
      </div>
    </header>
  );
}
