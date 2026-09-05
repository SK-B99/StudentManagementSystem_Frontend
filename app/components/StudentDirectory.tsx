"use client";

import { useEffect, useState } from "react";

import { getStudents } from "@/app/lib/api";
import { Student } from "@/app/types/students";

import StudentStats from "./StudentStats"; 
import StudentDirectoryHeader from "./StudentDirectoryHeader"; 
import StudentTable from "./StudentTable"; 
import StudentPagination from "./StudentPagination"; 
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "./StudentStates";

const DEFAULT_LIMIT = 5;

export default function StudentDirectory() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const limit = DEFAULT_LIMIT;

  useEffect(() => {
    async function loadStudents() {
      try {
        setLoading(true);
        setError(false);

        const response = await getStudents({
          page,
          limit,
          search,
        });

        setStudents(response.data);
        setTotal(response.meta.total);
        setTotalPages(response.meta.totalPages);
      } catch (error) {
        console.error(
          "Failed to fetch students:",
          error
        );
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, [page, search]);

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handlePreviousPage() {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  }

  function handleNextPage() {
    if (page < totalPages) {
      setPage((currentPage) => currentPage + 1);
    }
  }

  function handlePageChange(newPage: number) {
    if (
      newPage >= 1 &&
      newPage <= totalPages &&
      newPage !== page
    ) {
      setPage(newPage);
    }
  }

  const programsRepresented = new Set(
    students
      .map((student) => student.program)
      .filter(Boolean)
  ).size;

  const firstStudentNumber =
    total === 0 ? 0 : (page - 1) * limit + 1;

  const lastStudentNumber = Math.min(
    page * limit,
    total
  );

  return (
    <>
      <StudentStats
        total={total}
        programsRepresented={programsRepresented}
        loading={loading}
      />

      <section className="mt-10 overflow-hidden rounded-[17px] border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <StudentDirectoryHeader
          search={search}
          total={total}
          loading={loading}
          firstStudentNumber={firstStudentNumber}
          lastStudentNumber={lastStudentNumber}
          onSearchChange={handleSearchChange}
        />

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            onRetry={() => setPage(page)}
          />
        ) : students.length === 0 ? (
          <EmptyState search={search} />
        ) : (
          <>
            <StudentTable students={students} />

            {totalPages > 1 && (
              <StudentPagination
                page={page}
                totalPages={totalPages}
                loading={loading}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </section>
    </>
  );
}
