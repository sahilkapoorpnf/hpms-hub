import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "./StatCard";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  FolderKanban, IndianRupee, Receipt, HardHat, ClipboardList, FileCheck2,
  ShieldCheck, BookOpen, Activity, AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const revenueData = [
  { m: "Apr", v: 32 }, { m: "May", v: 48 }, { m: "Jun", v: 41 },
  { m: "Jul", v: 60 }, { m: "Aug", v: 72 }, { m: "Sep", v: 65 },
  { m: "Oct", v: 88 }, { m: "Nov", v: 95 }, { m: "Dec", v: 110 },
];
const statusPie = [
  { name: "Completed", value: 38, fill: "var(--color-chart-3)" },
  { name: "In Progress", value: 52, fill: "var(--color-chart-1)" },
  { name: "On Hold", value: 14, fill: "var(--color-chart-4)" },
  { name: "Delayed", value: 9, fill: "var(--color-chart-5)" },
];
const deptBars = [
  { d: "PWD", v: 24 }, { d: "Roads", v: 32 }, { d: "Water", v: 18 },
  { d: "Health", v: 12 }, { d: "Power", v: 22 }, { d: "Urban", v: 28 },
];
const activities = [
  { actor: "Priya Verma", action: "approved Bill #BIL-9003", time: "2 min ago", tone: "success" },
  { actor: "Anil Kumar", action: "submitted MB-8004 for review", time: "18 min ago", tone: "info" },
  { actor: "System", action: "Tender TND-7005 awarded to Tata Projects", time: "1 hr ago", tone: "success" },
  { actor: "Rakesh Sharma", action: "added new engineer Sneha Joshi", time: "3 hr ago", tone: "info" },
  { actor: "Anil Kumar", action: "uploaded site photos for PRJ-5002", time: "5 hr ago", tone: "info" },
  { actor: "System", action: "DPR-11002 flagged: workforce below threshold", time: "1 day ago", tone: "warning" },
];

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">{title}</CardTitle></CardHeader>
      <CardContent className="h-[260px] pt-2">{children}</CardContent>
    </Card>
  );
}

function ActivityFeed() {
  const tone = (t: string) => t === "success" ? "bg-success" : t === "warning" ? "bg-warning" : "bg-info";
  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
        <Badge variant="secondary">Live</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((a, i) => (
          <div key={i} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
            <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${tone(a.tone)}`} />
            <div className="min-w-0 flex-1 text-sm">
              <span className="font-medium">{a.actor}</span> <span className="text-muted-foreground">{a.action}</span>
              <div className="text-xs text-muted-foreground">{a.time}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function SuperAdminDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">SuperAdmin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Portal-wide operations overview across all departments.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Projects" value="248" delta="+12 this month" trend="up" icon={FolderKanban} tone="primary" />
        <StatCard label="Total Revenue" value="₹1,284 Cr" delta="+8.4%" trend="up" icon={IndianRupee} tone="success" />
        <StatCard label="Pending Bills" value="42" delta="-5" trend="down" icon={Receipt} tone="warning" />
        <StatCard label="Active Engineers" value="186" delta="+6" trend="up" icon={HardHat} tone="info" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Financial Performance (₹ Cr)">
          <ResponsiveContainer>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
              <Area type="monotone" dataKey="v" stroke="var(--color-chart-1)" fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Projects by Status">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusPie} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                {statusPie.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ActivityFeed />
      </div>
      <ChartCard title="Projects by Department">
        <ResponsiveContainer>
          <BarChart data={deptBars}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="d" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
            <Bar dataKey="v" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage your assigned projects, engineers and approvals.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned Projects" value="42" delta="+3" trend="up" icon={FolderKanban} tone="primary" />
        <StatCard label="Pending Approvals" value="18" delta="+5" trend="up" icon={ShieldCheck} tone="warning" />
        <StatCard label="Active Engineers" value="24" icon={HardHat} tone="info" />
        <StatCard label="Bills to Verify" value="11" delta="-2" trend="down" icon={Receipt} tone="success" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title="Engineer Performance">
          <ResponsiveContainer>
            <BarChart data={[
              { n: "Anil", a: 92 }, { n: "Sneha", a: 88 }, { n: "Karan", a: 76 },
              { n: "Pooja", a: 81 }, { n: "Vikram", a: 95 }, { n: "Meera", a: 70 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="n" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
              <Bar dataKey="a" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Bill Status Trend">
          <ResponsiveContainer>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
              <Line type="monotone" dataKey="v" stroke="var(--color-chart-3)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <ActivityFeed />
    </div>
  );
}

export function EngineerDashboard() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Engineer Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your day at a glance — assigned tasks, DPRs and MBs.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned Tasks" value="14" icon={ClipboardList} tone="primary" />
        <StatCard label="Pending MB" value="6" icon={BookOpen} tone="warning" />
        <StatCard label="DPRs Submitted" value="22" delta="+4 this week" trend="up" icon={FileCheck2} tone="success" />
        <StatCard label="Active Alerts" value="3" icon={AlertCircle} tone="destructive" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Daily Progress (last 9 weeks)">
          <ResponsiveContainer>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="m" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }} />
              <Area type="monotone" dataKey="v" stroke="var(--color-chart-3)" fill="url(#g2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Today's Tasks</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              ["Submit DPR for PRJ-5002", "Due 6:00 PM", "warning"],
              ["Verify MB measurements at site B", "In progress", "info"],
              ["Upload geo-tagged site photos", "Pending", "info"],
              ["Review contractor invoice CON-4003", "Due tomorrow", "success"],
              ["Submit weekly progress summary", "Open", "info"],
            ].map(([t, s, tone], i) => (
              <div key={i} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm font-medium">{t}</div>
                </div>
                <Badge variant="outline" className={tone === "warning" ? "border-warning/40 text-warning" : tone === "success" ? "border-success/40 text-success" : "border-info/40 text-info"}>{s}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
