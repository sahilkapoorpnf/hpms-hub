import { createFileRoute } from "@tanstack/react-router";
import { EngineerDashboard } from "@/components/hpms/Dashboards";
export const Route = createFileRoute("/engineer/")({ component: EngineerDashboard });
