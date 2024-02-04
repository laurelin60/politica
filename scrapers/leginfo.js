const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

async function fetchAndProcessBills() {
    const mainUrl =
        "https://leginfo.legislature.ca.gov/faces/billSearchClient.xhtml?session_year=20232024&house=Both&author=All&lawCode=All";
    const billTextBaseUrl =
        "https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=";
    const billVotesBaseUrl =
        "https://leginfo.legislature.ca.gov/faces/billVotesClient.xhtml?bill_id=";

    const response = await axios.get(mainUrl);
    const $ = cheerio.load(response.data);
    const bills = [];

    $("#bill_results > tbody")
        .children()
        .each((_, element) => {
            const children = $(element).children();
            const measure = $(children[0]).text().trim();
            const billId = $(children[0])
                .children("a")
                .attr("href")
                .split("=")[1];
            const billName = $(children[1]).text().trim();
            const author = $(children[2]).text().trim();
            const status = $(children[3]).text().trim();

            if (
                billName !==
                "x" /* && status !== 'Chaptered' && !status.includes('- Died -')*/
            ) {
                console.log(
                    `Measure ${measure} (${billId}): "${billName}" by ${author} [${status}]`,
                );
                bills.push({ measure, billId, billName, author, status });
            }
        });
    let idx = 0;
    for (const bill of bills) {
        let attempts = 0;
        while (attempts < 5) {
            try {
                const billTextResponse = await axios.get(
                    `${billTextBaseUrl}${bill.billId}`,
                );
                const billText$ = cheerio.load(billTextResponse.data);
                bill.billText = billText$("#bill_all")
                    .text()
                    .replaceAll("  ", "");

                const billVotesResponse = await axios.get(
                    `${billVotesBaseUrl}${bill.billId}`,
                );
                const billVotes$ = cheerio.load(billVotesResponse.data);
                bill.voteInfo = [];

                billVotes$("#j_idt189 > div")
                    .children()
                    .each((_, element) => {
                        const statusRows =
                            billVotes$(element).children(".statusRow");
                        const currVote = {};

                        statusRows.each((_, row) => {
                            const key = billVotes$(row)
                                .children()
                                .eq(0)
                                .text()
                                .trim();
                            const val = billVotes$(row)
                                .children()
                                .eq(1)
                                .text()
                                .trim();

                            if (
                                key === "Ayes" ||
                                key === "Noes" ||
                                key === "NVR"
                            ) {
                                currVote[key] = val.split(", ");
                                if (
                                    currVote[key].length === 1 &&
                                    currVote[key][0] === ""
                                )
                                    currVote[key] = [];
                            } else {
                                currVote[key] = val;
                            }
                        });

                        bill.voteInfo.push(currVote);
                    });
                console.log(
                    `Processed bill ${bill.billName} (${++idx}/${
                        bills.length
                    })`,
                );
                break; // Break out of attempts loop
            } catch (error) {
                console.error(
                    `Fetch had a stroke on "${
                        bill.billName
                    }" (${++attempts}/5)`,
                );
            }
        }
    }

    // Write the results to a file
    fs.writeFileSync("bills.json", JSON.stringify(bills));
}

fetchAndProcessBills();
