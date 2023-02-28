import { useState } from 'react';
import {colors, brands} from '../config/config';


function PoshmarkSearchForm({ onSubmit }) {
    const [query, setQuery] = useState('');
    const [color, setColor] = useState([]);
    const [inventoryStatus, setInventoryStatus] = useState([]);
    const [brand, setBrand] = useState('');
    const [count, setCount] = useState(48);

    function handleQueryChange(event) {
        setQuery(event.target.value);
    }

    function handleColorChange(event) {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setColor(selectedOptions);
    }

    function handleInventoryStatusChange(event) {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setInventoryStatus(selectedOptions);
    }

    function handleBrandChange(event) {
        setBrand(event.target.value);
    }

    function handleCountChange(event) {
        setCount(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const request = {
            filters: {
                department: 'All',
                brand: brand ? [brand] : [],
                color: color,
                inventory_status: ['available']
            },
            query_and_facet_filters: {
                department: 'All'
            },
            query: query,
            facets: ['brand', 'color', 'department'],
            experience: 'all',
            sizeSystem: 'us',
            count: count.toString()
        };

        const apiParams = {
            request: JSON.stringify(request),
            feature_extraction_setting: null,
            suggested_filters_count: 40,
            summarize: 'true',
            pm_version: '233.0.0'
        };

        const apiUrl = `/vm-rest/posts?${new URLSearchParams(apiParams)}&summarize=true`;

        onSubmit(apiUrl); // Call the onSubmit callback function with the generated API URL
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="query">Search Query:</label>
            <input type="text" id="query" name="query" value={query} onChange={handleQueryChange} /><br />

            <label htmlFor="color">Color:</label>
            <select id="color" name="color[]" multiple value={color} onChange={handleColorChange}>
                {colors.map(option => <option key={option} value={option}>{option}</option>)}
            </select><br />

            <label htmlFor="inventory_status">Inventory Status:</label>
            <select id="inventory_status" name="inventory_status[]" multiple value={inventoryStatus} onChange={handleInventoryStatusChange}>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
            </select><br />

            <label htmlFor="brand">Brand:</label>
            <select id="brand" name="brand" value={brand} onChange={handleBrandChange}>
                <option value="">All Brands</option>
                {brands.map(option => <option key={option.term} value={option.term}>{option.term}</option>)}
            </select><br />

            <label htmlFor="count">Number of Results:</label>
            <input type="number" id="count" name="count" min="1" max="100" value={count} onChange={handleCountChange} /><br />

            <button type="submit">Search</button>
        </form>
    );
}



export default PoshmarkSearchForm;