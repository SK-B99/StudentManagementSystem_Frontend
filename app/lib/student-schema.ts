import { z } from "zod";

export const studentSchema = z.object({
  studentId: z
    .string()
    .trim()
    .min(1, "Student ID is required")
    .regex(
      /^[A-Z]{2,5}[0-9]{4,10}$/i,
      "Student ID must contain letters followed by numbers",
    ),

  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
      "First name can only contain letters",
    ),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
      "Last name can only contain letters",
    ),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number is too short")
    .regex(
      /^\+?[0-9\s()-]+$/,
      "Phone number can only contain numbers and valid phone characters",
    ),

  dateOfBirth: z
    .string()
    .optional(),

  gender: z
    .string()
    .min(1, "Please select a gender"),

  department: z
    .string()
    .trim()
    .min(2, "Department is required")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ\s&'-]+$/,
      "Department can only contain letters",
    ),

  program: z
    .string()
    .trim()
    .min(2, "Program is required"),

  enrollmentDate: z
    .string()
    .optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;
