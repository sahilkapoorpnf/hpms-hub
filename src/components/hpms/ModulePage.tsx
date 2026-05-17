import { useEffect, useState } from "react";
import { moduleBySlug } from "@/lib/modules";
import { DataTable } from "./DataTable";
import { RecordDialog } from "./RecordDialog";
import { toast } from "sonner";
import { ProfilePage } from "./ProfilePage";
import { SettingsPage } from "./SettingsPage";
import { ProgressUpload } from "./ProgressUpload";
import { useAuth } from "@/lib/auth";

// Fields that identify "ownership" by an engineer across modules.
const ENGINEER_OWNER_FIELDS = [
  "assignedTo", "engineer", "assignedEngineer", "preparedBy",
  "conductedBy", "inspector", "submittedBy", "uploadedBy",
];

// Slugs that should be scoped to the logged-in engineer.
const ENGINEER_SCOPED_SLUGS = new Set([
  "tasks", "projects", "progress", "dpr", "mb", "monitoring",
  "quality", "drawings", "documents", "approvals",
]);

function scopeRowsForEngineer(slug: string, rows: Record<string, any>[], name: string) {
  if (!ENGINEER_SCOPED_SLUGS.has(slug)) return rows;
  const ownerKey = ENGINEER_OWNER_FIELDS.find((k) => rows[0] && k in rows[0]);
  if (!ownerKey) return rows;
  // First try a strict filter
  const mine = rows.filter((r) => String(r[ownerKey] ?? "").toLowerCase() === name.toLowerCase());
  if (mine.length > 0) return mine;
  // Demo fallback: re-assign first ~6 rows to current engineer so the listing isn't empty
  return rows.slice(0, 6).map((r) => ({ ...r, [ownerKey]: name }));
}

export function ModulePage({ slug }: { slug: string }) {
  if (slug === "profile") return <ProfilePage />;
  if (slug === "settings") return <SettingsPage />;
  if (slug === "submit-progress") return <ProgressUpload />;

  const mod = moduleBySlug(slug);
  const { user } = useAuth();
  const initial = (): Record<string, any>[] => {
    const base = mod?.data ?? [];
    if (user?.role === "engineer") return scopeRowsForEngineer(slug, base, user.name);
    return base;
  };
  const [rows, setRows] = useState<Record<string, any>[]>(initial);
  // Reset rows whenever the module slug (or user) changes so we don't leak
  // the previous module's records into the new module's columns.
  useEffect(() => {
    setRows(initial());
    setOpen(false);
    setCurrent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, user?.id]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"view" | "edit" | "create">("create");
  const [current, setCurrent] = useState<Record<string, any> | null>(null);

  const title = mod?.title ?? "Module";

  const handleSave = (data: Record<string, any>) => {
    if (mode === "create") {
      const id = `NEW-${Date.now().toString().slice(-5)}`;
      setRows([{ ...data, id }, ...rows]);
      toast.success("Record created");
    } else if (mode === "edit" && current) {
      setRows(rows.map((r) => (r.id === current.id ? { ...current, ...data } : r)));
      toast.success("Record updated");
    }
  };

  const handleDelete = (row: Record<string, any>) => {
    setRows(rows.filter((r) => r.id !== row.id));
    toast.success("Record deleted");
  };

  if (!mod) {
    return (
      <div className="rounded-lg border bg-card p-12 text-center text-muted-foreground">
        Module <span className="font-mono font-semibold">{slug}</span> not found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">Manage all {title.toLowerCase()} records with full CRUD, export and filters.</p>
      </div>
      <DataTable
        title={title}
        fields={mod.fields}
        rows={rows}
        onAdd={() => { setMode("create"); setCurrent(null); setOpen(true); }}
        onView={(r) => { setMode("view"); setCurrent(r); setOpen(true); }}
        onEdit={(r) => { setMode("edit"); setCurrent(r); setOpen(true); }}
        onDelete={handleDelete}
      />
      <RecordDialog
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        title={title}
        fields={mod.fields}
        record={current}
        onSave={handleSave}
      />
    </div>
  );
}
