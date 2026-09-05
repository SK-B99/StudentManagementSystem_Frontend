"use client";

import { useForm } from "react-hook-form"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import {
  studentSchema,
  StudentFormData,
} from "@/app/lib/student-schema"

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label>Student ID</label>

        <input
          {...register("studentId")}
          className="w-full border rounded-lg p-3"
        />

        {errors.studentId && (
          <p className="text-red-500 text-sm">
            {errors.studentId.message}
          </p>
        )}
      </div>

      <div>
        <label>First Name</label>

        <input
          {...register("firstName")}
          className="w-full border rounded-lg p-3"
        />

        {errors.firstName && (
          <p className="text-red-500 text-sm">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label>Last Name</label>

        <input
          {...register("lastName")}
          className="w-full border rounded-lg p-3"
        />

        {errors.lastName && (
          <p className="text-red-500 text-sm">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div>
        <label>Email</label>

        <input
          type="email"
          {...register("email")}
          className="w-full border rounded-lg p-3"
        />

        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label>Phone</label>

        <input
          {...register("phone")}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label>Date of Birth</label>

        <input
          type="date"
          {...register("dateOfBirth")}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label>Gender</label>

        <select
          {...register("gender")}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label>Department</label>

        <input
          {...register("department")}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label>Program</label>

        <input
          {...register("program")}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <div>
        <label>Enrollment Date</label>

        <input
          type="date"
          {...register("enrollmentDate")}
          className="w-full border rounded-lg p-3"
        />
      </div>

      <button
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-5 py-3 rounded-lg"
      >
        {isSubmitting ? "Saving..." : submitText}
      </button>
    </form>
  );
}