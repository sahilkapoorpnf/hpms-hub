import { useEffect, useState } from "react";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { ModuleField } from "@/lib/modules";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: "view" | "edit" | "create";
  title: string;
  fields: ModuleField[];
  record?: Record<string, any> | null;
  onSave?: (data: Record<string, any>) => void;
};

export function RecordDialog({ open, onOpenChange, mode, title, fields, record, onSave }: Props) {
  const [data, setData] = useState<Record<string, any>>({});
  const readonly = mode === "view";

  useEffect(() => {
    if (open) setData(record ? { ...record } : {});
  }, [open, record]);

  const set = (k: string, v: any) => setData((d) => ({ ...d, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? `New ${title}` : mode === "edit" ? `Edit ${title}` : `${title} Details`}
          </DialogTitle>
          <DialogDescription>
            {mode === "view" ? "Review the record details below." : "Fill in the required fields and save."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[60vh] grid-cols-1 gap-4 overflow-y-auto py-2 md:grid-cols-2">
          {fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label htmlFor={f.key} className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{f.label}</Label>
              {f.type === "select" || f.type === "status" ? (
                <Select disabled={readonly} value={String(data[f.key] ?? "")} onValueChange={(v) => set(f.key, v)}>
                  <SelectTrigger><SelectValue placeholder={`Select ${f.label}`} /></SelectTrigger>
                  <SelectContent>
                    {(f.options || ["Active","Inactive","Pending","Approved"]).map((o) => (
                      <SelectItem key={o} value={o}>{o}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : f.type === "textarea" ? (
                <Textarea id={f.key} readOnly={readonly} value={String(data[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} />
              ) : (
                <Input id={f.key} type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                  readOnly={readonly} value={String(data[f.key] ?? "")} onChange={(e) => set(f.key, e.target.value)} />
              )}
            </div>
          ))}
          {Array.isArray(data.photos) && data.photos.length > 0 && (
            <div className="md:col-span-2 space-y-1.5">
              <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Site Photos ({data.photos.length})
              </Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(data.photos as string[]).map((src, i) => (
                  <a key={i} href={src} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-md border bg-muted">
                    <img
                      src={src}
                      alt={`Site photo ${i + 1}`}
                      loading="lazy"
                      className="h-28 w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground">Click any photo to open the full-resolution version in a new tab.</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{readonly ? "Close" : "Cancel"}</Button>
          {!readonly && <Button onClick={() => { onSave?.(data); onOpenChange(false); }}>Save</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
