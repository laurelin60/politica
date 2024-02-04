import { authCallback } from "@/trpc/controllers/auth";
import { getBillById, getLegislatorBills, getBillByPrompt } from "@/trpc/controllers/bill";
import { getUser, updateUser } from "@/trpc/controllers/user";
import { writeEmailToLegislator, getLegislatorSummary } from "@/trpc/controllers/legislator";

import { router } from "./trpc";

export const appRouter = router({
    authCallback: authCallback,
    getUser: getUser,
    updateUser: updateUser,
    getBillById: getBillById,
    getLegislatorBills: getLegislatorBills,
    getBillByPrompt: getBillByPrompt,
    writeEmailToLegislator: writeEmailToLegislator,
    getLegislatorSummary: getLegislatorSummary
});

export type AppRouter = typeof appRouter;
