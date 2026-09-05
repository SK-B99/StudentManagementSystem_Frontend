import { getStudent } from "@/app/lib/api";
import Link from "next/link";
import Delete from "@/app/components/DeleteStudentButton";

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
    <main className="mx-auto max-w-3xl p-8">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-gray-600 hover:text-black"
      >
        ← Back to Home
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Student Details
        </h1>

        <div className="flex gap-3">
          <Link
            href={`/students/${id}/edit`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit Student
          </Link>

          <Delete studentId={id} />
        </div>
      </div>

      <div className="space-y-4 rounded-xl border p-6">
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
