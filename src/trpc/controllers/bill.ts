import { publicProcedure } from "@/trpc/trpc";
import { db } from "@/db";
import { z } from "zod";


export const getBillById = publicProcedure.input(z.object({ billId: z.string() })).query(async (opts) => {
    return db.bill.findFirst({
        where: {
            billId: opts.input.billId
        }
    });
});

export const getLegislatorBills = publicProcedure
    .input(z.object({
        authorNameContains: z.string(), // Add this line to accept author name as a parameter
    }))
    .query(async (opts) => {
        return db.bill.findMany({
        where: {
                author: {
                // Perform a join with the Legislator table and filter by author's name
                name: {
                    contains: opts.input.authorNameContains, // Use the contains filter
                },
            },
        },
            select: {
                billId: true,
                measure: true,
                subject: true,
                status: true,
                summary: true,
                // fullText: false, // You don't need to explicitly set this to false.
                author: {
                    select: {
                        name: true,
                        party: true,
                        district: true
                    }
                },
                votes: true
            }
        });
  });
