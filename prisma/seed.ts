import fs from "fs";

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

function seed() {
    const bills = JSON.parse(fs.readFileSync("./data/bills.json", "utf-8")) as Bill[];

    for (const bill of bills) {
        console.log(bill.measure)
    }
}

seed();