import {
  Student,
  StudentsResponse,
} from "@/app/types/students";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL is not defined"
  );
}

export async function getStudents(): Promise<StudentsResponse> {
  const response = await fetch(`${API_URL}/students`);

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `Failed to fetch students: ${response.status} - ${error}`
    );
  }

  return response.json();
}

export async function getStudent(
  id: number | string
): Promise<Student> {
  const response = await fetch(`${API_URL}/students/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch student");
  }

  return response.json();
}

export async function createStudent(data: Partial<Student>) {
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Failed to create student: ${response.status} - ${error}`
    );
  }

  return response.json();
}

export async function updateStudent(
  id: number | string,
  data: Partial<Student>
) {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Failed to update student: ${response.status} - ${error}`
    );
  }

  return response.json();
}

export async function deleteStudent(
  id: number | string
) {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Failed to delete student: ${response.status} - ${error}`
    );
  }

  return response.json();
}