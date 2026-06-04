import { createFileRoute } from "@tanstack/react-router";
import { HUDLayout } from "@/components/site/HUDLayout";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <HUDLayout />;
}
