
import Link from "next/link";
import { GraduationCap, Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-[84px] max-w-[1420px] items-center justify-between px-6">
       
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white"
          >
            <GraduationCap size={21} strokeWidth={1.8} />
          </div>

          <div className="leading-none">
            <p className="text-[13px] font-medium text-gray-500">
               Student Management System

            </p>

            <h1 className="mt-1 text-[20px] font-semibold tracking-[-0.02em] text-gray-950">
              manage your students
            </h1>
          </div>
        </div>

        <Link
          href="/students/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          <Plus size={17} strokeWidth={2} />
          Add student
        </Link>
      </div>
    </header>
  );
}

