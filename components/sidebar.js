import React, { useState } from 'react';

const Sidebar = () => {
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
    const [selectedBrand, setSelectedBrand] = useState('All Brands');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const departments = ['All Departments', 'Electronics', 'Clothing', 'Home', 'Sports'];
    const brands = ['All Brands', 'Apple', 'Nike', 'Samsung', 'Sony'];

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`fixed top-0 left-0 bottom-0 bg-gray-100 w-64 py-4 px-8 z-10 ${isCollapsed ? "collapsed" : ""}`}>
            <button
                className="block w-full bg-gray-200 text-gray-700 font-semibold p-2 rounded"
                onClick={handleCollapse}
            >
                {isCollapsed ? 'Expand' : 'Collapse'} Sidebar
            </button>
            <div className="sidebar-content" style={{ display: isCollapsed ? "none" : "block" }}>
                <h2 className="text-lg font-semibold mt-4">Filter by Department</h2>
                <div className="mb-4">
                    <select
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                        value={selectedDepartment}
                        onChange={handleDepartmentChange}
                    >
                        {departments.map((department) => (
                            <option key={department} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </div>
                <h2 className="text-lg font-semibold">Filter by Brand</h2>
                <div className="mb-4">
                    <select
                        className="block w-full border border-gray-300 rounded-md py-2 px-3 leading-tight focus:outline-none focus:border-blue-500"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                    >
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
