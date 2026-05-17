import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown, ChevronLeft, ChevronRight, Download, Eye, FileSpreadsheet,
  FileText, MoreHorizontal, Pencil, Plus, Search, Trash2,
} from "lucide-react";
import { exportToExcel, exportToPDF } from "@/lib/exports";
import type { ModuleField } from "@/lib/modules";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  fields: ModuleField[];
  rows: Record<string, any>[];
  onAdd?: () => void;
  onView?: (row: Record<string, any>) => void;
  onEdit?: (row: Record<string, any>) => void;
  onDelete?: (row: Record<string, any>) => void;
};

const statusTone = (val: string): string => {
  const v = val?.toLowerCase() || "";
  if (["active","approved","paid","completed","verified","on track","success","awarded"].includes(v)) return "bg-success/15 text-success border-success/30";
  if (["pending","processing","submitted","open","in progress","reviewed"].includes(v)) return "bg-info/15 text-info border-info/30";
  if (["on hold","on leave","warning","delayed"].includes(v)) return "bg-warning/15 text-warning border-warning/30";
  if (["inactive","rejected","blacklisted","closed","cancelled","issue","unread"].includes(v)) return "bg-destructive/15 text-destructive border-destructive/30";
  return "bg-muted text-muted-foreground border-border";
};

export function DataTable({ title, fields, rows, onAdd, onView, onEdit, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const statusValues = useMemo(() => {
    const s = new Set<string>();
    rows.forEach((r) => r.status && s.add(String(r.status)));
    return Array.from(s);
  }, [rows]);

  const filtered = useMemo(() => {
    let r = rows;
    if (search.trim()) {
      const q = search.toLowerCase();
      r = r.filter((row) => Object.values(row).some((v) => String(v ?? "").toLowerCase().includes(q)));
    }
    if (statusFilter !== "all") r = r.filter((row) => String(row.status) === statusFilter);
    if (sortKey) {
      r = [...r].sort((a, b) => {
        const av = a[sortKey]; const bv = b[sortKey];
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return r;
  }, [rows, search, sortKey, sortDir, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const toggleAll = () => {
    if (selected.size === pageRows.length) setSelected(new Set());
    else setSelected(new Set(pageRows.map((r) => String(r.id))));
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <Badge variant="secondary" className="font-mono">{filtered.length}</Badge>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search..." className="h-9 pl-8 w-[200px]" />
          </div>
          {statusValues.length > 0 && (
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
              <SelectTrigger className="h-9 w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusValues.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          )}
          <Button variant="outline" size="sm" className="h-9" onClick={() => exportToExcel(filtered, title)}>
            <FileSpreadsheet className="mr-1 h-4 w-4" /> Excel
          </Button>
          <Button variant="outline" size="sm" className="h-9" onClick={() => exportToPDF(filtered, title, title)}>
            <FileText className="mr-1 h-4 w-4" /> PDF
          </Button>
          {onAdd && (
            <Button size="sm" className="h-9" onClick={onAdd}>
              <Plus className="mr-1 h-4 w-4" /> Add New
            </Button>
          )}
        </div>
      </div>

      {selected.size > 0 && (
        <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2 text-sm">
          <span className="text-muted-foreground">{selected.size} selected</span>
          <Button size="sm" variant="ghost"><Download className="mr-1 h-4 w-4" /> Export</Button>
          <Button size="sm" variant="ghost" className="text-destructive"><Trash2 className="mr-1 h-4 w-4" /> Bulk Delete</Button>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="w-10">
                <Checkbox checked={pageRows.length > 0 && selected.size === pageRows.length} onCheckedChange={toggleAll} />
              </TableHead>
              {fields.map((f) => (
                <TableHead key={f.key}>
                  <button onClick={() => toggleSort(f.key)} className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary">
                    {f.label} <ArrowUpDown className="h-3 w-3 opacity-50" />
                  </button>
                </TableHead>
              ))}
              <TableHead className="w-16 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.length === 0 && (
              <TableRow>
                <TableCell colSpan={fields.length + 2} className="py-12 text-center text-muted-foreground">
                  No records found
                </TableCell>
              </TableRow>
            )}
            {pageRows.map((row) => {
              const id = String(row.id);
              const isSel = selected.has(id);
              return (
                <TableRow key={id} className={cn(isSel && "bg-accent/40")}>
                  <TableCell>
                    <Checkbox checked={isSel} onCheckedChange={(c) => {
                      const next = new Set(selected);
                      if (c) next.add(id); else next.delete(id);
                      setSelected(next);
                    }} />
                  </TableCell>
                  {fields.map((f) => (
                    <TableCell key={f.key} className="whitespace-nowrap">
                      {f.type === "status" ? (
                        <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", statusTone(String(row[f.key])))}>
                          {String(row[f.key])}
                        </span>
                      ) : (
                        <span className={f.key === "id" ? "font-mono text-xs text-muted-foreground" : ""}>{String(row[f.key] ?? "")}</span>
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onView?.(row)}><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit?.(row)}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => onDelete?.(row)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 border-t p-3 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Rows per page</span>
          <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}>
            <SelectTrigger className="h-8 w-[70px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {[10, 20, 50, 100].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          <span>•&nbsp;Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="outline" className="h-8 w-8" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="px-3 font-mono text-xs">{page} / {pageCount}</div>
          <Button size="icon" variant="outline" className="h-8 w-8" disabled={page === pageCount} onClick={() => setPage((p) => p + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
