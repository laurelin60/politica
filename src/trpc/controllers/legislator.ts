import { db } from "@/db";
import { publicProcedure } from "@/trpc/trpc";
import { z } from "zod";
import { callGemini } from "@/app/api/gemini/gemini.mjs";
import { $Enums } from "@prisma/client";

export const writeEmailToLegislator = publicProcedure
    .input(z.object({ legislatorName: z.string(), bill: z.string() }))
    .query(async (opts) => {
        return { "message": "hi im writing about a bill and im cool and like cookies :)" };
    });