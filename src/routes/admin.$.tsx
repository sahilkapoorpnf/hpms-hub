import { createFileRoute } from "@tanstack/react-router";
import { ModulePage } from "@/components/hpms/ModulePage";

export const Route = createFileRoute("/admin/$")({
  component: () => {
    const { _splat } = Route.useParams();
    const slug = (_splat || "").split("/")[0] || "";
    return <ModulePage slug={slug} />;
  },
});
