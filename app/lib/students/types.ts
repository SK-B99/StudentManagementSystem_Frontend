export type StudentStatus = "Active" | "Inactive" | "Graduated";

export type Student = {
  id: string;
  name: string;
  email: string;
  course: string;
  status: StudentStatus;
};

export type StudentInput = {
  id: string;
  name: string;
  email: string;
  course: string;
  status: StudentStatus;
};
