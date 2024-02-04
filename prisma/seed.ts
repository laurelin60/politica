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
}

async function findBill(billId: string) {
    return db.bill.findFirst({
        where: {
            billId: billId
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
                    billId: bill.billId,
                    measure: bill.measure,
                    subject: bill.billName,
                    status: bill.status,
                    fullText: bill.billText,
                    date: "",
                    author: {}
                }
            });
        } else {
            await db.bill.create({
                data: {
                    billId: bill.billId,
                    measure: bill.measure,
                    subject: bill.billName,
                    status: bill.status,
                    fullText: bill.billText,
                    date: "",
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

        for (const vote of bill.voteInfo) {
            console.log(vote);
            for (const ayeVoter of vote.Ayes) {
                const legislator = await findLegislator(ayeVoter);
                if (!legislator) {
                    console.log(`Legislator ${ayeVoter} not found`);
                    continue;
                }
                await db.vote.create({
                    data: {
                        bill: {
                            connect: {
                                billId: bill.billId
                            }
                        },
                        legislator: {
                            connect: {
                                name: legislator.name
                            }
                        },
                        vote: "Aye" as $Enums.VoteType
                    }
                });
            }
            for (const nayVoter of vote.Noes) {
                const legislator = await findLegislator(nayVoter);
                if (!legislator) {
                    console.log(`Legislator ${nayVoter} not found`);
                    continue;
                }
                await db.vote.create({
                    data: {
                        bill: {
                            connect: {
                                billId: bill.billId
                            }
                        },
                        legislator: {
                            connect: {
                                name: legislator.name
                            }
                        },
                        vote: "Nay" as $Enums.VoteType
                    }
                });
            }
            for (const nvrVoter of vote.NVR) {
                const legislator = await findLegislator(nvrVoter);
                if (!legislator) {
                    console.log(`Legislator ${nvrVoter} not found`);
                    continue;
                }
                await db.vote.create({
                    data: {
                        bill: {
                            connect: {
                                billId: bill.billId
                            }
                        },
                        legislator: {
                            connect: {
                                name: legislator.name
                            }
                        },
                        vote: "Nvr" as $Enums.VoteType
                    }
                });
            }
        }
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

    // console.log("Seeding Votes...");
    // await seedVotes();
}

seed();