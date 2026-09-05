import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar"; 

export const metadata: Metadata = {
  title: "StudentHub",
  description: "Student Records Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <Sidebar />

        <main className="min-h-screen md:ml-64">
          {children}
        </main>
      </body>
    </html>
  );
}