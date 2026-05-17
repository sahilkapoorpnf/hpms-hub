import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "superadmin" | "admin" | "engineer";
export type User = { id: string; name: string; email: string; role: Role; avatar?: string };

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "superadmin@himuda.hp.gov.in": {
    password: "admin123",
    user: { id: "u1", name: "Rakesh Sharma", email: "superadmin@himuda.hp.gov.in", role: "superadmin" },
  },
  "admin@himuda.hp.gov.in": {
    password: "admin123",
    user: { id: "u2", name: "Priya Verma", email: "admin@himuda.hp.gov.in", role: "admin" },
  },
  "engineer@himuda.hp.gov.in": {
    password: "admin123",
    user: { id: "u3", name: "Anil Kumar", email: "engineer@himuda.hp.gov.in", role: "engineer" },
  },
};

type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("himuda_user") : null;
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  const login = async (email: string, password: string) => {
    const rec = DEMO_USERS[email.toLowerCase().trim()];
    if (!rec || rec.password !== password) throw new Error("Invalid credentials");
    setUser(rec.user);
    localStorage.setItem("himuda_user", JSON.stringify(rec.user));
    return rec.user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("himuda_user");
  };

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}

export const dashboardPath = (role: Role) => `/${role}`;
