import {
  Student,
  StudentsResponse,
} from "@/app/types/students";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

interface GetStudentsParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  program?: string;
}

async function getErrorMessage(
  response: Response,
  fallback: string,
): Promise<string> {
  try {
    const body = await response.json();

    if (typeof body.message === "string") {
      return body.message;
    }

    if (Array.isArray(body.message)) {
      return body.message.join(", ");
    }

    return fallback;
  } catch {
    return fallback;
  }
}

export async function getStudents(
  params: GetStudentsParams = {},
): Promise<StudentsResponse> {
  const {
    page = 1,
    limit = 10,
    search,
    department,
    program,
  } = params;

  const queryParams = new URLSearchParams();

  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));

  if (search?.trim()) {
    queryParams.set("search", search.trim());
  }

  if (department?.trim()) {
    queryParams.set("department", department.trim());
  }

  if (program?.trim()) {
    queryParams.set("program", program.trim());
  }

  const response = await fetch(
    `${API_URL}/students?${queryParams.toString()}`,
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Failed to fetch students (${response.status})`,
    );

    throw new Error(message);
  }

  return response.json();
}

export async function getStudent(
  id: number | string,
): Promise<Student> {
  const response = await fetch(
    `${API_URL}/students/${id}`,
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Failed to fetch student (${response.status})`,
    );

    throw new Error(message);
  }

  return response.json();
}

export async function createStudent(
  data: Partial<Student>,
) {
  const response = await fetch(`${API_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json();

    throw new Error(
      errorBody.message ||
        `Failed to create student (${response.status})`,
    );
  }

  return response.json();
}


export async function updateStudent(
  id: number | string,
  data: Partial<Student>,
) {
  const response = await fetch(
    `${API_URL}/students/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Failed to update student (${response.status})`,
    );

    throw new Error(message);
  }

  return response.json();
}

export async function deleteStudent(
  id: number | string,
) {
  const response = await fetch(
    `${API_URL}/students/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      `Failed to delete student (${response.status})`,
    );

    throw new Error(message);
  }

  return response.json();
}
