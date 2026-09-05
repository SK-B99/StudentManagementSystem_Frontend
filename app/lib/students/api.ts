import type { Student, StudentInput } from "./types";

const API_URL = "/api/students";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "Something went wrong.";

    try {
      const data = await response.json();

      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(message);
  }

  return response.json();
}

export async function getStudents(): Promise<Student[]> {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return handleResponse<Student[]>(response);
}

export async function createStudent(
  student: StudentInput
): Promise<Student> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  return handleResponse<Student>(response);
}

export async function updateStudent(
  id: string,
  student: StudentInput
): Promise<Student> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  return handleResponse<Student>(response);
}

export async function deleteStudent(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    let message = "Failed to delete student.";

    try {
      const data = await response.json();

      if (data?.message) {
        message = data.message;
      }
    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(message);
  }
}
