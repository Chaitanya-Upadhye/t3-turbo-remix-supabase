import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  signIn: publicProcedure.mutation(
    ({ ctx, input = { email: "", password: "" } }) => {
      return ctx.supabase.auth.signInWithPassword(input);
    },
  ),
  signOut: publicProcedure.mutation(({ ctx }) => {
    return ctx.supabase.auth.signOut();
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
} satisfies TRPCRouterRecord;
