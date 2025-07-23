const fs = require('fs');

let boughtData = JSON.parse(fs.readFileSync('sourceData/bought_data.json', 'utf8'));
let salesData = JSON.parse(fs.readFileSync('sourceData/sales_data.json', 'utf8'));

console.log(boughtData.length);
console.log(salesData.length);

// process data by sales
let newBoughtRecords = [];

for(let i=0; i< boughtData.length; i++) {
    let newRecord = {};
    newRecord.token = boughtData[i].token;
    
    newRecord.buy_price = boughtData[i].price_xtz;
    newRecord.buy_amount = boughtData[i].amount;
    newRecord.buy_seller = boughtData[i].seller_address;
    newRecord.buy_ophash = boughtData[i].ophash;
    newRecord.buy_timestamp = boughtData[i].timestamp;

    // find buy data
    let foundSaleData = false;
    for(let x=0; x< salesData.length; x++) {

        let saleTokenContract = salesData[x].token.fa_contract;
        let saleTokenId = salesData[x].token.token_id;

        let buyTokenContract = boughtData[i].token.fa_contract;
        let buyTokenId = boughtData[i].token.token_id;

        if (buyTokenContract === saleTokenContract && buyTokenId === saleTokenId) {
            newRecord.sale_price = boughtData[x].price_xtz;
            newRecord.sale_amount = boughtData[x].amount;
            newRecord.sale_buyer = boughtData[x].buyer_address;
            newRecord.sale_ophash = boughtData[x].ophash;
            foundSaleData = true;
            break; // exit loop once found
        }
    }

    if (!foundSaleData) {
        newRecord.sale_price = null;
        newRecord.sale_amount = null;
        newRecord.sale_buyer = null;
        newRecord.sale_ophash = null;
        console.log(`No buy data found for token: ${boughtData[i].token.name}`);
    }

    newBoughtRecords.push(newRecord);
}

fs.writeFileSync('sourceData/bought_data_processed.json', JSON.stringify(newBoughtRecords, null, 2), 'utf8');