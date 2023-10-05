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

export default replaceTemplate;