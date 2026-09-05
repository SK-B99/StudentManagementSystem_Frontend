export interface Student {
  id: number;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  department?: string;
  program?: string;
  enrollmentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface StudentsResponse {
  data: Student[];
  meta: StudentsMeta;
}