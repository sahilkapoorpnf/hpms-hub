import { useMemo, useState } from "react";
import { moduleBySlug } from "@/lib/modules";
import { DataTable } from "./DataTable";
import { RecordDialog } from "./RecordDialog";
import { toast } from "sonner";
import { ProfilePage } from "./ProfilePage";
import { SettingsPage } from "./SettingsPage";
import { ProgressUpload } from "./ProgressUpload";

export function ModulePage({ slug }: { slug: string }) {
  if (slug === "profile") return <ProfilePage />;
  if (slug === "settings") return <SettingsPage />;
  if (slug === "submit-progress") return <ProgressUpload />;

  const mod = moduleBySlug(slug);
  const [rows, setRows] = useState<Record<string, any>[]>(() => mod?.data ?? []);
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
