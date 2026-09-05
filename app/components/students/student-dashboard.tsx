"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getStudents, createStudent, updateStudent, deleteStudent } from "@/app/lib/students/api";
import type {
  Student,
  StudentInput,
} from "@/app/lib/students/types";

import { StudentHeader } from "./student-header";
import { StudentStats } from "./student-stats";
import { StudentTable } from "./student-table";
import { StudentForm } from "./student-form";

export function StudentDashboard() {
  const [students, setStudents] = useState<Student[]>([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All status");

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] =
    useState<Student | null>(null);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState("");

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getStudents();

      setStudents(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load students."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.id.toLowerCase().includes(query) ||
        student.course.toLowerCase().includes(query);

      const matchesStatus =
        status === "All status" || student.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [students, search, status]);

  const handleOpenAddForm = () => {
    setEditingStudent(null);
    setShowForm(true);
    setError("");
  };

  const handleOpenEditForm = (student: Student) => {
    setEditingStudent(student);
    setShowForm(true);
    setError("");
  };

  const handleCloseForm = () => {
    if (formLoading) return;

    setShowForm(false);
    setEditingStudent(null);
  };

  const handleSubmitStudent = async (student: StudentInput) => {
    try {
      setFormLoading(true);
      setError("");

      if (editingStudent) {
        await updateStudent(editingStudent.id, student);
      } else {
        await createStudent(student);
      }

      await loadStudents();

      setShowForm(false);
      setEditingStudent(null);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to save student.";

      setError(message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteStudent = async (student: Student) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${student.name}?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(student.id);
      setError("");

      await deleteStudent(student.id);

      await loadStudents();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete student."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#111]">
      <StudentHeader />

      <div className="mx-auto max-w-[1660px] px-6 py-10 md:px-10 lg:px-14">
        <div className="mb-4 flex items-center gap-3 text-[16px]">
          <span>Overview</span>
          <span className="text-[#929292]">/</span>
          <span>2026</span>
        </div>

        <section className="mb-10">
          <h1 className="text-[32px] font-semibold tracking-[-1.2px] md:text-[38px]">
            Keep your student directory current.
          </h1>

          <p className="mt-3 text-[18px] text-[#687083]">
            A simple, focused place to view, update, and manage
            student information.
          </p>
        </section>

        <StudentStats students={students} />

        {error && (
          <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="font-medium hover:underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {showForm && (
          <StudentForm
            student={editingStudent}
            loading={formLoading}
            onCancel={handleCloseForm}
            onSubmit={handleSubmitStudent}
          />
        )}

        <StudentTable
          students={filteredStudents}
          search={search}
          status={status}
          loading={loading}
          deletingId={deletingId}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onAddStudent={handleOpenAddForm}
          onEditStudent={handleOpenEditForm}
          onDeleteStudent={handleDeleteStudent}
        />
      </div>
    </main>
  );
}
