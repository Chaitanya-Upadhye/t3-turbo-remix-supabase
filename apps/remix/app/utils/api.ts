// app/utils/api.ts
import { createBrowserClient } from "@supabase/ssr";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import superjson from "superjson";

import type { AppRouterRemix } from "@acme/api";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  // Change it to point to you SSR base URL
  return `http://localhost:${process.env.port ?? 5173}`; // dev SSR should use localhost
};

export const client = (SUPBASE_URL: string, SUPABASE_ANON_KEY: string) => {
  const supabase = createBrowserClient(SUPBASE_URL, SUPABASE_ANON_KEY);
  return createTRPCClient<AppRouterRemix>({
    links: [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
      }),
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        transformer: superjson,
        async headers() {
          return {
            Authorization: (await supabase.auth.getSession()).data.session
              ?.access_token,
          };
        },
      }),
    ],
  });
};
