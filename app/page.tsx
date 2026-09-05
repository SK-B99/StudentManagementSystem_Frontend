import DashboardHeader from "./components/DashboardHeader";
import StudentDirectory from "./components/StudentDirectory";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />

      <main className="mx-auto max-w-[1420px] px-6 pb-16 lg:px-0">
        <section className="pt-10">
          <h1 className="mt-5 text-[34px] font-semibold leading-tight tracking-[-0.03em] text-black sm:text-[38px]">
            Keep your student directory current.
          </h1>

          <p className="mt-2 text-[17px] text-gray-500">
            A simple, focused place to view, update, and manage
            student information.
          </p>
        </section>

        <StudentDirectory />
      </main>
    </div>
  );
}
