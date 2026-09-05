"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { deleteStudent } from "@/app/lib/api";

interface DeleteProps {
  studentId: string;
}

export default function Delete({ studentId }: DeleteProps) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

 async function handleDelete() {
  const confirmed = window.confirm(
    "Are you sure you want to delete this student? This action cannot be undone."
  );

  if (!confirmed) {
    return;
  }

  try {
    setDeleting(true);

    await deleteStudent(studentId);

    router.push("/");
  } catch (error) {
    console.error("Failed to delete student:", error);

    window.alert("Failed to delete student. Please try again.");

    setDeleting(false);
  }
}


  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={16} strokeWidth={1.8} />

      {deleting ? "Deleting..." : "Delete student"}
    </button>
  );
}
