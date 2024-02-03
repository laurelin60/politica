import { privateProcedure } from "@/trpc/trpc";
import { db } from "@/db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const getUser = privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await db.user.findFirst({
        where: {
            id: userId
        }
    });
});

export const updateUser = privateProcedure
    .input(z.object({}))
    .mutation(async ({ ctx, input }) => {
        const { userId } = ctx;
        // eslint-disable-next-line no-empty-pattern
        const {} = input;

        const existingUser = await db.user.findFirst({
            where: {
                id: userId
            }
        });

        if (!existingUser) {
            throw new TRPCError({ code: "NOT_FOUND" });
        }

        const updatedUser = await db.user.update({
            where: {
                id: userId
            },
            data: {}
        });

        return updatedUser;
    });