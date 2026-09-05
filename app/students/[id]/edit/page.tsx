"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import StudentForm from "@/app/components/StudentForm"; 
import { getStudent, updateStudent } from "@/app/lib/api"
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

  if (loading) {
    return (
      <div className="p-8 text-center">
        Loading student...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-8 text-center">
        Student not found
      </div>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">
        Edit Student
      </h1>

      <p className="text-gray-500 mb-8">
        Update the student's information below.
      </p>

      <StudentForm
        initialData={student}
        onSubmit={handleUpdate}
        submitText="Update Student"
      />
    </main>
  );
}