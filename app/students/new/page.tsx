"use client";

import { useRouter } from "next/navigation";
import StudentForm from "@/app/components/StudentForm"; 
import { createStudent } from "@/app/lib/api"; 
import { StudentFormData } from "@/app/lib/student-schema"; 

export default function NewStudentPage() {
  const router = useRouter();

  const handleCreate = async (data: StudentFormData) => {
    try {
      await createStudent(data);

      alert("Student created successfully");

      router.push("/");
    } catch (error) {
      alert("Failed to create student");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        Add New Student
      </h1>

      <StudentForm
        onSubmit={handleCreate}
        submitText="Add Student"
      />
    </div>
  );
}