import Link from "next/link";
import { UserRound } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <p className="text-sm text-gray-500">
        Loading students...
      </p>
    </div>
  );
}

type ErrorStateProps = {
  onRetry: () => void;
};

export function ErrorState({
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
      <div>
        <h3 className="font-semibold">
          Unable to load students
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Something went wrong while loading the directory.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

type EmptyStateProps = {
  search: string;
};

export function EmptyState({
  search,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[310px] flex-col items-center justify-center px-6 text-center">
      <div className="mb-5 text-gray-400">
        <UserRound size={45} strokeWidth={1.4} />
      </div>

      <h3 className="text-[18px] font-semibold">
        No students found
      </h3>

      <p className="mt-2 text-[16px] text-gray-500">
        {search
          ? "Try adjusting your search."
          : "Add a student to get started."}
      </p>

      {!search && (
        <Link
          href="/students/new"
          className="mt-5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add student
        </Link>
      )}
    </div>
  );
}
