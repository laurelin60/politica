import { authCallback } from "@/trpc/controllers/auth";
import {
    getBillById,
    getBillByPrompt,
    getLegislatorBills,
} from "@/trpc/controllers/bill";
import {
    getLegislatorsByZip,
    getLegislatorSummary,
    writeEmailToLegislator,
} from "@/trpc/controllers/legislator";
import { getUser, updateUser } from "@/trpc/controllers/user";

import { router } from "./trpc";

export const appRouter = router({
    authCallback: authCallback,
    getUser: getUser,
    updateUser: updateUser,
    getBillById: getBillById,
    getLegislatorBills: getLegislatorBills,
    getBillByPrompt: getBillByPrompt,
    writeEmailToLegislator: writeEmailToLegislator,
    getLegislatorSummary: getLegislatorSummary,
    getLegislatorsByZip: getLegislatorsByZip,
});

export type AppRouter = typeof appRouter;
