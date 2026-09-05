import { getStudent } from "@/app/lib/api"; 
import Link from "next/link";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function StudentDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const student = await getStudent(id);

  return (
    <main className="max-w-3xl mx-auto p-8">

      <div className="flex justify-between mb-8">

        <h1 className="text-3xl font-bold">
          Student Details
        </h1>

        <Link
          href={`/students/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Edit Student
        </Link>

      </div>

      <div className="border rounded-xl p-6 space-y-4">

        <p>
          <strong>Student ID:</strong>{" "}
          {student.studentId}
        </p>

        <p>
          <strong>Name:</strong>{" "}
          {student.firstName} {student.lastName}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {student.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {student.phone || "-"}
        </p>

        <p>
          <strong>Department:</strong>{" "}
          {student.department || "-"}
        </p>

        <p>
          <strong>Program:</strong>{" "}
          {student.program || "-"}
        </p>

        <p>
          <strong>Gender:</strong>{" "}
          {student.gender || "-"}
        </p>

      </div>

    </main>
  );
}