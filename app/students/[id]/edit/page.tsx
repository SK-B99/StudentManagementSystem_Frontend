"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import StudentForm from "@/app/components/StudentForm";
import Delete from "@/app/components/DeleteStudentButton"; 
import {
  deleteStudent,
  getStudent,
  updateStudent,
} from "@/app/lib/api";
import { StudentFormData } from "@/app/lib/student-schema";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [student, setStudent] = useState<StudentFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const data = await getStudent(id);

        setStudent({
          studentId: data.studentId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone || "",
          dateOfBirth: data.dateOfBirth
            ? data.dateOfBirth.split("T")[0]
            : "",
          gender: data.gender || "",
          department: data.department || "",
          program: data.program || "",
          enrollmentDate: data.enrollmentDate
            ? data.enrollmentDate.split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Failed to fetch student:", error);
        alert("Failed to load student");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchStudent();
    }
  }, [id]);

  const handleUpdate = async (data: StudentFormData) => {
    try {
      await updateStudent(id, data);

      alert("Student updated successfully");

      router.push(`/students/${id}`);
    } catch (error) {
      console.error("Failed to update student:", error);
      alert("Failed to update student");
    }
  };

  const handleDeleted = () => {
    router.push("/");
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
          Student not found
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black">
          Edit Student
        </h1>

        <p className="mt-2 text-gray-500">
          Update the student's information below.
        </p>
      </div>

      <StudentForm
        initialData={student}
        onSubmit={handleUpdate}
        submitText="Update Student"
      />

      <section className="mt-10 border-t border-gray-200 pt-8">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-black">
            Delete student
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Permanently remove this student from the directory.
            This action cannot be undone.
          </p>
        </div>

        <Delete
          studentId={id}
          onDeleted={handleDeleted}
        />
      </section>
    </main>
  );
}
