import { publicProcedure } from "@/trpc/trpc";
import { db } from "@/db";
import { z } from "zod";


export const getBill = publicProcedure.input(z.object({ billId: z.string() })).query(async (opts) => {
    return db.bill.findFirst({
        where: {
            billId: opts.input.billId
        }
    });
});