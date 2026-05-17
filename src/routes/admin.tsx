import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/hpms/DashboardLayout";

export const Route = createFileRoute("/admin")({
  component: () => <DashboardLayout role="admin" />,
});
