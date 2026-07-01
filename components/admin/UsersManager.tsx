"use client";
import { useState } from "react";
import type { Role, User } from "@/types";

export function UsersManager({ initial, currentId }: { initial: User[]; currentId: string }) {
  const [users, setUsers] = useState(initial);
  const [error, setError] = useState("");

  async function role(id: string, role: Role) {
    const r = await fetch(`/api/admin/users/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (!r.ok) {
      setError("Could not update role");
      return;
    }
    setUsers((v) => v.map((u) => (u.id === id ? { ...u, role } : u)));
  }
  async function remove(id: string) {
    if (!confirm("Delete this user and all account sessions?")) return;
    const r = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    if (r.ok) setUsers((v) => v.filter((u) => u.id !== id));
  }
  return (
    <>
      {error && <div className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}
      <div className="card mt-7 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-[#f1e6d8] text-[10px] uppercase tracking-wider">
            <tr>
              <th className="p-4">User</th>
              <th>Role</th>
              <th>Joined</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr className="border-t border-[#4a302914]" key={u.id}>
                <td className="p-4">
                  <strong>{u.name || "Unnamed user"}</strong>
                  <div className="text-xs text-[#806c64]">{u.email}</div>
                </td>
                <td>
                  <select
                    disabled={u.id === currentId}
                    value={u.role}
                    onChange={(e) => role(u.id, e.target.value as Role)}
                    className="field !min-h-9 !w-auto !py-1"
                  >
                    <option>USER</option>
                    <option>ADMIN</option>
                    <option>SUPER_ADMIN</option>
                  </select>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td className="p-4 text-right">
                  <button
                    disabled={u.id === currentId}
                    onClick={() => remove(u.id)}
                    className="text-xs font-bold text-red-700 disabled:opacity-30"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
