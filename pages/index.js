import React from 'react';
import Layout from '../components/Layout';
import Products from "@/components/products";
import Test from "@/components/test";

const HomePage = () => {
    return (
        <Layout>
            <div className="container mx-auto px-4">
                <Test />
                <Products />
            </div>
        </Layout>
    );
};

export default HomePage;
