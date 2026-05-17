import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/hpms/Dashboards";
export const Route = createFileRoute("/admin/")({ component: AdminDashboard });
