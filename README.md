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

3. **Configure your Tezos wallet address**
   
   **Important**: The default configuration uses a sample wallet address. To view your own transaction data, you need to change the wallet address in `getRecords.js`.
   
   Open `getRecords.js` and locate the `DEFAULT_VARIABLES` section:
   ```javascript
   DEFAULT_VARIABLES: {
       address: "tz1RPZp6NLzn7x4g7jhqHtCkhCQVnhbVMj8y",  // ← Change this address
       offset: 0
   }
   ```
   
   **Replace the address with your Tezos wallet address:**
   - Find your Tezos wallet address (starts with `tz1`, `tz2`, or `tz3`)
   - Replace `"tz1RPZp6NLzn7x4g7jhqHtCkhCQVnhbVMj8y"` with your address
   - Example: `address: "tz1YourWalletAddressHere"`
   
   **To find your Tezos wallet address:**
   - Check your wallet app (Temple, Kukai, etc.)
   - Look at your wallet settings or account information
   - The address format is: `tz1...`, `tz2...`, or `tz3...`

**Example of changing the address:**
```javascript
// Before (default address)
DEFAULT_VARIABLES: {
    address: "tz1RPZp6NLzn7x4g7jhqHtCkhCQVnhbVMj8y",
    offset: 0
}

// After (your address)
DEFAULT_VARIABLES: {
    address: "tz1YourActualWalletAddressHere",
    offset: 0
}
```

4. **Fetch and process data**
```bash
# Fetch raw data from objkt.com for your wallet address
npm start

# Process sales records (enriches with purchase data)
node process-sales-records.js

# Process purchase records (enriches with sale data)
node process-bought-records.js

# Optional: Reorder data by timestamp for chronological view
node reorder.js
```

5. **Start the web server**
```bash
npm run server
```

6. **Access the application**
   - Open your browser to `http://localhost:3000`
   - Navigate between Home, Sales, and Buys pages

### 📊 What happens when you run the data fetcher?

When you run `npm start`, the script will:

1. **Connect to objkt.com's GraphQL API** using your wallet address
2. **Fetch sales data** - All NFTs you've sold (excluding your own creations)
3. **Fetch purchase data** - All NFTs you've bought (excluding your own creations)
4. **Save raw data** to `sourceData/sales_data.json` and `sourceData/bought_data.json`
5. **Process and enrich data** when you run the processing scripts
6. **Create final datasets** ready for the web interface

**Note**: The script includes rate limiting (2-second delays) to respect objkt.com's API limits. For wallets with many transactions, this may take several minutes.

### 🔍 Troubleshooting Address Issues

**If you get no data:**
- Verify your wallet address is correct (check for typos)
- Ensure the address has NFT transactions on objkt.com
- Try a different wallet address to test

**If you get an error:**
- Check your internet connection
- Verify objkt.com's API is accessible
- Ensure the wallet address format is correct (tz1..., tz2..., or tz3...)

---

## 🇹🇼 使用說明 (Traditional Chinese Instructions)

### 前提條件
- Node.js (v14 或更高版本)
- npm 或 yarn 套件管理器

### 安裝步驟

1. **複製儲存庫**
```bash
git clone <repository-url>
cd node--tezos-records
```

2. **安裝依賴**
```bash
npm install
```

3. **設定您的 Tezos 錢包地址**
   
   **重要提示**: 預設設定使用範例錢包地址。要查看您自己的交易資料，您需要在 `getRecords.js` 中更改錢包地址。
   
   開啟 `getRecords.js` 並找到 `DEFAULT_VARIABLES` 部分：
   ```javascript
   DEFAULT_VARIABLES: {
       address: "tz1RPZp6NLzn7x4g7jhqHtCkhCQVnhbVMj8y",  // ← 更改此地址
       offset: 0
   }
   ```
   
   **將地址替換為您的 Tezos 錢包地址:**
   - 找到您的 Tezos 錢包地址（以 `tz1`、`tz2` 或 `tz3` 開頭）
   - 將 `"tz1RPZp6NLzn7x4g7jhqHtCkhCQVnhbVMj8y"` 替換為您的地址
   - 範例: `address: "tz1YourWalletAddressHere"`
   
   **如何找到您的 Tezos 錢包地址:**
   - 查看您的錢包應用程式（Temple、Kukai 等）
   - 查看錢包設定或帳戶資訊
   - 地址格式為: `tz1...`、`tz2...` 或 `tz3...`

   **更改地址範例:**
   ```javascript
   // 更改前（預設地址）
   DEFAULT_VARIABLES: {
       address: "tz1RPZp6NLzn7x4g7jhqHtCkhCQVnhbVMj8y",
       offset: 0
   }

   // 更改後（您的地址）
   DEFAULT_VARIABLES: {
       address: "tz1YourActualWalletAddressHere",
       offset: 0
   }
   ```

4. **取得和處理資料**
```bash
# 從 objkt.com 取得您錢包地址的原始資料
npm start

# 處理銷售記錄（用購買資料豐富）
node process-sales-records.js

# 處理購買記錄（用銷售資料豐富）
node process-bought-records.js

# 可選：按時間戳重新排序以獲得時間順序檢視
node reorder.js
```

5. **啟動網路伺服器**
```bash
npm run server
```

6. **存取應用程式**
   - 在瀏覽器中開啟 `http://localhost:3000`
   - 在首頁、銷售頁面和購買頁面之間導航

### 📊 執行資料取得器時會發生什麼？

當您執行 `npm start` 時，腳本將：

1. **連接到 objkt.com 的 GraphQL API** 使用您的錢包地址
2. **取得銷售資料** - 您賣出的所有 NFT（不包括您自己的創作）
3. **取得購買資料** - 您購買的所有 NFT（不包括您自己的創作）
4. **儲存原始資料** 到 `sourceData/sales_data.json` 和 `sourceData/bought_data.json`
5. **處理並豐富資料** 當您執行處理腳本時
6. **建立最終資料集** 準備用於網路介面

**注意**: 腳本包含速率限制（2秒延遲）以尊重 objkt.com 的 API 限制。對於交易較多的錢包，這可能需要幾分鐘。

### 🔍 地址問題故障排除

**如果沒有資料:**
- 驗證您的錢包地址是否正確（檢查拼寫錯誤）
- 確保該地址在 objkt.com 上有 NFT 交易
- 嘗試不同的錢包地址進行測試

**如果出現錯誤:**
- 檢查您的網路連線
- 驗證 objkt.com 的 API 是否可存取
- 確保錢包地址格式正確（tz1...、tz2... 或 tz3...）

---

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