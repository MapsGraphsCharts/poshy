const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
    async rewrites() {
        return [
            {
                source: '/vm-rest/:path*',
                destination: 'https://poshmark.com/vm-rest/:path*',
            },
        ];
    },
    async serverMiddleware() {
        console.log('Starting server middleware');
        const apiProxy = createProxyMiddleware('/vm-rest', {
            target: 'https://poshmark.com',
            changeOrigin: true,
        });

        console.log('API Proxy created');
        return [apiProxy];
    },
};
