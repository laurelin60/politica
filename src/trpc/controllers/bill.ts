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
    billId: z.string(),
    authorNameContains: z.string(), // Add this line to accept author name as a parameter
  }))
  .query(async (opts) => {
    return db.bill.findMany({
      where: {
        billId: opts.input.billId,
        author: {
          // Perform a join with the Legislator table and filter by author's name
          name: {
            contains: opts.input.authorNameContains, // Use the contains filter
          },
        },
      },
      include: {
        author: true, // Include the author data in the result
      },
    });
  });
