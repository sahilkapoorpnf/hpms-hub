import { useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, MapPin, Upload, X, CheckCircle2, ImageIcon } from "lucide-react";
import { MODULES } from "@/lib/modules";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

type Photo = { url: string; name: string };

export function ProgressUpload() {
  const { user } = useAuth();
  const myTasks = useMemo(
    () => MODULES.tasks.data.filter((t) => !user || t.assignedTo === user.name).slice(0, 8),
    [user],
  );
  const fallbackTasks = MODULES.tasks.data.slice(0, 8);
  const tasks = myTasks.length ? myTasks : fallbackTasks;

  const [taskId, setTaskId] = useState<string>(tasks[0]?.id ?? "");
  const [percent, setPercent] = useState<number>(40);
  const [notes, setNotes] = useState("Foundation reinforcement work completed. Concrete pouring scheduled for tomorrow.");
  const [geo, setGeo] = useState("31.1048, 77.1734");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentTask = tasks.find((t) => t.id === taskId);

  const onPick = (files: FileList | null) => {
    if (!files) return;
    const next: Photo[] = [];
    Array.from(files).forEach((f) => next.push({ url: URL.createObjectURL(f), name: f.name }));
    setPhotos((p) => [...p, ...next].slice(0, 8));
  };

  const captureGeo = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not available");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        toast.success("Geo-location captured");
      },
      () => toast.error("Could not get location"),
    );
  };

  const submit = () => {
    if (!taskId) return toast.error("Pick a task");
    if (photos.length === 0) return toast.error("Attach at least one photo");
    toast.success(`Progress submitted for ${taskId} with ${photos.length} photo(s)`);
    setPhotos([]);
    setNotes("");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Submit Progress</h1>
        <p className="text-sm text-muted-foreground">
          Upload geo-tagged photos and progress notes against your assigned task.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Progress details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Assigned Task</Label>
                <Select value={taskId} onValueChange={setTaskId}>
                  <SelectTrigger><SelectValue placeholder="Select task" /></SelectTrigger>
                  <SelectContent>
                    {tasks.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.id} — {t.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">Progress %</Label>
                <Input type="number" min={0} max={100} value={percent} onChange={(e) => setPercent(Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Geo-tag</Label>
              <div className="flex gap-2">
                <Input value={geo} onChange={(e) => setGeo(e.target.value)} />
                <Button type="button" variant="outline" onClick={captureGeo}>
                  <MapPin className="mr-1 h-4 w-4" /> Capture
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Work notes</Label>
              <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Site photos</Label>
              <div
                onClick={() => inputRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 p-8 text-center hover:bg-muted/50"
              >
                <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                <div className="text-sm font-medium">Click to attach photos</div>
                <div className="text-xs text-muted-foreground">JPG / PNG — up to 8 photos</div>
                <input
                  ref={inputRef} type="file" multiple accept="image/*"
                  className="hidden" onChange={(e) => onPick(e.target.files)}
                />
              </div>
              {photos.length > 0 && (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {photos.map((p, i) => (
                    <div key={i} className="group relative overflow-hidden rounded-md border">
                      <img src={p.url} alt={p.name} className="h-24 w-full object-cover" />
                      <button
                        onClick={() => setPhotos((ph) => ph.filter((_, j) => j !== i))}
                        className="absolute right-1 top-1 rounded-full bg-background/80 p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t pt-3">
              <Button variant="outline" onClick={() => { setPhotos([]); setNotes(""); }}>Reset</Button>
              <Button onClick={submit}>
                <CheckCircle2 className="mr-1 h-4 w-4" /> Submit Progress
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Task summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {currentTask ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Task ID</span>
                  <span className="font-mono text-xs">{currentTask.id}</span>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Title</div>
                  <div className="font-medium">{currentTask.title}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Project</div>
                  <div>{currentTask.project}</div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Priority</span>
                  <Badge variant="outline">{currentTask.priority}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Due</span>
                  <span>{currentTask.dueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Progress</span>
                  <Badge>{currentTask.progress}</Badge>
                </div>
                <div className="rounded-md border bg-muted/30 p-2 text-xs text-muted-foreground">
                  <Camera className="mr-1 inline h-3 w-3" /> Photos uploaded are stored against this task as a progress update for admin review.
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center py-8 text-muted-foreground">
                <ImageIcon className="mb-2 h-8 w-8" />
                <span className="text-sm">No task selected</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
