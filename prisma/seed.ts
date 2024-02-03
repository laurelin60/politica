// const { db } = require("../src/db");
// const fs = require("fs");
// const { $Enums } = require("@prisma/client");

import { db } from "@/db";
import fs from "fs";
import { $Enums } from "@prisma/client";

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


// async function seedAssembly() {
//     const assembly = JSON.parse(fs.readFileSync("./data/assembly.json", "utf-8"));
//
//     await db.legislator.create({
//         data: {}
//     });
// }

async function seedSenators() {
    const json = JSON.parse(fs.readFileSync("./data/senators.json", "utf-8"));
    const senators = json["senators"] as Legislator[];

    await db.legislator.createMany({
        data: senators.map(senator => ({
            name: senator.name,
            party: senator.party as $Enums.Party,
            type: "Senator" as $Enums.LegislatorType,
            district: parseInt(senator.district),
            pictureUrl: senator.pfpUrl
        }))
    });
}

//
// async function seedBills() {
//     const bills = JSON.parse(fs.readFileSync("./data/bills.json", "utf-8")) as Bill[];
//
//     for (const bill of bills) {
//         await db.bill.create({
//             data: {
//                 billId: bill.billId,
//                 measure: bill.measure,
//                 subject: bill.billName,
//                 status: bill.status,
//                 fullText: bill.billText,
//                 author: {
//                     connectOrCreate: {
//                         where: {
//                             name: bill.author
//                         },
//                         create: {
//                             name: bill.author
//                         }
//                     }
//                 }
//             }
//         });
//     }
// }
//
// async function seedVotes() {
//
// }

async function seed() {
    await seedSenators();
    // await seedAssembly();
    // await seedBills();
    // await seedVotes();
}

seed();