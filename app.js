const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load sales data
let salesData = [];
try {
    const dataPath = path.join(__dirname, 'sourceData', 'sales_data_processed.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    salesData = JSON.parse(rawData);
    console.log(`Loaded ${salesData.length} sales records`);
} catch (error) {
    console.error('Error loading sales data:', error);
    salesData = [];
}

// Load buy data
let buyData = [];
try {
    const buyDataPath = path.join(__dirname, 'sourceData', 'bought_data_processed.json');
    const rawBuyData = fs.readFileSync(buyDataPath, 'utf8');
    buyData = JSON.parse(rawBuyData);
    console.log(`Loaded ${buyData.length} buy records`);
} catch (error) {
    console.error('Error loading buy data:', error);
    buyData = [];
}

// API endpoint to get sales data with pagination
app.get('/api/sales', (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        
        // Validate parameters
        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({
                error: 'Invalid parameters. Page must be >= 1, limit must be between 1 and 100'
            });
        }
        
        // Get paginated data
        const paginatedData = salesData.slice(offset, offset + limit);
        const totalRecords = salesData.length;
        const totalPages = Math.ceil(totalRecords / limit);
        
        res.json({
            data: paginatedData,
            pagination: {
                page,
                limit,
                totalRecords,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        });
    } catch (error) {
        console.error('Error serving sales data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to get total count
app.get('/api/sales/count', (req, res) => {
    res.json({ totalRecords: salesData.length });
});

// API endpoint to get buy data with pagination
app.get('/api/buys', (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        
        // Validate parameters
        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({
                error: 'Invalid parameters. Page must be >= 1, limit must be between 1 and 100'
            });
        }
        
        // Get paginated data
        const paginatedData = buyData.slice(offset, offset + limit);
        const totalRecords = buyData.length;
        const totalPages = Math.ceil(totalRecords / limit);
        
        res.json({
            data: paginatedData,
            pagination: {
                page,
                limit,
                totalRecords,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        });
    } catch (error) {
        console.error('Error serving buy data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// API endpoint to get total count of buys
app.get('/api/buys/count', (req, res) => {
    res.json({ totalRecords: buyData.length });
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/sales`);
});
