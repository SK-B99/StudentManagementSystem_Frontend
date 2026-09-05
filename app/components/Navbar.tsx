"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Dashboard",
    },
    {
      href: "/students/new",
      label: "Add Student",
    },
  ];

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          Student Management
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "font-semibold text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
