"use client";
import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "url" | "image" | "boolean";
  required?: boolean;
};
type Item = Record<string, unknown> & { id: string };

export function CollectionManager({
  title,
  resource,
  fields,
  readOnly = false,
}: {
  title: string;
  resource: string;
  fields: Field[];
  readOnly?: boolean;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(
        `/api/admin/${resource}?admin=true&limit=100&search=${encodeURIComponent(search)}`,
      );
      const j = await r.json();
      if (!r.ok) throw new Error(j.error?.message);
      setItems(j.data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load data");
    } finally {
      setLoading(false);
    }
  }, [resource, search]);
  useEffect(() => {
    void load();
  }, [load]);
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(
      fields.map((f) => {
        const value = form.get(f.name);
        return [f.name, f.type === "boolean" ? value === "on" : value === "" ? null : value];
      }),
    );
    for (const field of fields.filter((f) => f.type === "image")) {
      const file = form.get(`${field.name}File`) as File;
      if (file?.size) {
        const upload = new FormData();
        upload.set("file", file);
        const response = await fetch("/api/admin/upload", { method: "POST", body: upload });
        const result = await response.json();
        if (!response.ok) {
          setError(result.error?.message || "Upload failed");
          return;
        }
        data[field.name] = result.data.url;
      }
    }
    const r = await fetch(`/api/admin/${resource}${editing ? `/${editing.id}` : ""}`, {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) {
      const j = await r.json();
      setError(j.error?.message || "Save failed");
      return;
    }
    setOpen(false);
    setEditing(null);
    await load();
  }
  async function remove(item: Item) {
    if (!confirm(`Delete ${String(item.name ?? item.title ?? item.email)}? This cannot be undone.`))
      return;
    const r = await fetch(`/api/admin/${resource}/${item.id}`, { method: "DELETE" });
    if (!r.ok) {
      setError("Delete failed");
      return;
    }
    await load();
  }
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Manage content</p>
          <h1 className="mt-2 serif text-4xl">{title}</h1>
        </div>
        {!readOnly && (
          <button
            className="btn"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus size={15} />
            Create new
          </button>
        )}
      </div>
      <div className="card mt-7 p-4">
        <input
          className="field max-w-md"
          placeholder={`Search ${title.toLowerCase()}…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {error && <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}
      <div className="card mt-5 overflow-x-auto">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-[#f1e6d8] text-[10px] uppercase tracking-wider text-[#765f56]">
            <tr>
              <th className="p-4">Name / title</th>
              <th className="p-4">Status / detail</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-8 text-center" colSpan={4}>
                  Loading the beauty desk…
                </td>
              </tr>
            ) : items.length ? (
              items.map((item) => (
                <tr key={item.id} className="border-t border-[#4a302914]">
                  <td className="p-4 font-bold">
                    {String(item.name ?? item.title ?? item.email ?? "—")}
                  </td>
                  <td className="p-4 text-[#7d6961]">
                    {typeof item.isPublished === "boolean"
                      ? item.isPublished
                        ? "Published"
                        : "Draft"
                      : typeof item.isActive === "boolean"
                        ? item.isActive
                          ? "Active"
                          : "Inactive"
                        : String(item.description ?? "—").slice(0, 55)}
                  </td>
                  <td className="p-4 text-[#7d6961]">
                    {item.createdAt ? new Date(String(item.createdAt)).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      {!readOnly && (
                        <button
                          onClick={() => {
                            setEditing(item);
                            setOpen(true);
                          }}
                          className="rounded-lg border p-2"
                        >
                          <Pencil size={15} />
                        </button>
                      )}
                      <button
                        onClick={() => remove(item)}
                        className="rounded-lg border p-2 text-red-700"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-10 text-center text-[#7d6961]" colSpan={4}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 p-4">
          <form
            onSubmit={save}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[24px] bg-[#fbf7f1] p-7"
          >
            <div className="flex justify-between">
              <h2 className="serif text-3xl">
                {editing ? "Edit" : "Create"} {title}
              </h2>
              <button type="button" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            <div className="mt-7 grid gap-4">
              {fields.map((field) => (
                <label className="label" key={field.name}>
                  {field.label}
                  {field.type === "textarea" ? (
                    <textarea
                      required={field.required}
                      name={field.name}
                      defaultValue={String(editing?.[field.name] ?? "")}
                      className="field min-h-28"
                    />
                  ) : field.type === "boolean" ? (
                    <input
                      name={field.name}
                      type="checkbox"
                      defaultChecked={Boolean(editing?.[field.name])}
                      className="h-5 w-5 accent-[#6f1f35]"
                    />
                  ) : field.type === "image" ? (
                    <>
                      <input
                        required={field.required && !editing}
                        type="url"
                        name={field.name}
                        defaultValue={String(editing?.[field.name] ?? "")}
                        placeholder="Existing image URL"
                        className="field"
                      />
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        name={`${field.name}File`}
                        className="field"
                      />
                    </>
                  ) : (
                    <input
                      required={field.required}
                      type={field.type === "url" ? "url" : "text"}
                      name={field.name}
                      defaultValue={String(editing?.[field.name] ?? "")}
                      className="field"
                    />
                  )}
                </label>
              ))}
            </div>
            <button className="btn mt-7 w-full">Save changes</button>
          </form>
        </div>
      )}
    </>
  );
}
