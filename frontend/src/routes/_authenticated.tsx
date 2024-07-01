import { Outlet, createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";

const Component = () => {
  const { user } = Route.useRouteContext();

  if (!user) {
    return <div>Go to login page</div>;
  }

  return <Outlet />;
};

//@ts-ignore
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    const queryClient = context.queryClient;

    try {
      const data = await queryClient.fetchQuery(userQueryOptions);
      return { user: data };
    } catch (e) {
      return { user: null };
    }
  },
  component: Component,
});
