"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Search,
  UserRound,
  Users,
} from "lucide-react";

import { getStudents } from "@/app/lib/api";
import { Student } from "./types/students";
import DashboardHeader from "./components/DashboardHeader";

function getInitials(student: Student) {
  return `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`.toUpperCase();
}

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return students;
    }

    return students.filter((student) => {
      const values = [
        student.firstName,
        student.lastName,
        student.studentId,
        student.email,
        student.department,
        student.program,
      ];

      return values.some((value) =>
        value?.toLowerCase().includes(term)
      );
    });
  }, [students, search]);

  const totalStudents = students.length;

  const programsRepresented = new Set(
    students
      .map((student) => student.program)
      .filter(Boolean)
  ).size;

  const stats = [
    {
      label: "Total students",
      value: totalStudents,
      icon: Users,
    },
    {
      label: "Active students",
      value: totalStudents,
      icon: GraduationCap,
    },
    {
      label: "Programs represented",
      value: programsRepresented,
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="mx-auto max-w-[1420px] px-6 pb-16 lg:px-0">
        <section className="pt-10">
          <div className="flex items-center gap-2 text-sm text-black">
            <span>Overview</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium">2026</span>
          </div>

          <h1 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-0.03em] text-black sm:text-[38px]">
            Keep your student directory current.
          </h1>

          <p className="mt-2 text-[17px] text-gray-500">
            A simple, focused place to view, update, and manage student
            information.
          </p>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="min-h-[194px] rounded-[17px] border border-gray-200 bg-white p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                <Icon size={22} strokeWidth={1.7} />
              </div>

              <div className="mt-7">
                <p className="text-[16px] text-gray-500">{label}</p>

                <p className="mt-1 text-[35px] font-medium tracking-tight">
                  {loading ? "—" : value}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 overflow-hidden rounded-[17px] border border-gray-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-5 sm:px-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="text-[18px] font-semibold">All students</h2>

              <p className="mt-1 text-[15px] text-gray-500">
                {filteredStudents.length}{" "}
                {filteredStudents.length === 1 ? "record" : "records"} shown
              </p>
            </div>

            <div className="relative">
              <Search
                size={19}
                strokeWidth={1.7}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students..."
                aria-label="Search students"
                className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-[15px] outline-none transition placeholder:text-gray-500 focus:border-gray-400 sm:w-[315px]"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-gray-500">Loading students...</p>
            </div>
          ) : error ? (
            <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
              <div>
                <h3 className="font-semibold">Unable to load students</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Something went wrong while loading the directory.
                </p>
              </div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="flex min-h-[310px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-5 text-gray-400">
                <UserRound size={45} strokeWidth={1.4} />
              </div>

              <h3 className="text-[18px] font-semibold">
                No students found
              </h3>

              <p className="mt-2 text-[16px] text-gray-500">
                Add a student or adjust your search.
              </p>

              <Link
                href="/students/new"
                className="mt-5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Add student
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/60">
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Student ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Program
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                            {getInitials(student)}
                          </div>

                          <div>
                            <p className="font-medium text-black">
                              {student.firstName} {student.lastName}
                            </p>

                            <p className="mt-0.5 text-sm text-gray-500">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.studentId}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.department || "—"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {student.program || "—"}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/students/${student.id}`}
                          className="text-sm font-medium text-black underline-offset-4 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
