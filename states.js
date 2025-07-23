const fs = require('fs');


// load data from bought_data.json
const boughtData = JSON.parse(fs.readFileSync('sourceData/bought_data.json', 'utf8'));
console.log('Total records in bought_data:', boughtData.length);

// calculate total sum
let sum = 0;
boughtData.forEach(record => {
    if (record.price_xtz) {
        sum += parseInt(record.price_xtz);
    }
});

console.log('Total sum of prices in bought_data:', sum);

// load sale data
const salesData = JSON.parse(fs.readFileSync('sourceData/sales_data.json', 'utf8'));
console.log('Total records in sales_data:', salesData.length);

// calculate total sum
let salesSum = 0;
salesData.forEach(record => {
    if (record.price_xtz) {
        salesSum += parseInt(record.price_xtz);
    }
});

console.log('Total sum of prices in sales_data:', salesSum);