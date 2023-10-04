import fs from 'fs';
import http from 'http';
import url from 'url';

const __dirname = new URL('.', import.meta.url).pathname;
const farmData = fs.readFileSync(`${__dirname}/data/farm.json`, 'utf-8');
const favicon = fs.readFileSync(`${__dirname}/public/favicon.ico`);

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);

    if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(farmData);
    } else if (pathname === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(favicon);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 not found!</h1>');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
