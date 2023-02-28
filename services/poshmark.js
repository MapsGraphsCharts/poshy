// poshmark.js

import axios from 'axios';

async function fetchPoshmarkQuery(url) {
    try {
        let allData = [];

        const maxCalls = 5;
        let numCalls = 0; // initialize the number of API calls made
        let nextMaxId = 1;

        while (nextMaxId && numCalls < maxCalls) {
            const response = await axios.get(url);
            const data = response.data;

            // Append the results to the allData array
            allData = allData.concat(data.data);

            // Get the next max_id value for pagination
            nextMaxId = data.more.next_max_id;

            numCalls++;
        }

        // Return the entire JSON object
        return {
            allData,
        };
        console.log(allData)
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { fetchPoshmarkQuery };
