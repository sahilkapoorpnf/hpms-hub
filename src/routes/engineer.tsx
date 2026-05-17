import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/hpms/DashboardLayout";

export const Route = createFileRoute("/engineer")({
  component: () => <DashboardLayout role="engineer" />,
});
