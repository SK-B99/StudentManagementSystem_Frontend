"use client";

import { useRouter } from "next/navigation";
import StudentForm from "@/app/components/StudentForm";
import { createStudent } from "@/app/lib/api";
import { StudentFormData } from "@/app/lib/student-schema";

export default function NewStudentPage() {
  const router = useRouter();

  const handleCreate = async (data: StudentFormData) => {
    const confirmed = window.confirm(
      "Are you sure you want to add this student?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await createStudent(data);

      alert("Student created successfully");
      router.push("/");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to create student"
      );
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-8">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="mb-6 text-sm text-gray-600 hover:text-black"
      >
        ← Back to Home
      </button>

      <h1 className="mb-6 text-2xl font-bold">
        Add New Student
      </h1>

      <StudentForm
        onSubmit={handleCreate}
        submitText="Add Student"
      />
    </div>
  );
}
