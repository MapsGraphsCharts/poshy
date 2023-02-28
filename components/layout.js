import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col h-screen">
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                    alt="Workflow"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default Layout;
