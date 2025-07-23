// Change this to reorder a different file
const FILE_NAME = 'sourceData/sales_data_processed.json';

const fs = require('fs');

function reorderByTimestamp(data) {
  if (!Array.isArray(data)) {
    throw new Error('Expected an array.');
  }
  return data.slice().sort((a, b) => {
    const tA = a.token && a.token.timestamp ? new Date(a.token.timestamp) : new Date(0);
    const tB = b.token && b.token.timestamp ? new Date(b.token.timestamp) : new Date(0);
    return tA - tB;
  });
}

const data = JSON.parse(fs.readFileSync(FILE_NAME, 'utf8'));
const sortedData = reorderByTimestamp(data);

fs.writeFileSync(`sourceData/slaes_data_processed_reordered.json`, JSON.stringify(sortedData, null, 2), 'utf8');
console.log(`Reordered ${FILE_NAME} by token.timestamp.`);
