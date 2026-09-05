"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import StudentForm from "@/app/components/StudentForm";
import { getStudent, updateStudent } from "@/app/lib/api";
import { StudentFormData } from "@/app/lib/student-schema";

function toFormData(
  student: Awaited<ReturnType<typeof getStudent>>
): StudentFormData {
  return {
    studentId: student.studentId,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    phone: student.phone ?? "",
    dateOfBirth: student.dateOfBirth?.split("T")[0] ?? "",
    gender: student.gender ?? "",
    department: student.department ?? "",
    program: student.program ?? "",
    enrollmentDate: student.enrollmentDate?.split("T")[0] ?? "",
  };
}

export default function EditStudentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [student, setStudent] = useState<StudentFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadStudent = async () => {
      try {
        const data = await getStudent(id);
        setStudent(toFormData(data));
      } catch (error) {
        console.error("Failed to fetch student:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [id]);

  const handleUpdate = async (data: StudentFormData) => {
    const confirmed = window.confirm(
      "Are you sure you want to update this student's information?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await updateStudent(id, data);

      alert("Student updated successfully");
      router.push(`/students/${id}`);
    } catch (error) {
      console.error("Failed to update student:", error);
      alert("Failed to update student");
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <p className="text-center text-sm text-gray-500">
          Loading student...
        </p>
      </main>
    );
  }

  if (!student) {
    return (
      <main className="mx-auto max-w-2xl p-8">
        <p className="text-center text-sm text-gray-500">
          Student not found.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <button
        type="button"
        onClick={() => router.push("/")}
        className="mb-6 text-sm text-gray-600 hover:text-black"
      >
        ← Back to Home
      </button>

      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black">
          Edit Student
        </h1>

        <p className="mt-2 text-gray-500">
          Update the student's information below.
        </p>
      </header>

      <StudentForm
        initialData={student}
        onSubmit={handleUpdate}
        submitText="Update Student"
      />
    </main>
  );
}
