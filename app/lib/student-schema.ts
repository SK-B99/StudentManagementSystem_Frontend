import { z } from "zod";

export const studentSchema = z.object({
  studentId: z
    .string()
    .min(1, "Student ID is required"),

  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),

  phone: z.string().optional(),

  dateOfBirth: z.string().optional(),

  gender: z.string().optional(),

  department: z.string().optional(),

  program: z.string().optional(),

  enrollmentDate: z.string().optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;