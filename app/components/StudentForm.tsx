"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  studentSchema,
  StudentFormData,
} from "@/app/lib/student-schema";

interface StudentFormProps {
  initialData?: StudentFormData;
  onSubmit: (data: StudentFormData) => Promise<void>;
  submitText?: string;
}

export default function StudentForm({
  initialData,
  onSubmit,
  submitText = "Save Student",
}: StudentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="studentId"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Student ID
          </label>

          <input
            id="studentId"
            {...register("studentId")}
            aria-invalid={!!errors.studentId}
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />

          {errors.studentId && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.studentId.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />

          {errors.email && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            First Name
          </label>

          <input
            id="firstName"
            {...register("firstName")}
            aria-invalid={!!errors.firstName}
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />

          {errors.firstName && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Last Name
          </label>

          <input
            id="lastName"
            {...register("lastName")}
            aria-invalid={!!errors.lastName}
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />

          {errors.lastName && (
            <p className="mt-1.5 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Phone
          </label>

          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="dateOfBirth"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Date of Birth
          </label>

          <input
            id="dateOfBirth"
            type="date"
            {...register("dateOfBirth")}
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="gender"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Gender
          </label>

          <select
            id="gender"
            {...register("gender")}
            className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="department"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Department
          </label>

          <input
            id="department"
            {...register("department")}
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="program"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Program
          </label>

          <input
            id="program"
            {...register("program")}
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="enrollmentDate"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Enrollment Date
          </label>

          <input
            id="enrollmentDate"
            type="date"
            {...register("enrollmentDate")}
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
          />
        </div>
      </div>

      <div className="flex justify-end border-t border-gray-100 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}
