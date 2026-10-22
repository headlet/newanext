"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  getAllRoles,
  saveRole,
  deleteRole,
  type Role,
} from "@/app/lib/db/role";
import {
  Plus,
  Search,
  Shield,
  X,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { getFirebaseApp } from "@/app/lib/firebase";
import { getAuth } from "firebase/auth";

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRoleId, setNewRoleId] = useState("");
  const [newRoleName, setNewRoleName] = useState("");

  // Edit state
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [editRoleName, setEditRoleName] = useState("");

  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const currentAuthUser = getAuth(getFirebaseApp()).currentUser;

  // Environment super-admin emails authorization check[cite: 3]
  const excludedEnv =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS ||
    process.env.NEXT_PUBLIC_EXCLUDED_EMAILS ||
    "";

  const superAdminEmails = excludedEnv
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const loggedInEmail = currentAuthUser?.email?.trim().toLowerCase() || "";
  const isCurrentSuperAdmin = superAdminEmails.includes(loggedInEmail);

  useEffect(() => {
    loadRoles();
  }, []);

  async function loadRoles() {
    setLoading(true);
    try {
      const data = await getAllRoles();
      setRoles(data);
    } catch (error) {
      console.error("Failed to load roles:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle Create or Update Role
  async function handleSaveRole(e: React.FormEvent) {
    e.preventDefault();

    if (editingRoleId) {
      const isAdminRole = editingRoleId.toLowerCase() === "admin";
      if (isAdminRole && !isCurrentSuperAdmin) {
        Swal.fire({
          icon: "error",
          title: "Action Denied",
          text: "Only the environment super-admin can edit the Admin role.",
          confirmButtonColor: "#4f46e5",
        });
        return;
      }

      // Update existing role name (keeping current permissions)
      if (!editRoleName.trim()) return;
      setSaving(true);
      try {
        const existingRole = roles.find((r) => r.id === editingRoleId);
        const currentPermissions = existingRole ? existingRole.permissions : [];

        await saveRole(editingRoleId, editRoleName.trim(), currentPermissions);
        setEditingRoleId(null);
        setEditRoleName("");
        await loadRoles();
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Role updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to update role:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error updating role.",
          confirmButtonColor: "#4f46e5",
        });
      } finally {
        setSaving(false);
      }
    } else {
      // Create brand new role
      if (!newRoleId || !newRoleName) return;
      setSaving(true);
      try {
        const roleIdClean = newRoleId.toLowerCase().trim().replace(/\s+/g, "-");
        await saveRole(roleIdClean, newRoleName.trim(), []);
        setNewRoleId("");
        setNewRoleName("");
        setShowAddModal(false);
        await loadRoles();
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: "New role created successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Failed to create role:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error creating role.",
          confirmButtonColor: "#4f46e5",
        });
      } finally {
        setSaving(false);
      }
    }
  }

  // Handle Delete Role
  async function handleDeleteRole(roleId: string, roleName: string) {
    const isAdminRole = roleId.toLowerCase() === "admin" || roleName.toLowerCase() === "admin";

    // Block deletion if user tries to delete admin role and is not the super admin email[cite: 3]
    if (isAdminRole && !isCurrentSuperAdmin) {
      Swal.fire({
        icon: "error",
        title: "Action Denied",
        text: "Only the environment super-admin can delete the Admin role.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    // SweetAlert2 Confirmation Dialog[cite: 4]
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete the role "${roleName}" (${roleId})? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteRole(roleId);
      await loadRoles();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Role "${roleName}" was successfully deleted.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to delete role:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error deleting role.",
        confirmButtonColor: "#4f46e5",
      });
    }
  }

  // Start editing mode for a role
  function startEdit(role: Role) {
    const isAdminRole = role.id.toLowerCase() === "admin" || role.name.toLowerCase() === "admin";

    if (isAdminRole && !isCurrentSuperAdmin) {
      Swal.fire({
        icon: "error",
        title: "Action Denied",
        text: "Only the environment super-admin can edit the Admin role.",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    setEditingRoleId(role.id);
    setEditRoleName(role.name);
    setShowAddModal(false); // Close create modal if open
  }

  const filteredRoles = useMemo(
    () =>
      roles.filter((role) => {
        const searchText = `${role.id} ${role.name}`.toLowerCase();
        return searchText.includes(query.toLowerCase().trim());
      }),
    [roles, query],
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Roles & Permissions
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Define administrative roles, edit display titles, delete roles, and
            manage granular permission checkboxes.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingRoleId(null);
            setNewRoleId("");
            setNewRoleName("");
            setShowAddModal((prev) => !prev);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition"
        >
          <Plus size={17} />
          New role
        </button>
      </div>

      {/* Create/Add Role Modal Form Inline */}
      {showAddModal && !editingRoleId && (
        <div className="mb-6 rounded-2xl border border-violet-200 bg-violet-50/50 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-slate-900">
              Create New Role
            </h3>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>
          </div>
          <form
            onSubmit={handleSaveRole}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <input
              type="text"
              placeholder="Role ID (e.g. moderator)"
              value={newRoleId}
              onChange={(e) => setNewRoleId(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              required
            />
            <input
              type="text"
              placeholder="Role Display Name (e.g. Moderator)"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Role"}
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Container */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search Bar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex w-full items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 sm:max-w-md">
            <Search size={17} className="shrink-0 text-slate-400" />
            <input
              type="search"
              placeholder="Search roles by ID or name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>

        {/* Roles Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">
              Loading roles...
            </div>
          ) : (
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-6 py-4 text-[10px] font-bold tracking-wider text-slate-500">
                    ROLE ID
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold tracking-wider text-slate-500">
                    DISPLAY NAME
                  </th>
                  <th className="px-6 py-4 text-[10px] font-bold tracking-wider text-slate-500">
                    ASSIGNED PERMISSIONS
                  </th>
                  <th className="px-6 py-4 text-right text-[10px] font-bold tracking-wider text-slate-500">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role) => {
                  const isEditing = editingRoleId === role.id;
                  const isAdminRole =
                    role.id.toLowerCase() === "admin" ||
                    role.name.toLowerCase() === "admin";
                  const blockAdminAction = isAdminRole && !isCurrentSuperAdmin;

                  return (
                    <tr
                      key={role.id}
                      className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                            <Shield size={18} />
                          </span>
                          <span className="font-mono text-xs font-semibold text-slate-800">
                            {role.id}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                        {isEditing ? (
                          <form
                            onSubmit={handleSaveRole}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="text"
                              value={editRoleName}
                              onChange={(e) => setEditRoleName(e.target.value)}
                              className="rounded-lg border border-violet-300 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-100"
                              autoFocus
                              required
                            />
                            <button
                              type="submit"
                              disabled={saving}
                              className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingRoleId(null)}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                          </form>
                        ) : (
                          role.name
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          {role.permissions?.length || 0} permissions assigned
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {!isEditing && (
                          <div className="inline-flex items-center gap-2">
                            {/* Manage Permissions Link (Blocked if non-super-admin targets Admin role) */}
                            {blockAdminAction ? (
                              <button
                                type="button"
                                onClick={() => {
                                  Swal.fire({
                                    icon: "error",
                                    title: "Action Denied",
                                    text: "Only the environment super-admin can manage permissions for the Admin role.",
                                    confirmButtonColor: "#4f46e5",
                                  });
                                }}
                                title="Admin role permissions cannot be managed"
                                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-300 opacity-55 cursor-not-allowed transition"
                              >
                                Permissions
                                <ChevronRight
                                  size={14}
                                  className="text-slate-300"
                                />
                              </button>
                            ) : (
                              <Link
                                href={`/admin/roles/${role.id}/permissions`}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                              >
                                Permissions
                                <ChevronRight
                                  size={14}
                                  className="text-slate-400"
                                />
                              </Link>
                            )}

                            {/* Edit Button */}
                            <button
                              type="button"
                              disabled={blockAdminAction}
                              onClick={() => startEdit(role)}
                              title={
                                blockAdminAction
                                  ? "Admin role cannot be edited"
                                  : "Edit Role Name"
                              }
                              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white transition ${
                                blockAdminAction
                                  ? "opacity-30 cursor-not-allowed text-slate-300"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                            >
                              <Pencil size={15} />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              disabled={blockAdminAction}
                              onClick={() =>
                                handleDeleteRole(role.id, role.name)
                              }
                              title={
                                blockAdminAction
                                  ? "Admin role cannot be deleted"
                                  : "Delete Role"
                              }
                              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                                blockAdminAction
                                  ? "opacity-30 cursor-not-allowed border-slate-200 bg-white text-slate-300"
                                  : "border-red-100 bg-red-50 text-red-600 hover:bg-red-100"
                              }`}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}

                {filteredRoles.length === 0 && !loading && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-16 text-center text-sm text-slate-500"
                    >
                      No roles found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}