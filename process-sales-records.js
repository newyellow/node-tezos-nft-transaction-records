const fs = require('fs');

let boughtData = JSON.parse(fs.readFileSync('sourceData/bought_data.json', 'utf8'));
let salesData = JSON.parse(fs.readFileSync('sourceData/sales_data.json', 'utf8'));

console.log(boughtData.length);
console.log(salesData.length);

// process data by sales
let newSalesRecord = [];

for(let i=0; i< salesData.length; i++) {
    let newRecord = {};
    newRecord.token = salesData[i].token;
    
    newRecord.sale_price = salesData[i].price_xtz;
    newRecord.sale_amount = salesData[i].amount;
    newRecord.sale_buyer = salesData[i].buyer_address;
    newRecord.sale_ophash = salesData[i].ophash;
    newRecord.sale_timestamp = salesData[i].timestamp;

    // find buy data
    let foundBuyData = false;
    for(let x=0; x< boughtData.length; x++) {
        let buyTokenContract = boughtData[x].token.fa_contract;
        let buyTokenId = boughtData[x].token.token_id;

        let saleTokenContract = salesData[i].token.fa_contract;
        let saleTokenId = salesData[i].token.token_id;

        if (buyTokenContract === saleTokenContract && buyTokenId === saleTokenId) {
            newRecord.buy_price = boughtData[x].price_xtz;
            newRecord.buy_amount = boughtData[x].amount;
            newRecord.buy_seller = boughtData[x].seller_address;
            newRecord.buy_ophash = boughtData[x].ophash;
            foundBuyData = true;
            break; // exit loop once found
        }
    }

    if (!foundBuyData) {
        newRecord.buy_price = null;
        newRecord.buy_amount = null;
        newRecord.buy_seller = null;
        newRecord.buy_ophash = null;
        console.log(`No buy data found for token: ${salesData[i].token.name}`);
    }

    newSalesRecord.push(newRecord);
}

fs.writeFileSync('sourceData/sales_data_processed.json', JSON.stringify(newSalesRecord, null, 2), 'utf8');