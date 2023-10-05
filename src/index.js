import fs from "fs";
import http from "http";
import url from "url";

const __dirname = new URL(".", import.meta.url).pathname;
const farmData = fs.readFileSync(`${__dirname}/data/farm.json`, "utf-8");
const farmDataObj = JSON.parse(farmData);
const favicon = fs.readFileSync(`${__dirname}/public/favicon.ico`);
const index = fs.readFileSync(`${__dirname}/public/pages/index.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/public/pages/card.html`, "utf-8");

const product = fs.readFileSync(
    `${__dirname}/public/pages/product.html`,
    "utf-8",
);

const error404 = fs.readFileSync(`${__dirname}/public/pages/404.html`, "utf-8");

const replaceTemplate = (template, product) => {
    return template
        .replace(/{{PRODUCT_ID}}/g, product.id)
        .replace(/{{PRODUCT_FROM}}/g, product.from)
        .replace(/{{PRODUCT_PRICE}}/g, product.price)
        .replace(/{{PRODUCT_IMAGE}}/g, product.image)
        .replace(/{{PRODUCT_NAME}}/g, product.productName)
        .replace(/{{PRODUCT_QUANTITY}}/g, product.quantity)
        .replace(/{{PRODUCT_NUTRIENTS}}/g, product.nutrients)
        .replace(/{{PRODUCT_DESCRIPTION}}/g, product.description)
        .replace(/{{PRODUCT_ORGANIC}}/g, product.organic ? "organic" : "non-organic")
};

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    if (pathname === "/api") {
        res.writeHead(200, { "Content-Type": "text/json" });
        res.end(farmData);
    } else if (pathname === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/png" });
        res.end(favicon);
    } else if (pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        const cardsHtml = farmDataObj.map(el => replaceTemplate(card, el)).join('');
        const output = index.replace('{{PRODUCT_CARDS}}', cardsHtml);
        res.end(output);
    } else if (pathname === "/product" && query.id !== null) {
        res.writeHead(200, { "Content-Type": "text/html" });
        const productFound = farmDataObj.find((el) => el.id == query.id);

        if (!productFound) {
            res.end(error404);
        } else {
            const productHtml = replaceTemplate(product, farmDataObj.find((el) => el.id == query.id));
            res.end(productHtml);
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(error404);
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
