import { PrismaClient } from "@prisma/client";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as schema from "./schema";

export const prisma = new PrismaClient();

export const db = drizzle(sql, { schema });
