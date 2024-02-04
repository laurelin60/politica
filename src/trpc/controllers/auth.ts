import { db } from "@/db";
import { publicProcedure } from "@/trpc/trpc";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";

export const authCallback = publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    });

    if (!dbUser) {
        console.log("no user");
        await db.user.create({
            data: {
                id: user.id,
                email: user.email,
            },
        });
    }

    return { success: true };
});
