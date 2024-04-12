import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server";

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: (ctx) => ({
      // you can use this to add stuff to the context
      // like the current user
      // user: ctx.req.user,
    }),
  });
};

export { handler as GET, handler as POST };