export type StudentStatus = "Active" | "Inactive";

export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  status: StudentStatus;
};
