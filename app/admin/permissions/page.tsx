"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getAllPermissions, getRole, saveRole, type Permission } from "@/app/lib/db";
import { ArrowLeft, ShieldCheck, Check, Save } from "lucide-react";

export default function RolePermissionsPage() {
  const params = useParams();
  const router = useRouter();
  const roleId = params.id as string;

  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [allPerms, roleData] = await Promise.all([
          getAllPermissions(),
          getRole(roleId),
        ]);

        setPermissions(allPerms);
        if (roleData) {
          setRoleName(roleData.name);
          setSelectedPermissions(roleData.permissions || []);
        }
      } catch (error) {
        console.error("Error fetching permissions/role data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [roleId]);

  const handleCheckboxChange = (permId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveRole(roleId, roleName, selectedPermissions);
      alert("Permissions updated successfully!");
      router.push("/admin/roles");
    } catch (error) {
      console.error("Failed to save permissions:", error);
      alert("Error saving permissions.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 max-w-4xl mx-auto">
      {/* Top Back Link & Header */}
      <div className="mb-6">
        <Link
          href="/admin/roles"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition"
        >
          <ArrowLeft size={14} />
          Back to Roles
        </Link>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Configure Permissions
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Role: <span className="font-semibold text-slate-800">{roleName || roleId}</span> (<span className="font-mono text-xs text-slate-400">{roleId}</span>)
            </p>
          </div>
        </div>
      </div>

      {/* Permissions Checkbox Card Grid */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm mb-6">
        <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Available System Permissions</h2>
        </div>

        <div className="p-6 divide-y divide-slate-100">
          {loading ? (
            <p className="py-8 text-center text-sm text-slate-500">Loading permissions...</p>
          ) : permissions.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-sm text-slate-500">
                No permissions found in Firestore. Add documents to the <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">permissions</code> collection first.
              </p>
            </div>
          ) : (
            permissions.map((perm) => {
              const isChecked = selectedPermissions.includes(perm.id);
              return (
                <label
                  key={perm.id}
                  className={`flex items-start gap-4 py-4.5 cursor-pointer transition first:pt-0 last:pb-0`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(perm.id)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-800">{perm.name}</p>
                      <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-500">
                        {perm.id}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{perm.description}</p>
                  </div>
                </label>
              );
            })
          )}
        </div>
      </section>

      {/* Footer Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-50 transition"
        >
          <Save size={16} />
          {saving ? "Saving changes..." : "Save changes"}
        </button>
        <Link
          href="/admin/roles"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          Cancel
        </Link>
      </div>
    </main>
  );
}