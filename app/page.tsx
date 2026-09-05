"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserRound,
  UserRoundCheck,
  Search,
  Plus,
  GraduationCap,
} from "lucide-react";

import { getStudents } from "@/app/lib/api";
import { Student } from "./types/students"; 
import StatsCard from "./components/StatsCard"; 

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await getStudents();

        setStudents(response.data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) => {
    const searchTerm = search.toLowerCase();

    return (
      student.firstName.toLowerCase().includes(searchTerm) ||
      student.lastName.toLowerCase().includes(searchTerm) ||
      student.studentId.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
    );
  });

  const maleStudents = students.filter(
    (student) => student.gender === "Male"
  ).length;

  const femaleStudents = students.filter(
    (student) => student.gender === "Female"
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <main className="p-6 md:p-10">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Overview of your student records.
          </p>
        </div>

        <Link
          href="/students/new"
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Student
        </Link>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Students"
          value={students.length}
          description="Registered student records"
          icon={Users}
        />

        <StatsCard
          title="Male Students"
          value={maleStudents}
          description="Currently registered"
          icon={UserRound}
        />

        <StatsCard
          title="Female Students"
          value={femaleStudents}
          description="Currently registered"
          icon={UserRoundCheck}
        />
      </div>

      {/* Student Records */}
      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Student Records
            </h2>

            <p className="text-sm text-slate-500">
              View and manage all registered students.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Student ID
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Program
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="transition hover:bg-slate-50"
                >
                  {/* Student */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                        {student.firstName.charAt(0)}
                        {student.lastName.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">
                          {student.firstName} {student.lastName}
                        </p>

                        <p className="text-sm text-slate-500">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Student ID */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {student.studentId}
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {student.department || "-"}
                  </td>

                  {/* Program */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {student.program || "-"}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/students/${student.id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <GraduationCap size={16} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="py-16 text-center">
              <Users
                size={40}
                className="mx-auto mb-3 text-slate-300"
              />

              <h3 className="font-medium text-slate-700">
                No students found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}