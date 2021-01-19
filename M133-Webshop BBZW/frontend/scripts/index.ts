/// <reference lib="dom" />
import {Product} from "../../deps.ts";

getProducts().then((products: Product[]) => {
    const section = document.querySelector("section");
    products.forEach((product: Product) => {
        if (section) {
            section.append(createProductBlock(product));
        }
    });
});

async function getProducts(): Promise<Product[]> {
    const response = await fetch("/products");
    return await response.json();
}

function createProductBlock(product: Product): HTMLElement {
    const imageBlock = document.createElement("img");
    imageBlock.setAttribute("src", "/img/" + product.imageName);
    imageBlock.setAttribute("alt", product.productName);
    imageBlock.classList.add("product-image");

    const productTitle = document.createElement("h3");
    imageBlock.classList.add("product-name");
    productTitle.innerText = product.productName;

    const productPriceWrapper = document.createElement("div");
    productPriceWrapper.classList.add("product-prices");

    const basePrice = document.createElement("p");
    basePrice.classList.add("product-price");
    basePrice.innerText = "CHF " + formatPrice(product.normalPrice)
    productPriceWrapper.append(basePrice);

    if (product.specialOffer){
        const reducedPrice = document.createElement("p");
        reducedPrice.classList.add("product-price-reduced");
        reducedPrice.innerText = "CHF " + formatPrice(product.specialOffer);

        productPriceWrapper.append(reducedPrice);
    }

    const productBlock = document.createElement("div"); // <-- mit Absicht kekw
    productBlock.classList.add("product-listing")
    productBlock.append(imageBlock);
    productBlock.append(productTitle);
    productBlock.append(productPriceWrapper);
    productBlock.addEventListener("click", () => {
        window.location.href = "/product.html?product=" + product.id;
    })

    return productBlock;
}

function countDecimals (num: number) {
    if(Math.floor(num.valueOf()) === num.valueOf()) return 0;
    return num.toString().split(".")[1].length || 0;
}

function formatPrice(price: number): string{
    const priceString = price.toString();
    switch (countDecimals(price)){
        case 0:
            return priceString + ".00";
        case 1:
            return priceString + "0";
        case 2:
            return priceString;
        default:
            return priceString;
    }
}
