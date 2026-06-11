import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

export function BlogLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground grain flex flex-col justify-between">
      <div>
        <Nav />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
