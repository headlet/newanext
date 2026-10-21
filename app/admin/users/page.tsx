"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Download,
  Plus,
  Search,
  Mail,
  KeyRound,
  MoreHorizontal,
  ArrowUpRight,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  X,
  ShieldAlert,
  UserCheck,
  Clock3,
  MapPin,
  CalendarDays,
  Ellipsis,
  SlidersHorizontal,
  ArrowUpDown,
  CheckCircle2,
  Activity,
  Loader2,
  Trash2,
  Edit3,
  Eye,
  AlertCircle,
} from "lucide-react";
import {
  getAllUsers,
  saveUserProfile,
  getAllRoles,
  type UserProfile,
  type Role,
} from "@/app/lib/db";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { getFirebaseApp } from "@/app/lib/firebase";
import { getAuth } from "firebase/auth";

type UserStatus = "Active" | "Inactive" | "Suspended";

type SystemUser = {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  about?: string;
  roleId?: string; // Linked role ID
  roleName?: string; // Display role name
  initials: string;
  courses: number;
  progress: number;
  status: UserStatus;
  certificates: number;
  learningHours: number;
  joined: string;
  location: string;
};

const tabs = ["All users", "Active", "Inactive", "Suspended"];

// Toast Notification Component
type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all ${
        type === "success" ? "bg-emerald-600" : "bg-rose-600"
      }`}
    >
      {type === "success" ? (
        <CheckCircle2 size={18} />
      ) : (
        <AlertCircle size={18} />
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white/80 hover:text-white">
        <X size={14} />
      </button>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
}) {
  const styles = {
    primary:
      "bg-indigo-600 text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98]",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]",
    danger:
      "bg-rose-600 text-white shadow-sm shadow-rose-200 hover:bg-rose-700 active:scale-[0.98]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

function StatCard({
  label,
  value,
  change,
  icon,
  iconClass,
  note,
}: {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  iconClass: string;
  note: string;
}) {
  const styles: Record<string, string> = {
    violet: "bg-violet-50 text-violet-600 ring-violet-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
  };

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg hover:shadow-slate-200/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${styles[iconClass]}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-500">{note}</span>
        {change && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
            <ArrowUpRight size={13} />
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

function Status({ status }: { status: UserStatus }) {
  const styles: Record<UserStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
    Inactive: "bg-slate-100 text-slate-600 ring-slate-500/15",
    Suspended: "bg-rose-50 text-rose-700 ring-rose-600/15",
  };

  const dotStyles: Record<UserStatus, string> = {
    Active: "bg-emerald-500",
    Inactive: "bg-slate-400",
    Suspended: "bg-rose-500",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress ${value}%`}
      >
        <div
          className={`h-full rounded-full transition-all ${
            value === 100 ? "bg-emerald-500" : "bg-indigo-500"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="min-w-8 text-xs font-semibold tabular-nums text-slate-600">
        {value}%
      </span>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [rolesList, setRolesList] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("All users");
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState<SystemUser | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const currentAuthUser = getAuth(getFirebaseApp()).currentUser;
  const pageSize = 5;

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [usersList, fetchedRoles] = await Promise.all([
        getAllUsers(),
        getAllRoles().catch(() => []),
      ]);

      setRolesList(fetchedRoles);

      if (usersList.length > 0) {
        const filteredList = usersList.filter(
          (u) => u.uid !== currentAuthUser?.uid,
        );

        const mappedUsers: SystemUser[] = filteredList.map((user: any) => {
          const fullName = user.name || "Unnamed User";
          const nameParts = fullName.trim().split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          const initials =
            nameParts.length >= 2
              ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
              : fullName.substring(0, 2).toUpperCase();

          // Match role name if user has roleId or role name stored
          const matchedRole = fetchedRoles.find(
            (r) =>
              r.id === user.roleId ||
              r.id === user.role ||
              r.name === user.role,
          );

          return {
            id: user.uid,
            firstName,
            lastName,
            name: fullName,
            email: user.email || "No email",
            phone: user.phone || "",
            jobTitle: user.jobTitle || "",
            about: user.about || "",
            roleId: matchedRole
              ? matchedRole.id
              : user.roleId || user.role || "",
            roleName: matchedRole ? matchedRole.name : user.role || "User",
            initials,
            courses: user.courses || 2,
            progress: user.progress || 65,
            status: user.status || "Active",
            certificates: user.certificates || 1,
            learningHours: user.learningHours || 40,
            joined: user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Recently",
            location: user.location || "Kathmandu",
          };
        });

        setUsers(mappedUsers);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch database data:", error);
      setToast({ message: "Failed to load user records.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(
    () =>
      users.filter((user) => {
        const matchesSearch = `${user.name} ${user.email}`
          .toLowerCase()
          .includes(query.trim().toLowerCase());
        const matchesStatus = tab === "All users" || user.status === tab;
        return matchesSearch && matchesStatus;
      }),
    [users, query, tab],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pageUsers = filtered.slice(startIndex, startIndex + pageSize);

  const selected = users.find((user) => user.id === selectedId) ?? null;

  const activeCount = users.filter((u) => u.status === "Active").length;
  const certificateCount = users.reduce(
    (total, user) => total + user.certificates,
    0,
  );

  function changeTab(value: string) {
    setTab(value);
    setPage(1);
  }

  function changeSearch(value: string) {
    setQuery(value);
    setPage(1);
  }

  async function handleDelete(user: SystemUser) {
    if (user.roleName?.toLowerCase() === "admin") {
      setToast({
        message: `Action denied: Admins cannot be deleted.`,
        type: "error",
      });
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to permanently delete ${user.name}?`,
      )
    ) {
      return;
    }

    try {
      const db = getFirestore(getFirebaseApp());
      await deleteDoc(doc(db, "users", user.id));

      setUsers((current) => current.filter((item) => item.id !== user.id));
      if (selectedId === user.id) {
        setSelectedId(null);
      }
      setToast({
        message: `${user.name} deleted successfully.`,
        type: "success",
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
      setToast({
        message: "Failed to delete user from database.",
        type: "error",
      });
    }
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingUser) return;

    if (!editingUser.firstName.trim() || !editingUser.lastName.trim()) {
      setToast({
        message: "First name and Last name are required.",
        type: "error",
      });
      return;
    }

    const updatedFullName = `${editingUser.firstName.trim()} ${editingUser.lastName.trim()}`;
    const parts = updatedFullName.split(" ");
    const initials =
      parts.length >= 2
        ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
        : updatedFullName.substring(0, 2).toUpperCase();

    // Find selected role details by roleId
    const selectedRoleObj = rolesList.find((r) => r.id === editingUser.roleId);
    const resolvedRoleName = selectedRoleObj
      ? selectedRoleObj.name
      : editingUser.roleName || "User";

    const payload = {
      name: updatedFullName,
      email: editingUser.email,
      phone: editingUser.phone || "",
      jobTitle: editingUser.jobTitle || "",
      about: editingUser.about || "",
      roleId: editingUser.roleId || "",
      role: resolvedRoleName, // Stores role name/reference
      status: editingUser.status,
    };

    try {
      await saveUserProfile(editingUser.id, payload as Partial<UserProfile>);

      const finalUpdatedRecord: SystemUser = {
        ...editingUser,
        name: updatedFullName,
        initials,
        roleName: resolvedRoleName,
      };

      setUsers((current) =>
        current.map((item) =>
          item.id === finalUpdatedRecord.id ? finalUpdatedRecord : item,
        ),
      );
      setEditingUser(null);
      setToast({
        message: "User profile and role updated successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update user profile:", error);
      setToast({
        message: "Failed to update user role in database.",
        type: "error",
      });
    }
  }

  async function toggleSuspension(user: SystemUser) {
    const suspend = user.status !== "Suspended";
    const newStatus: UserStatus = suspend ? "Suspended" : "Active";

    try {
      await saveUserProfile(user.id, {
        status: newStatus,
      } as Partial<UserProfile>);

      setUsers((current) =>
        current.map((item) =>
          item.id === user.id ? { ...item, status: newStatus } : item,
        ),
      );
      setToast({
        message: `${user.name}'s status changed to ${newStatus}.`,
        type: "success",
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      setToast({ message: "Failed to update status.", type: "error" });
    }
  }

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-7 bg-slate-50/50 pb-8">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Page heading */}
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-indigo-600">Users</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 sm:flex">
              <UserCheck size={25} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Users Management
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage platform users, roles, and account permissions from your
                Firestore database.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total users"
          value={users.length.toLocaleString()}
          icon={<Users size={21} />}
          iconClass="violet"
          note="Synced from Firestore"
        />
        <StatCard
          label="Active users"
          value={activeCount.toLocaleString()}
          icon={<Activity size={21} />}
          iconClass="emerald"
          note="Currently active"
          change="+8.2%"
        />
        <StatCard
          label="New this month"
          value="312"
          icon={<ArrowUpRight size={21} />}
          iconClass="blue"
          note="Compared with last month"
          change="+12.4%"
        />
        <StatCard
          label="Certificates issued"
          value={certificateCount.toLocaleString()}
          icon={<Award size={21} />}
          iconClass="amber"
          note="Across all users"
        />
      </section>

      {/* Main content grid */}
      <section
        className={`grid grid-cols-1 items-start gap-6 transition-all ${selectedId ? "2xl:grid-cols-[minmax(0,1fr)_370px]" : "grid-cols-1"}`}
      >
        {/* User table */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
              <div>
                <h2 className="font-bold text-slate-900">All system users</h2>
                <p className="mt-1 text-xs text-slate-500">
                  View and manage registered user accounts
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-indigo-400 sm:min-w-56">
                  <Search size={16} className="shrink-0 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search users..."
                    value={query}
                    onChange={(event) => changeSearch(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => changeSearch("")}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X size={14} />
                    </button>
                  )}
                </label>
              </div>
            </div>

            <div className="mt-5 flex gap-1 overflow-x-auto border-b border-slate-100">
              {tabs.map((item) => {
                const count =
                  item === "All users"
                    ? users.length
                    : users.filter((user) => user.status === item).length;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => changeTab(item)}
                    className={`relative flex shrink-0 items-center gap-2 px-3 pb-3 pt-1 text-sm font-medium transition ${
                      tab === item
                        ? "text-indigo-600"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {item}
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${tab === item ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"}`}
                    >
                      {count}
                    </span>
                    {tab === item && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-indigo-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[690px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  <th className="px-5 py-4">User</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4">Courses</th>
                  <th className="px-4 py-4">Progress</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {pageUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setSelectedId(user.id)}
                    className={`cursor-pointer transition ${
                      selectedId === user.id
                        ? "bg-indigo-50/60"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xs font-bold text-indigo-700">
                          {user.initials}
                        </span>
                        <span className="min-w-0">
                          <strong className="block truncate text-sm font-semibold text-slate-800">
                            {user.name}
                          </strong>
                          <span className="mt-1 block truncate text-xs text-slate-400">
                            {user.email}
                          </span>
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-slate-600">
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                        {user.roleName || "User"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600">
                        <BookOpen size={14} className="text-slate-400" />
                        {user.courses}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <ProgressBar value={user.progress} />
                    </td>

                    <td className="px-4 py-4">
                      <Status status={user.status} />
                    </td>

                    <td className="px-4 py-4 text-right">
                      <div
                        className="flex items-center justify-end gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          title="View Details"
                          onClick={() => setSelectedId(user.id)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          type="button"
                          title="Edit User"
                          onClick={() => setEditingUser(user)}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <Edit3 size={17} />
                        </button>
                        <button
                          type="button"
                          title={
                            user.roleName?.toLowerCase() === "admin"
                              ? "Admins cannot be deleted"
                              : "Delete User"
                          }
                          onClick={() => handleDelete(user)}
                          className={`rounded-lg p-2 transition ${
                            user.roleName?.toLowerCase() === "admin"
                              ? "opacity-30 cursor-not-allowed text-slate-300"
                              : "text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          }`}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {pageUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-16 text-center text-slate-500"
                    >
                      No users found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-xs text-slate-500">
              Showing {filtered.length === 0 ? 0 : startIndex + 1}–
              {Math.min(startIndex + pageSize, filtered.length)} of{" "}
              {filtered.length} users
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 disabled:opacity-40"
              >
                <ChevronLeft size={14} /> Previous
              </button>
              <span className="text-xs font-medium text-slate-500">
                {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 disabled:opacity-40"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* User profile sidebar */}
        {selected ? (
          <aside className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm 2xl:sticky 2xl:top-6">
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-500 p-4">
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute right-3 top-3 rounded-lg bg-white/15 p-2 text-white transition hover:bg-white/25"
              >
                <X size={16} />
              </button>
              <div className="absolute -bottom-7 left-5 flex h-[68px] w-[68px] items-center justify-center rounded-2xl border-4 border-white bg-indigo-50 text-xl font-bold text-indigo-700 shadow-sm">
                {selected.initials}
              </div>
            </div>

            <div className="p-5 pt-11 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="break-words text-lg font-bold text-slate-900">
                    {selected.name}
                  </h2>
                  <p className="mt-0.5 break-all text-xs text-slate-500">
                    {selected.email}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    {selected.jobTitle && (
                      <span className="text-xs font-semibold text-indigo-600">
                        {selected.jobTitle}
                      </span>
                    )}
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                      {selected.roleName || "User"}
                    </span>
                  </div>
                </div>
                <Status status={selected.status} />
              </div>

              {selected.about && (
                <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700 block mb-1">
                    About:
                  </span>
                  {selected.about}
                </div>
              )}

              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
                {selected.phone && (
                  <span className="inline-flex items-center gap-1.5">
                    📞 {selected.phone}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} /> Joined: {selected.joined}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={14} /> {selected.location}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="secondary"
                  onClick={() => setEditingUser(selected)}
                >
                  <Edit3 size={15} /> Edit
                </Button>
                {selected.roleName?.toLowerCase() !== "admin" && (
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(selected)}
                  >
                    <Trash2 size={15} /> Delete
                  </Button>
                )}
              </div>

              <button
                type="button"
                onClick={() => toggleSuspension(selected)}
                className={`flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  selected.status === "Suspended"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    : "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                }`}
              >
                <ShieldAlert size={16} />
                {selected.status === "Suspended"
                  ? "Reactivate account"
                  : "Suspend account"}
              </button>
            </div>
          </aside>
        ) : null}
      </section>

      {/* Edit User Modal Form */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Edit User Details
              </h3>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500">
                    First name*
                  </label>
                  <input
                    type="text"
                    value={editingUser.firstName}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        firstName: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500">
                    Last name*
                  </label>
                  <input
                    type="text"
                    value={editingUser.lastName}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        lastName: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500">
                  Email address
                </label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500">
                    Phone number
                  </label>
                  <input
                    type="text"
                    value={editingUser.phone || ""}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, phone: e.target.value })
                    }
                    placeholder="+977..."
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500">
                    Job title
                  </label>
                  <input
                    type="text"
                    value={editingUser.jobTitle || ""}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        jobTitle: e.target.value,
                      })
                    }
                    placeholder="e.g. Developer"
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500">
                  Role selection
                </label>
                <select
                  value={editingUser.roleId || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, roleId: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 bg-white"
                >
                  <option value="">Select a role...</option>
                  {rolesList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500">
                  About you
                </label>
                <textarea
                  rows={3}
                  value={editingUser.about || ""}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, about: e.target.value })
                  }
                  placeholder="Short bio or description..."
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500">
                  Status
                </label>
                <select
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      status: e.target.value as UserStatus,
                    })
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="secondary"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
