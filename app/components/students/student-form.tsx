"use client";

import { useEffect, useState } from "react";
import type {
  Student,
  StudentInput,
  StudentStatus,
} from "@/app/lib/students/types";

type StudentFormProps = {
  student?: Student | null;
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (student: StudentInput) => Promise<void>;
};

const emptyForm: StudentInput = {
  id: "",
  name: "",
  email: "",
  course: "",
  status: "Active",
};

export function StudentForm({
  student,
  loading = false,
  onCancel,
  onSubmit,
}: StudentFormProps) {
  const [form, setForm] = useState<StudentInput>(emptyForm);
  const [error, setError] = useState("");

  const isEditing = Boolean(student);

  useEffect(() => {
    if (student) {
      setForm({
        id: student.id,
        name: student.name,
        email: student.email,
        course: student.course,
        status: student.status,
      });
    } else {
      setForm(emptyForm);
    }

    setError("");
  }, [student]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (!form.id.trim()) {
      setError("Student ID is required.");
      return;
    }

    if (!form.name.trim()) {
      setError("Full name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email address is required.");
      return;
    }

    if (!form.course.trim()) {
      setError("Course or program is required.");
      return;
    }

    try {
      await onSubmit({
        id: form.id.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        course: form.course.trim(),
        status: form.status,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    }
  };

  return (
    <div className="mb-8 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">
          {isEditing ? "Modify student" : "Add student"}
        </h2>

        <p className="mt-1 text-sm text-[#687083]">
          {isEditing
            ? "Update the student's information below."
            : "Enter the student's information below."}
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >
        <div>
          <label
            htmlFor="student-id"
            className="mb-2 block text-sm font-medium"
          >
            Student ID
          </label>

          <input
            id="student-id"
            name="id"
            type="text"
            placeholder="e.g. STU-1042"
            value={form.id}
            onChange={handleChange}
            disabled={loading || isEditing}
            required
            className="w-full rounded-xl border border-[#D9DDE5] px-4 py-3 text-sm outline-none transition placeholder:text-[#9CA3AF] focus:border-[#111] disabled:bg-[#F5F5F5] disabled:text-[#777]"
          />

          {isEditing && (
            <p className="mt-1.5 text-xs text-[#929292]">
              Student ID cannot be changed while editing.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="student-name"
            className="mb-2 block text-sm font-medium"
          >
            Full name
          </label>

          <input
            id="student-name"
            name="name"
            type="text"
            placeholder="e.g. Jordan Lee"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full rounded-xl border border-[#D9DDE5] px-4 py-3 text-sm outline-none transition placeholder:text-[#9CA3AF] focus:border-[#111] disabled:bg-[#F5F5F5]"
          />
        </div>

        <div>
          <label
            htmlFor="student-email"
            className="mb-2 block text-sm font-medium"
          >
            Email address
          </label>

          <input
            id="student-email"
            name="email"
            type="email"
            placeholder="student@campus.edu"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full rounded-xl border border-[#D9DDE5] px-4 py-3 text-sm outline-none transition placeholder:text-[#9CA3AF] focus:border-[#111] disabled:bg-[#F5F5F5]"
          />
        </div>

        <div>
          <label
            htmlFor="student-course"
            className="mb-2 block text-sm font-medium"
          >
            Course or program
          </label>

          <input
            id="student-course"
            name="course"
            type="text"
            placeholder="e.g. Computer Science"
            value={form.course}
            onChange={handleChange}
            disabled={loading}
            required
            className="w-full rounded-xl border border-[#D9DDE5] px-4 py-3 text-sm outline-none transition placeholder:text-[#9CA3AF] focus:border-[#111] disabled:bg-[#F5F5F5]"
          />
        </div>

        <div>
          <label
            htmlFor="student-status"
            className="mb-2 block text-sm font-medium"
          >
            Status
          </label>

          <select
            id="student-status"
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={loading}
            className="w-full rounded-xl border border-[#D9DDE5] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#111] disabled:bg-[#F5F5F5]"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>

        <div className="flex items-end justify-end gap-3 md:col-span-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-[#D9DDE5] px-5 py-3 text-sm font-medium transition hover:bg-[#F7F7F8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-[#111] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2A2A2A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? isEditing
                ? "Saving..."
                : "Adding..."
              : isEditing
                ? "Save changes"
                : "Add student"}
          </button>
        </div>
      </form>
    </div>
  );
}
