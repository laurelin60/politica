import { router } from "./trpc";
import { authCallback } from "@/trpc/controllers/auth";
import { getUser, updateUser } from "@/trpc/controllers/user";
import { getBill } from "@/trpc/controllers/bill";

export const appRouter = router({
    authCallback: authCallback,
    getUser: getUser,
    updateUser: updateUser,
    getBill: getBill
});

export type AppRouter = typeof appRouter;
