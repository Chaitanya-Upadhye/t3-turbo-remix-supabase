import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure } from "../trpc";

export const postRouter = {
  // Prisma procedures - drizzle ones to be removed later

  prisma_all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({ take: 10 });
  }),
} satisfies TRPCRouterRecord;
