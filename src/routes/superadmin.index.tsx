import { createFileRoute } from "@tanstack/react-router";
import { SuperAdminDashboard } from "@/components/hpms/Dashboards";
export const Route = createFileRoute("/superadmin/")({ component: SuperAdminDashboard });
