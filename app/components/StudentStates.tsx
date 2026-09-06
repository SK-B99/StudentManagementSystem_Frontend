import Link from "next/link";
import { UserRound } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex min-h-[280px] items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-gray-700" />
        <span>Loading students...</span>
      </div>
    </div>
  );
}

type ErrorStateProps = {
  onRetry: () => void;
};

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex min-h-[280px] items-center justify-center px-6">
      <div className="max-w-sm text-center">
        <h3 className="text-sm font-semibold text-gray-900">
          Unable to load students
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          We couldn't load the student directory right now. Please try again.
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

export function EmptyState({ search }: EmptyStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
        <UserRound size={19} strokeWidth={1.7} />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        No students found
      </h3>

      <p className="mt-1.5 max-w-sm text-sm leading-6 text-gray-500">
        {search
          ? `No students match "${search}". Try a different search.`
          : "There are no students in the directory yet."}
      </p>

      {!search && (
        <Link
          href="/students/new"
          className="mt-4 rounded-lg bg-gray-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Add student
        </Link>
      )}
    </div>
  );
}

