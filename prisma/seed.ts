import { db } from "@/db";
import fs from "fs";
import { $Enums } from ".prisma/client";

type Legislator = {
    name: string,
    party: string,
    district: string,
    pfpUrl: string,
}

type VoteInfo = {
    Date: string,
    Result: string,
    Location: string,
    "Ayes Count": string,
    "Noes Count": string,
    "NVR Count": string,
    Motion: string,
    "Ayes": string[],
    "Noes": string[],
    "NVR": string[],
}

type Bill = {
    measure: string,
    billId: string,
    billName: string,
    author: string,
    status: string,
    billText: string,
    voteInfo: VoteInfo[],
    publishDate: string
}

async function findBill(billId: string) {
    return db.bill.findFirst({
        where: {
            id: billId
        }
    });
}

async function findLegislator(name: string) {
    return db.legislator.findFirst({
        where: {
            name: {
                contains: name
            }
        }
    });
}

async function seedAssembly() {
    const json = JSON.parse(fs.readFileSync("./data/assembly.json", "utf-8"));
    const assembly = json["assemblymembers"] as Legislator[];

    await Promise.all(assembly.map(async member => {
        await db.legislator.upsert({
            where: {
                name: member.name
            },
            update: {},
            create: {
                name: member.name,
                party: member.party as $Enums.Party,
                type: "Assembly" as $Enums.LegislatorType,
                district: parseInt(member.district),
                pictureUrl: member.pfpUrl
            }
        });
    }));
}

async function seedSenators() {
    const json = JSON.parse(fs.readFileSync("./data/senators.json", "utf-8"));
    const senators = json["senators"] as Legislator[];

    await Promise.all(senators.map(async senator => {
        await db.legislator.upsert({
            where: {
                name: senator.name
            },
            update: {},
            create: {
                name: senator.name,
                party: senator.party as $Enums.Party,
                type: "Senate" as $Enums.LegislatorType,
                district: parseInt(senator.district),
                pictureUrl: senator.pfpUrl
            }
        });
    }));
}


async function seedBills() {
    const bills = JSON.parse(fs.readFileSync("./data/bills.json", "utf-8")) as Bill[];


    for (const bill of bills) {
        const date = bill.publishDate ? new Date(bill.publishDate) : bill.voteInfo.length > 0 ? new Date(bill.voteInfo[0].Date) : new Date("01/01/1970");

        const author = await db.legislator.findFirst({
            where: {
                name: {
                    contains: bill.author
                }
            }
        });

        if (!author) {
            console.log(`Author ${bill.author} not found for bill: ${bill.billName}`);
            await db.bill.create({
                data: {
                    id: bill.billId,
                    measure: bill.measure,
                    subject: bill.billName,
                    status: bill.status,
                    fullText: bill.billText,
                    date: date,
                    author: {}
                }
            });
        } else {
            await db.bill.create({
                data: {
                    id: bill.billId,
                    measure: bill.measure,
                    subject: bill.billName,
                    status: bill.status,
                    fullText: bill.billText,
                    date: date,
                    author: {
                        connect: {
                            name: author.name
                        }
                    }
                }
            });
        }
    }
}

async function seedVotes() {
    const bills = JSON.parse(fs.readFileSync("./data/bills.json", "utf-8")) as Bill[];
    for (const bill of bills) {
        const billRecord = await findBill(bill.billId);

        if (!billRecord) {
            console.log(`Bill ${bill.billName} not found`);
            continue;
        }

        const voteData = [];
        for (const vote of bill.voteInfo) {
            for (const ayeVoter of vote.Ayes) {
                const legislator = await findLegislator(ayeVoter);
                if (!legislator) {
                    console.log(`Legislator ${ayeVoter} not found`);
                    continue;
                }

                voteData.push({
                    billId: bill.billId,
                    legislatorId: legislator.id,
                    vote: "Aye" as $Enums.VoteType
                });
            }
            for (const nayVoter of vote.Noes) {
                const legislator = await findLegislator(nayVoter);
                if (!legislator) {
                    console.log(`Legislator ${nayVoter} not found`);
                    continue;
                }
                voteData.push({
                    billId: bill.billId,
                    legislatorId: legislator.id,
                    vote: "Nay" as $Enums.VoteType
                });
            }
            for (const nvrVoter of vote.NVR) {
                const legislator = await findLegislator(nvrVoter);
                if (!legislator) {
                    console.log(`Legislator ${nvrVoter} not found`);
                    continue;
                }
                voteData.push({
                    billId: bill.billId,
                    legislatorId: legislator.id,
                    vote: "Nvr" as $Enums.VoteType
                });
            }
        }
        let uniqueMap = {}
        voteData.forEach(vote => {
            const key = vote.legislatorId + '|' + vote.billId;
            console.log(key);
            // @ts-ignore
            if (!uniqueMap[key]) {
                // @ts-ignore
                uniqueMap[key] = vote;
            }
        })

        const data = Object.values(uniqueMap);

        // @ts-ignore
        await db.vote.createMany({ data: data });
    }
}

type Summary = {
    billId: string,
    summary: string
    tags: string[]
}

const tagTable = {
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

async function seedBillSummaries() {
    const summaries = JSON.parse(fs.readFileSync("./data/summaries.json", "utf-8"))["summaries"] as Summary[];

    for (const summary of summaries) {

        const firstSentence = summary.summary.match(/[^.!?]+[.!?]/);
        const formattedSummary = firstSentence ? firstSentence[0] : summary.summary;


        await db.bill.update({
            where: {
                id: summary.billId
            },
            data: {
                summary: formattedSummary,
                tags: {
                    // @ts-ignore
                    set: summary.tags.map(tag => tagTable[tag]) as $Enums.Tag[]
                }
            }
        });
    }
}

async function seed() {
    // console.log("Seeding Assembly...");
    // await seedAssembly();
    //
    // console.log("Seeding Senators...");
    // await seedSenators();
    //
    // console.log("Seeding Bills...");
    // await seedBills();
    //
    console.log("Seeding Votes...");
    await seedVotes();

    // console.log("Seeding Summaries...");
    // await seedBillSummaries();
}

seed();