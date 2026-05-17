import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth, dashboardPath } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: LoginPage });

const demo = [
  { role: "SuperAdmin", email: "superadmin@hpms.gov", color: "bg-primary text-primary-foreground" },
  { role: "Admin",      email: "admin@hpms.gov",      color: "bg-info text-info-foreground" },
  { role: "Engineer",   email: "engineer@hpms.gov",   color: "bg-success text-success-foreground" },
];

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("superadmin@hpms.gov");
  const [password, setPassword] = useState("admin123");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to={dashboardPath(user.role)} />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}`);
      navigate({ to: dashboardPath(u.role) });
    } catch (err: any) {
      toast.error(err?.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left panel — brand */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-sidebar p-10 text-sidebar-foreground lg:flex">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
          backgroundSize: "32px 32px, 28px 28px",
        }} />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground shadow-lg">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-wide">HPMS</div>
            <div className="text-xs uppercase tracking-widest text-sidebar-foreground/60">Govt. of India</div>
          </div>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl font-bold leading-tight">Highly Professional Management System</h1>
          <p className="mt-4 text-sidebar-foreground/70">
            A unified, secure portal for project, contractor, measurement-book and billing management across departments.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[["248","Projects"],["186","Engineers"],["₹1.2K Cr","Disbursed"]].map(([v,l]) => (
              <div key={l} className="rounded-md border border-sidebar-border/50 bg-sidebar-accent/40 p-3">
                <div className="text-xl font-bold">{v}</div>
                <div className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-2 text-xs text-sidebar-foreground/60">
          <ShieldCheck className="h-4 w-4" />
          Encrypted • Audited • ISO 27001-aligned
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center bg-background p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-bold">HPMS</div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Govt. of India</div>
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">Sign in to your account</h2>
          <p className="mt-1 text-sm text-muted-foreground">Use your official credentials to access the portal.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs font-medium text-primary hover:underline" onClick={() => toast.info("Password reset link sent to your email")}>Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type={show ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="px-9" />
                <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <Card className="mt-6 p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Demo accounts</div>
            <div className="mt-3 space-y-2">
              {demo.map((d) => (
                <button key={d.email} type="button" onClick={() => { setEmail(d.email); setPassword("admin123"); }}
                  className="flex w-full items-center justify-between rounded-md border p-2 text-left hover:bg-accent">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex h-7 w-7 items-center justify-center rounded text-[10px] font-bold ${d.color}`}>{d.role[0]}</span>
                    <div>
                      <div className="text-sm font-medium">{d.role}</div>
                      <div className="text-xs text-muted-foreground">{d.email}</div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">admin123</span>
                </button>
              ))}
            </div>
          </Card>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            © 2026 HPMS — Highly Professional Management System
          </p>
        </div>
      </div>
    </div>
  );
}
