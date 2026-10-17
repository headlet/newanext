"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  CircleCheck,
  Wallet,
  ChevronRight,
  Plus,
  MessageCircle,
  RotateCcw,
  UserRoundCheck,
} from "lucide-react";
import type { ReactNode } from "react";

const enrollments = [
  { name: "Aarav Sharma", initials: "AS", course: "Full Stack Web Development", amount: "NPR 12,000", status: "Completed" },
  { name: "Sita Thapa", initials: "ST", course: "Python for Beginners", amount: "NPR 4,500", status: "Completed" },
  { name: "Rohan KC", initials: "RK", course: "UI/UX Design Masterclass", amount: "NPR 8,000", status: "Pending" },
  { name: "Priya Shrestha", initials: "PS", course: "React & Next.js", amount: "NPR 6,500", status: "Completed" },
  { name: "Nabin Rai", initials: "NR", course: "Data Science with Python", amount: "NPR 9,000", status: "Refunded" },
  { name: "Anisha Gurung", initials: "AG", course: "Laravel API Development", amount: "NPR 5,000", status: "Completed" },
];

const courses = [
  { title: "Complete Web Development Bootcamp" },
  { title: "Python & Data Science Masterclass" },
  { title: "React and Next.js from Zero to Pro" },
  { title: "Laravel API Development" },
  { title: "UI/UX Design Fundamentals" },
];

const revenue = [
  { m: "Nov", v: 36 },
  { m: "Dec", v: 48 },
  { m: "Jan", v: 42 },
  { m: "Feb", v: 61 },
  { m: "Mar", v: 55 },
  { m: "Apr", v: 68 },
  { m: "May", v: 58 },
  { m: "Jun", v: 76 },
  { m: "Jul", v: 70 },
  { m: "Aug", v: 83 },
  { m: "Sep", v: 75 },
  { m: "Oct", v: 94 },
];

const categories = [
  { name: "Web Development", value: 34, color: "#6759e8" },
  { name: "Data & AI", value: 24, color: "#39a6a0" },
  { name: "Cloud & DevOps", value: 16, color: "#ed9b43" },
  { name: "Mobile", value: 12, color: "#4789e8" },
  { name: "Design", value: 8, color: "#d76ba3" },
  { name: "Security", value: 6, color: "#9aa4b2" },
];

const attentionItems = [
  {
    title: "Courses awaiting review",
    description: "Review new course submissions",
    count: 5,
    icon: BookOpen,
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "Refund requests",
    description: "Student requests need a decision",
    count: 3,
    icon: RotateCcw,
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "Unanswered student questions",
    description: "Keep learners moving forward",
    count: 12,
    icon: MessageCircle,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Instructor payouts due",
    description: "Scheduled payments",
    count: 2,
    icon: UserRoundCheck,
    color: "bg-emerald-50 text-emerald-600",
  },
];

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="mb-1 text-xs font-semibold tracking-[0.14em] text-slate-500">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      {actions}
    </div>
  );
}

function Button({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  );
}

function StatCard({
  label,
  value,
  change,
  footnote,
  icon,
  iconClass,
}: {
  label: string;
  value: string;
  change: string;
  footnote: string;
  icon: ReactNode;
  iconClass: string;
}) {
  const iconStyles: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    orange: "bg-orange-50 text-orange-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{label}</p>

        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            iconStyles[iconClass] ?? iconStyles.purple
          }`}
        >
          {icon}
        </span>
      </div>

      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-emerald-600">{change}</span>
        <span className="text-slate-400">{footnote}</span>
      </div>
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function PanelHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      {action}
    </div>
  );
}

function Status({
  tone,
  children,
}: {
  tone: string;
  children: ReactNode;
}) {
  const styles: Record<string, string> = {
    completed:
      "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    refunded: "bg-rose-50 text-rose-700 ring-rose-600/20",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[tone] ??
        "bg-slate-100 text-slate-600 ring-slate-500/20"
      }`}
    >
      {children}
    </span>
  );
}

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 ">
      <PageHeader
        eyebrow="SATURDAY, 10 OCTOBER 2026"
        title="Dashboard"
        description="Learning and revenue at a glance"
        actions={
          <Button href="admin/courses/new">
            <Plus size={17} />
            New course
          </Button>
        }
      />

      {/* Statistics cards */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Revenue this month"
          value="NPR 468,000"
          change="+8.7%"
          footnote="vs September"
          icon={<Wallet size={19} />}
          iconClass="green"
        />

        <StatCard
          label="Active students"
          value="12,480"
          change="+312"
          footnote="new this month"
          icon={<GraduationCap size={19} />}
          iconClass="purple"
        />

        <StatCard
          label="Published courses"
          value="64"
          change="+3"
          footnote="9 drafts in progress"
          icon={<BookOpen size={19} />}
          iconClass="orange"
        />

        <StatCard
          label="Completion rate"
          value="61%"
          change="+2.1 pts"
          footnote="vs last quarter"
          icon={<CircleCheck size={19} />}
          iconClass="blue"
        />
      </section>

      {/* Revenue chart and enrollment categories */}
      <section className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <PanelHeading
            title="Revenue"
            description="Monthly, last 12 months · NPR thousands"
            action={
              <div className="flex shrink-0 rounded-lg bg-slate-100 p-1">
                {["12M", "6M", "30D"].map((period) => (
                  <button
                    key={period}
                    type="button"
                    className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
                      period === "30D"
                        ? "bg-white text-violet-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            }
          />

          <div className="flex h-64 gap-3 sm:h-72">
            {/* Y-axis labels */}
            <div className="flex flex-col justify-between pb-7 text-right text-xs text-slate-400">
              {[500, 400, 300, 200, 100, 0].map((number) => (
                <span key={number}>{number}</span>
              ))}
            </div>

            {/* Bar chart */}
            <div className="relative flex min-w-0 flex-1 items-end justify-between gap-1 border-b border-slate-200 bg-[linear-gradient(to_bottom,transparent_99%,#e2e8f0_100%)] bg-[length:100%_20%] px-1 sm:gap-3 sm:px-3">
              {revenue.map((item, index) => (
                <div
                  key={item.m}
                  className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <div className="relative flex h-[calc(100%-28px)] w-full items-end">
                    <div
                      title={`${item.m}: ${item.v}`}
                      className={`w-full rounded-t-md transition-opacity group-hover:opacity-75 ${
                        index === revenue.length - 1
                          ? "bg-violet-600"
                          : "bg-violet-200"
                      }`}
                      style={{ height: `${item.v}%` }}
                    />
                  </div>

                  <span className="mt-2 text-[10px] text-slate-500 sm:text-xs">
                    {item.m}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <span className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2.5 w-2.5 rounded-sm bg-violet-600" />
              Revenue
            </span>

            <div className="flex items-center gap-2">
              <strong className="text-sm text-slate-900">
                NPR 468,000
              </strong>
              <span className="text-xs font-semibold text-emerald-600">
                ↗ 8.7%
              </span>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHeading
            title="Enrollments by category"
            description="Share of new enrollments, this month"
            action={
              <button
                type="button"
                aria-label="More category options"
                className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
              >
                •••
              </button>
            }
          />

          <div className="space-y-5">
            {categories.map((category) => (
              <div key={category.name}>
                <div className="mb-2 flex items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-2 text-slate-600">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </span>

                  <strong className="text-slate-800">
                    {category.value}%
                  </strong>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(category.value / 34) * 100}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/courses"
            className="mt-7 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-violet-600 hover:text-violet-800"
          >
            View course analytics
            <ArrowUpRight size={16} />
          </Link>
        </Panel>
      </section>

      {/* Recent enrollments and right-side panels */}
      <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        {/* Enrollment table */}
        <Panel className="xl:col-span-2">
          <PanelHeading
            title="Recent enrollments"
            description="Latest student purchases"
            action={
              <Link
                href="/payments"
                className="flex shrink-0 items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-800"
              >
                View all
                <ChevronRight size={15} />
              </Link>
            }
          />

          <div className="-mx-5 overflow-x-auto sm:-mx-6">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50/70 text-[10px] font-semibold tracking-wider text-slate-500">
                  <th className="px-5 py-3 sm:px-6">STUDENT</th>
                  <th className="px-4 py-3">COURSE</th>
                  <th className="px-4 py-3">AMOUNT</th>
                  <th className="px-5 py-3 sm:px-6">STATUS</th>
                </tr>
              </thead>

              <tbody>
                {enrollments.map((enrollment) => (
                  <tr
                    key={enrollment.name}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                          {enrollment.initials}
                        </span>

                        <strong className="whitespace-nowrap text-xs font-semibold text-slate-800">
                          {enrollment.name}
                        </strong>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-xs text-slate-500">
                      {enrollment.course}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-xs font-semibold text-slate-800">
                      {enrollment.amount}
                    </td>

                    <td className="px-5 py-4 sm:px-6">
                      <Status tone={enrollment.status.toLowerCase()}>
                        {enrollment.status}
                      </Status>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-400">
            <span>Showing 6 recent transactions</span>

            <Link
              href="/payments"
              className="flex items-center gap-1 font-semibold text-violet-600 hover:text-violet-800"
            >
              See all transactions
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </Panel>

        {/* Right-side panels */}
        <div className="space-y-6">
          {/* Needs attention */}
          <Panel>
            <PanelHeading
              title="Needs attention"
              description="Items that may need your review"
              action={
                <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-rose-50 px-2 text-xs font-bold text-rose-600">
                  4
                </span>
              }
            />

            <div className="space-y-5">
              {attentionItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                    >
                      <Icon size={17} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold leading-5 text-slate-800">
                        {item.title}
                      </p>
                      <p className="text-[11px] leading-4 text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    <strong className="text-sm text-slate-700">
                      {item.count}
                    </strong>
                  </div>
                );
              })}
            </div>
          </Panel>

          {/* Top courses */}
          <Panel>
            <PanelHeading
              title="Top courses this month"
              description="Ranked by enrollment"
              action={
                <button
                  type="button"
                  aria-label="More course options"
                  className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
                >
                  •••
                </button>
              }
            />

            <div className="space-y-4">
              {[
                { name: courses[0].title, count: 1204 },
                { name: courses[1].title, count: 986 },
                { name: courses[2].title, count: 842 },
                { name: courses[4].title, count: 611 },
              ].map((course, index) => (
                <div
                  key={course.name}
                  className="flex items-center gap-3"
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                      index === 0
                        ? "bg-violet-100 text-violet-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <span className="min-w-0 flex-1 text-xs font-medium leading-5 text-slate-700">
                    {course.name}
                  </span>

                  <strong className="shrink-0 text-xs text-slate-900">
                    {course.count.toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>
    </main>
  );
}
