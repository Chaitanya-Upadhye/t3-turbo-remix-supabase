import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";

import { env } from "../env";

export const isSecureContext = env.NODE_ENV !== "development";

export const createSupabaseServerClient = (context: {
  req: Request;
  resHeaders: Headers;
}) => {
  return createServerClient(
    env.SUPABASE_URL as string,
    env.SUPABASE_ANON_KEY as string,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(context.req.headers.get("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            context.resHeaders.append(
              "Set-Cookie",
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );
};
