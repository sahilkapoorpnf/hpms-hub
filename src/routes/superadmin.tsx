import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/hpms/DashboardLayout";

export const Route = createFileRoute("/superadmin")({
  component: () => <DashboardLayout role="superadmin" />,
});
