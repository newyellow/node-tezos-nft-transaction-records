const axios = require('axios');
const fs = require('fs');

// Configuration parameters - modify these as needed
const CONFIG = {
    // GraphQL API endpoint
    API_ENDPOINT: 'https://data.objkt.com/v3/graphql',

    // GraphQL query - replace with your actual query
    QUERY_SALES: `
      query SALES($offset: Int!, $address: String!) {
        holder(where: {address: {_eq: $address}}) {
          listings_sold(
            where: {token: {creators: {creator_address: {_neq: $address}}}}
            order_by: {timestamp: asc}
            offset: $offset
          ) {
            token {
              fa_contract
              timestamp
              token_id
              thumbnail_uri
              artifact_uri
              display_uri
              name
            }
            price_xtz
            seller_address
            buyer_address
            amount
            ophash
            timestamp
          }
        }
      }
    `,

    QUERY_BOUGHTS: `
      query BOUGHTS($offset: Int!, $address: String!) {
        holder(where: {address: {_eq: $address}}) {
          listings_bought(
            where: {token: {creators: {creator_address: {_neq: $address}}}}
            order_by: {timestamp: asc}
            offset: $offset
          ) {
            token {
              fa_contract
              timestamp
              token_id
              thumbnail_uri
              artifact_uri
              display_uri
              name
            }
            price_xtz
            seller_address
            buyer_address
            amount
            ophash
            timestamp
          }
        }
      }
    `,

    // Default variables
    DEFAULT_VARIABLES: {
        address: "tz1RPZp6NLzn7x4g7jhqHtCkhCQVnhbVMj8y",
        offset: 0
    },

    // Optional: Add any variables for the query
    VARIABLES: {},

    // Optional: Add headers (e.g., for authentication)
    HEADERS: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer your-token-here'
    }
};

/**
 * Fetches data from GraphQL server
 * @param {string} query - GraphQL query string
 * @param {object} variables - Query variables (optional)
 * @param {object} headers - Additional headers (optional)
 * @returns {Promise<object>} GraphQL response
 */
async function fetchGraphQLData(query = CONFIG.GRAPHQL_QUERY, variables = CONFIG.VARIABLES, headers = {}) {
    try {
        const response = await axios({
            method: 'POST',
            url: CONFIG.API_ENDPOINT,
            headers: {
                ...CONFIG.HEADERS,
                ...headers
            },
            data: {
                query: query,
                variables: variables
            }
        });

        // Check for GraphQL errors
        if (response.data.errors) {
            throw new Error(`GraphQL Errors: ${JSON.stringify(response.data.errors)}`);
        }

        return response.data.data;
    } catch (error) {
        console.error('Error fetching GraphQL data:', error.message);
        throw error;
    }
}

/**
 * Main function to execute the GraphQL query
 */
async function main() {
    try {
        console.log('Fetching GraphQL data...');

        let configVariable = CONFIG.DEFAULT_VARIABLES;

        const salesData = await fetchGraphQLData(CONFIG.QUERY_SALES, configVariable, CONFIG.HEADERS);
        console.log(salesData.holder[0].listings_sold.length);

        let jsonResult = salesData.holder[0].listings_sold;
        let jsonString = JSON.stringify(jsonResult, null, 2);

        // Write the result to a JSON file
        fs.writeFileSync('sourceData/sales_data.json', jsonString, 'utf8');


        // let configVariable = CONFIG.DEFAULT_VARIABLES;

        // let resultArrat = [];

        // while (true) {
        //     const boughtData = await fetchGraphQLData(CONFIG.QUERY_BOUGHTS, configVariable, CONFIG.HEADERS);
        //     console.log(boughtData.holder[0].listings_bought.length);

        //     // push data into the array
        //     resultArrat.push(...boughtData.holder[0].listings_bought);

        //     // add offset
        //     if( boughtData.holder[0].listings_bought.length < 500) {
        //         break; // exit if less than 100 results
        //     }
        //     else
        //     {
        //         configVariable.offset += 500; // increment offset by 500
        //     }

        //     await sleep(2000);
        // }

        // // finish processing
        // console.log('Total records fetched:', resultArrat.length);
        // let jsonString = JSON.stringify(resultArrat, null, 2);
        // // Write the result to a JSON file
        // fs.writeFileSync('sourceData/bought_data.json', jsonString, 'utf8');


    } catch (error) {
        console.error('Error in main function:', error.message);
    }
}

// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Export functions for use in other modules
module.exports = {
    fetchGraphQLData,
    CONFIG
};

// Run the script if called directly
if (require.main === module) {
    main();
}
