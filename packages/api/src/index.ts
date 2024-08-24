import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { db, prisma } from "@acme/db/client";

import type { AppRouter, AppRouterRemix } from "./root";
import { appRouter, appRouterRemix } from "./root";
import {
  createCallerFactory,
  createCallerFactoryRemix,
  createTRPCContext,
  createTRPCContextRemix,
} from "./trpc";

/**
 * Create a server-side caller for the tRPC API
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
const createCaller = createCallerFactory(appRouter);
const createCallerRemix = createCallerFactoryRemix(appRouterRemix);
const remixCaller = async (req: Request) =>
  createCallerRemix(await createTRPCContextRemix(req));

/**
 * Inference helpers for input types
 * @example
 * type PostByIdInput = RouterInputs['post']['byId']
 *      ^? { id: number }
 **/
type RouterInputs = inferRouterInputs<AppRouter>;
type RouterInputsRemix = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example
 * type AllPostsOutput = RouterOutputs['post']['all']
 *      ^? Post[]
 **/
type RouterOutputs = inferRouterOutputs<AppRouter>;
type RouterOutputsRemix = inferRouterOutputs<AppRouter>;

export {
  createTRPCContext,
  appRouter,
  appRouterRemix,
  createCallerRemix,
  remixCaller,
  createCaller,
  createTRPCContextRemix,
};
export type {
  AppRouter,
  AppRouterRemix,
  RouterInputs,
  RouterOutputs,
  RouterOutputsRemix,
  RouterInputsRemix,
};
