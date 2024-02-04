import { db } from "@/db";
import { publicProcedure } from "@/trpc/trpc";
import { z } from "zod";
import { callGemini } from "@/app/api/gemini/gemini.mjs";
import { $Enums } from "@prisma/client";

const validTags = ["lgbtq", "judicial", "children", "civil rights", "sustainability", "gender equality", "racial justice", "refugee rights", "disability rights", "budget", "education", "health", "transportation", "housing", "public safety", "labor", "energy", "agriculture", "technology"];

const tagTable: { [key: string]: string; } = {
    "lgbtq": "LGBTQ",
    "judicial": "Judicial",
    "children": "Children",
    "civil rights": "CivilRights",
    "sustainability": "Sustainability",
    "gender equality": "GenderEquality",
    "racial justice": "RacialJustice",
    "refugee rights": "RefugeeRights",
    "disability rights": "DisabilityRights",
    "budget": "Budget",
    "education": "Education",
    "health": "Health",
    "transportation": "Transportation",
    "housing": "Housing",
    "public safety": "PublicSafety",
    "labor": "Labor",
    "energy": "Energy",
    "agriculture": "Agriculture",
    "technology": "Technology"
};

export const getBillByPrompt = publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async (opts) => {
        let attempts = 0;
        while (attempts++ < 3) {
            try {
                const response = await callGemini(`### SYSTEM INSTRUCTIONS
Your job is to return matching tags based on the user's prompt. You may only pick tags from the list provided. If there are no tags, just put [].

Available tags: ['lgbtq', 'judicial', 'children', 'civil rights', 'sustainability', 'gender equality', 'racial justice', 'refugee rights', 'disability rights', 'budget', 'education', 'health', 'transportation', 'housing', 'public safety', 'labor', 'energy', 'agriculture', 'technology']

The user's prompt is: ${opts.input.prompt}

### RESPONSE (TAG LIST ENCLOSED IN BRACKETS WITH SINGLE QUOTES REQUIRED!)
`);
                console.log(response);
                const filteredTags = response.replaceAll("'", "").replaceAll("\"", "").split("[")[1].split("]")[0].split(",").map(tag => tag.trim().toLowerCase()).filter(tag => validTags.includes(tag));
                console.log(filteredTags);
                const realTags = filteredTags.map(tag => tagTable[tag]) as $Enums.Tag[];
                console.log(realTags);

                const res = await db.bill.findMany({
                    where: {
                        tags: {
                            hasSome: realTags
                        }
                    },
                    select: {
                        measure: true,
                        subject: true,
                        status: true,
                        summary: true,
                        tags: true,
                        author: {
                            select: {
                                name: true,
                                party: true,
                                district: true,
                                pictureUrl: true
                            }
                        }
                    }
                });
                res.sort((a: any, b: any) => {
                    return b.tags.filter((tag: any) => Object.values(tagTable).includes(tag)).length - a.tags.filter((tag: any) => Object.values(tagTable).includes(tag)).length;
                });
                return res;
            } catch (e) {
                console.error(e);
                if (attempts == 3) break;
            }
        }
        return { error: "Something had a stroke and died" };
    });

export const getBillById = publicProcedure
    .input(z.object({ billId: z.string() }))
    .query(async (opts) => {
        return db.bill.findFirst({
            where: {
                id: opts.input.billId
            }
        });
    });

export const getLegislatorBills = publicProcedure
    .input(
        z.object({
            authorNameContains: z.string() // Add this line to accept author name as a parameter
        })
    )
    .query(async (opts) => {
        return db.bill.findMany({
            where: {
                author: {
                    // Perform a join with the Legislator table and filter by author's name
                    name: {
                        contains: opts.input.authorNameContains // Use the contains filter
                    }
                }
            },
            select: {
                id: true,
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
