import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { HousePreferenceGateway } from "./-components/HousePreferenceGateway";
import { Toolbar } from "./-components/Toolbar";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col gap-[10px]">
      <HousePreferenceGateway>
        <Toolbar />
        <Outlet />
      </HousePreferenceGateway>
    </div>
  );
}
