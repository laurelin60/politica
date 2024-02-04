const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const chalk = require('chalk');

async function fetchAndProcessBills() {
    const mainUrl = 'https://leginfo.legislature.ca.gov/faces/billSearchClient.xhtml?session_year=20232024&house=Both&author=All&lawCode=All';
    const billTextBaseUrl = 'https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=';
    const billVotesBaseUrl = 'https://leginfo.legislature.ca.gov/faces/billVotesClient.xhtml?bill_id=';

    const response = await axios.get(mainUrl);
    const $ = cheerio.load(response.data);
    const bills = [];

    $('#bill_results > tbody').children().each((_, element) => {
        const children = $(element).children();
        const measure = $(children[0]).text().trim();
        const billId = $(children[0]).children('a').attr('href').split('=')[1];
        const billName = $(children[1]).text().trim();
        const author = $(children[2]).text().trim();
        const status = $(children[3]).text().trim();

        if (billName !== 'x'/* && status !== 'Chaptered' && !status.includes('- Died -')*/) {
            console.log(`Measure ${measure} (${billId}): "${billName}" by ${author} [${status}]`);
            bills.push({ measure, billId, billName, author, status });
        }
    });

    const maxConcurrent = 3; // Don't spam them too much 
    for (let i = 0; i < bills.length; i += maxConcurrent) {
        const batch = bills.slice(i, i + maxConcurrent);
        const results = await Promise.allSettled(batch.map(bill => processBill(bill, billTextBaseUrl, billVotesBaseUrl)));
        results.forEach((result, idx) => {
            if (result.status === 'fulfilled') {
                console.log(chalk.greenBright(`Processed bill ${batch[idx].billName} (${i + idx + 1}/${bills.length})`));
            }
            else {
                console.error(chalk.redBright(`Failed to process bill ${batch[idx].billName} (${i + idx + 1}/${bills.length})`));
            }
        });
    }

    fs.writeFileSync('bills.json', JSON.stringify(bills));
}

async function processBill(bill, billTextBaseUrl, billVotesBaseUrl) {
    let attempts = 0;
    while (attempts < 10) {
        try {
            const billTextResponse = await axios.get(`${billTextBaseUrl}${bill.billId}`);
            const billText$ = cheerio.load(billTextResponse.data);
            bill.billText = billText$('#bill_all').text().replaceAll('  ', '');
            try {
                bill.publishDate = billText$('.tab_content').eq(0).children().eq(0).children().eq(2).text().trim().split(': ')[1].split(' ')[0];
            }
            catch (e1) {
                try {
                    bill.publishDate = billText$('.tab_content').eq(0).children().eq(0).children().eq(2).text().trim().split(': ')[1].split(' ')[0];
                }
                catch (e2) {
                    bill.publishDate = "";
                    console.log(chalk.red(`Failed to get publish date for "${bill.billName}"`))
                }
            }

            const billVotesResponse = await axios.get(`${billVotesBaseUrl}${bill.billId}`);
            const billVotes$ = cheerio.load(billVotesResponse.data);
            bill.voteInfo = [];

            billVotes$('.tab_content_sub_non_text').eq(0).children().each((_, element) => {
                const statusRows = billVotes$(element).children('.statusRow');
                const currVote = {};

                statusRows.each((_, row) => {
                    const key = billVotes$(row).children().eq(0).text().trim();
                    const val = billVotes$(row).children().eq(1).text().trim();

                    if (key === 'Ayes' || key === 'Noes' || key === 'NVR') {
                        currVote[key] = val.split(', ');
                        if (currVote[key].length === 1 && currVote[key][0] === '') currVote[key] = [];
                    } else {
                        currVote[key] = val;
                    }
                });

                bill.voteInfo.push(currVote);
            });
            return bill;
        }
        catch (error) {
            attempts++;
            if (attempts <= 5) console.log(chalk.yellowBright(`Fetch had a stroke on "${bill.billName}" (${attempts}/10)`));
            else console.log(chalk.yellow(`Fetch had a stroke on "${bill.billName}" (${attempts}/10)`));
            if (attempts >= 10) throw error;
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

fetchAndProcessBills();
