import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouterRemix, createTRPCContextRemix } from "@acme/api";

// Both Action and Loaders will point to tRPC Router
export const loader = async (args: LoaderFunctionArgs) => {
  return handleRequest(args);
};
export const action = async (args: ActionFunctionArgs) => {
  return handleRequest(args);
};
function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: args.request,
    router: appRouterRemix,
    createContext: ({ req }) => {
      return createTRPCContextRemix(req);
    },
  });
}
