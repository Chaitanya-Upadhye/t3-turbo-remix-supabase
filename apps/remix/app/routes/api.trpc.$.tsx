import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "@acme/api";

// Both Action and Loaders will point to tRPC Router
export const loader = async (args: LoaderFunctionArgs) => {
  return handleRequest(args);
};
export const action = async (args: ActionFunctionArgs) => {
  return handleRequest(args);
};
function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
  const trpcReqHeaders = new Headers();
  trpcReqHeaders.append("x-trpc-source", "react-client");

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: args.request,
    router: appRouter,

    createContext: createTRPCContext,
  });
}
