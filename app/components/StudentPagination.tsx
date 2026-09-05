import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type StudentPaginationProps = {
  page: number;
  totalPages: number;
  loading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
};

export default function StudentPagination({
  page,
  totalPages,
  loading,
  onPrevious,
  onNext,
  onPageChange,
}: StudentPaginationProps) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).filter((pageNumber) => {
    if (totalPages <= 7) return true;

    if (
      pageNumber === 1 ||
      pageNumber === totalPages
    ) {
      return true;
    }

    return (
      pageNumber >= page - 1 &&
      pageNumber <= page + 1
    );
  });

  return (
    <div className="flex flex-col gap-4 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={page === 1 || loading}
          aria-label="Previous page"
          className="flex h-10 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={17} />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((pageNumber, index) => {
            const previousPage =
              pageNumbers[index - 1];

            const showEllipsis =
              previousPage !== undefined &&
              pageNumber - previousPage > 1;

            return (
              <span
                key={pageNumber}
                className="flex items-center gap-1"
              >
                {showEllipsis && (
                  <span className="px-1 text-gray-400">
                    ...
                  </span>
                )}

                <button
                  type="button"
                  onClick={() =>
                    onPageChange(pageNumber)
                  }
                  disabled={loading}
                  aria-label={`Go to page ${pageNumber}`}
                  aria-current={
                    pageNumber === page
                      ? "page"
                      : undefined
                  }
                  className={`h-10 min-w-10 rounded-lg px-3 text-sm font-medium transition ${
                    pageNumber === page
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  } disabled:cursor-not-allowed`}
                >
                  {pageNumber}
                </button>
              </span>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={
            page === totalPages ||
            totalPages === 0 ||
            loading
          }
          aria-label="Next page"
          className="flex h-10 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
