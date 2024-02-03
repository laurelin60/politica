import { router } from "./trpc";
import { authCallback } from "@/trpc/controllers/auth";
import { getUser, updateUser } from "@/trpc/controllers/user";
import { getBillById, getLegislatorBills } from "@/trpc/controllers/bill";

export const appRouter = router({
    authCallback: authCallback,
    getUser: getUser,
    updateUser: updateUser,
    getBillById: getBillById,
    getLegislatorBills: getLegislatorBills,
});

export type AppRouter = typeof appRouter;
