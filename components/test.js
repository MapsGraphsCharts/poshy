import React, { useState, useEffect } from 'react';
import { fetchPoshmarkQuery } from '../services/poshmark';

const Test = () => {
    const [overrides, setOverrides] = useState({
        query: '',
        filters: {
            department: 'Men',
            // ...other default filters here
        },
    });

    const handleQueryChange = (event) => {
        setOverrides({ ...overrides, query: event.target.value }); // Update the query parameter
    };

    const handleDepartmentChange = (event) => {
        setOverrides({
            ...overrides,
            filters: { ...overrides.filters, department: event.target.value }, // Update the department filter
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('handleSubmit called'); // Add console logging to see if the function is firing
        const result = await fetchPoshmarkQuery(overrides.query, overrides.filters);
        console.log(result); // Log the result to see if the function is returning the expected output
        // Update the component with the new data
    };


    const fetchData = async () => {
        const result = await fetchPoshmarkQuery(overrides.query, overrides.filters);
        // Update the component with the new data
    };

    useEffect(() => {
        fetchData();

        return () => {
            // cleanup code here, if necessary
        };
    }, [overrides]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Query:
                    <input type="text" value={overrides.query} onChange={handleQueryChange} />
                </label>
                <br />
                <label>
                    Department:
                    <select value={overrides.filters.department} onChange={handleDepartmentChange}>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Test;
