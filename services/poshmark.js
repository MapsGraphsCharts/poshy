const axios = require('axios');

const defaultFilters = {
    department: 'Men',
    category: '',
    sub_category: '',
    brand: ['lululemon athletica'],
    size: {
        include: ['L']
    },
    price_amount_range: [{
        min: {
            val: '5',
            currency_code: 'USD'
        },
        max: {
            val: '200',
            currency_code: 'USD'
        }
    }],
    color: ['Black'],
    inventory_status: ['available']
};

const defaultOptions = {
    filters: defaultFilters,
    query_and_facet_filters: {
        department: "Men",
    },
    query: '',
    facets: ['brand', 'color', 'category_v2'],
    experience: 'all',
    sizeSystem: 'us',
    count: '48',
};

async function fetchPoshmarkQuery(query, overrides = {}) {
    try {
        let allData = [];

        const options = {
            ...defaultOptions,
            ...overrides,
            query_and_facet_filters: {
                ...defaultOptions.query_and_facet_filters,
                ...overrides.query_and_facet_filters,
            }
        };

        const filters = {
            ...defaultFilters,
            ...overrides.filters,
            size: {
                ...defaultFilters.size,
                ...overrides.filters?.size,
            },
            price_amount_range: overrides.filters?.price_amount_range
                ? [overrides.filters.price_amount_range]
                : defaultFilters.price_amount_range,
        };

        const maxCalls = 1;
        let numCalls = 0; // initialize the number of API calls made
        let nextMaxId = 1;

        while (nextMaxId && numCalls < maxCalls) {
            const request = {
                filters: filters,
                ...options,
                max_id: nextMaxId,
            };
            const url = `https://cors-anywhere.herokuapp.com/poshmark.com/vm-rest/api/proxy?request=${encodeURIComponent(JSON.stringify(request))}&summarize=true&pm_version=233.0.0`;
            console.log(url)
            const response = await axios.get(url, {
                headers: {
                    'Origin': 'http://localhost:3001', // add your origin URL here
                    'X-Requested-With': 'XMLHttpRequest' // add the X-Requested-With header
                }
            });
            console.log(response)
            const data = response.data;

            // Append the results to the allData array
            allData = allData.concat(data.data);

            // Get the next max_id value for pagination
            nextMaxId = data.more.next_max_id;

            numCalls++;
        }

        // Return the entire JSON object
        return {
            allData
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Export the function
module.exports = {
    fetchPoshmarkQuery: fetchPoshmarkQuery
};
