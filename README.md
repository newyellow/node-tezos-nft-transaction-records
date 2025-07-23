# Tezos Records Viewer

A simple transaction viewer project created for an online slide sharing session, which utilizes objkt's GraphQL API. If you want to view your own or other people's transaction records, you can replace the wallet address and run the data fetcher.

The system is designed for local usage, where it fetches data from Objkt.com and stores it in JSON format, then opens a webpage for you to navigate all the details. This tool was created to showcase the NFTs I collected and resold during a presentation.

## 🤝 Acknowledgments

**🤖 Develope by AI**
This project was developed with significant assistance from AI.

**Special thanks to [objkt.com](https://objkt.com) for providing the GraphQL API service** that makes this project possible. Their comprehensive Tezos NFT data infrastructure enables developers to build powerful analytics and visualization tools for the Tezos ecosystem.

## 🎯 Project Overview

This application allows users to explore detailed NFT transaction data including:
- **Sales Records**: Complete NFT sales history with pricing, buyer/seller information, and transaction details
- **Purchase Records**: NFT acquisition data with original purchase prices and subsequent sale information
- **Token Metadata**: Comprehensive token information including thumbnails, contract addresses, and token IDs
- **Transaction Tracking**: Full transaction lifecycle from purchase to sale with profit/loss analysis

## 🏗️ Architecture

### Backend (Node.js + Express)
- **Data Fetching**: GraphQL queries to objkt.com API
- **Data Processing**: Transformation and enrichment of raw blockchain data
- **API Server**: RESTful endpoints with pagination support
- **Static File Serving**: Web interface delivery

### Frontend (Vanilla HTML/CSS/JavaScript)
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Data Loading**: Dynamic content updates via AJAX
- **Pagination System**: Efficient navigation through large datasets
- **Interactive Navigation**: Seamless page-to-page navigation

## 📊 Data Flow

### 1. Data Collection (`getRecords.js`)
```javascript
// Fetches data from objkt.com GraphQL API
const API_ENDPOINT = 'https://data.objkt.com/v3/graphql'
```
- **Sales Data**: Queries for NFT sales transactions
- **Purchase Data**: Queries for NFT acquisition transactions
- **Pagination**: Handles large datasets with offset-based pagination
- **Rate Limiting**: Implements delays to respect API limits

### 2. Data Processing
- **`process-sales-records.js`**: Enriches sales data with corresponding purchase information
- **`process-bought-records.js`**: Enriches purchase data with subsequent sale information
- **`reorder.js`**: Sorts records by timestamp for chronological analysis

### 3. Data Storage
- **JSON Files**: Processed data stored in `sourceData/` directory
- **Structured Format**: Consistent schema for both sales and purchase records
- **Optimized Loading**: Server-side data loading for performance

### 4. Web Interface
- **Home Page** (`index.html`): Project overview and navigation
- **Sales Page** (`sales.html`): Browse sales records with pagination
- **Buys Page** (`buys.html`): Browse purchase records with pagination

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd node--tezos-records
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure the data source**
   - Edit `getRecords.js` to set your Tezos wallet address
   - Modify GraphQL queries if needed for different data requirements

4. **Fetch and process data**
```bash
# Fetch raw data from objkt.com
npm start

# Process sales records
node process-sales-records.js

# Process purchase records
node process-bought-records.js

# Optional: Reorder data by timestamp
node reorder.js
```

5. **Start the web server**
```bash
npm run server
```

6. **Access the application**
   - Open your browser to `http://localhost:3000`
   - Navigate between Home, Sales, and Buys pages

## 📡 API Endpoints

### Sales Data
- `GET /api/sales?page=1&limit=20` - Get paginated sales records
- `GET /api/sales/count` - Get total number of sales records

### Purchase Data
- `GET /api/buys?page=1&limit=20` - Get paginated purchase records
- `GET /api/buys/count` - Get total number of purchase records

### Response Format
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalRecords": 1000,
    "totalPages": 50,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 📁 Project Structure

```
node--tezos-records/
├── app.js                          # Express server and API endpoints
├── getRecords.js                   # GraphQL data fetching from objkt.com
├── process-sales-records.js        # Sales data processing and enrichment
├── process-bought-records.js       # Purchase data processing and enrichment
├── reorder.js                      # Data sorting utility
├── package.json                    # Project dependencies and scripts
├── public/                         # Web interface files
│   ├── index.html                  # Home page with project overview
│   ├── sales.html                  # Sales records viewer
│   ├── buys.html                   # Purchase records viewer
│   └── styles.css                  # Application styling
└── sourceData/                     # Data storage
    ├── sales_data.json             # Raw sales data from GraphQL
    ├── bought_data.json            # Raw purchase data from GraphQL
    ├── sales_data_processed.json   # Processed sales data
    ├── bought_data_processed.json  # Processed purchase data
    └── slaes_data_processed_reordered.json  # Chronologically sorted data
```

## 🎨 Features

### Data Visualization
- **Token Thumbnails**: Direct links to NFT images via objkt.com
- **Price Analysis**: Sale vs. purchase price comparison
- **Transaction Links**: Direct links to Tezos blockchain explorers
- **Timeline View**: Chronological transaction ordering

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Fast Navigation**: Efficient pagination with page jumping
- **Loading States**: Visual feedback during data loading
- **Error Handling**: Graceful error display and recovery

### Performance
- **Server-side Pagination**: Efficient memory usage
- **Static File Serving**: Fast content delivery
- **Optimized Queries**: Minimal API calls and data transfer

## 🔧 Configuration

### Customizing Data Source
Edit `getRecords.js` to modify:
- **Wallet Address**: Change `DEFAULT_VARIABLES.address` to your Tezos address
- **Query Parameters**: Modify GraphQL queries for different data requirements
- **Rate Limiting**: Adjust sleep intervals between API calls

### Styling Customization
- **Colors**: Modify CSS variables in `public/styles.css`
- **Layout**: Adjust responsive breakpoints and grid systems
- **Navigation**: Customize navigation bar styling and behavior

## 📈 Data Schema

### Sales Record Structure
```json
{
  "token": {
    "fa_contract": "KT1...",
    "token_id": "123",
    "name": "NFT Name",
    "thumbnail_uri": "ipfs://...",
    "artifact_uri": "ipfs://..."
  },
  "sale_price": 1000000,
  "sale_amount": 1,
  "sale_buyer": "tz1...",
  "sale_ophash": "op...",
  "sale_timestamp": "2023-01-01T00:00:00Z",
  "buy_price": 500000,
  "buy_amount": 1,
  "buy_seller": "tz1...",
  "buy_ophash": "op...",
  "buy_timestamp": "2022-12-01T00:00:00Z"
}
```

## 📝 License

This project is licensed under the ISC License.

## 🔮 Future Enhancements

- **Real-time Updates**: WebSocket integration for live data updates
- **Advanced Filtering**: Date ranges, price filters, and token type filtering
- **Export Functionality**: CSV/Excel export of transaction data
- **Analytics Dashboard**: Charts and graphs for profit/loss analysis
- **Multi-wallet Support**: Compare data across multiple addresses
- **Blockchain Integration**: Direct Tezos node integration for real-time data

## 🐛 Troubleshooting

### Common Issues
1. **Data Loading Errors**: Ensure `sourceData/` directory contains processed JSON files
2. **API Rate Limits**: Increase sleep intervals in `getRecords.js` if hitting rate limits
3. **Port Conflicts**: Change `PORT` variable in `app.js` if port 3000 is in use
4. **Memory Issues**: Reduce `limit` parameter in API calls for large datasets

### Support
For issues and questions, please check the project documentation or create an issue in the repository. 