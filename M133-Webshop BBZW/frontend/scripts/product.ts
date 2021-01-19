/// <reference lib="dom" />

import {Basket, Product} from "../../deps.ts";

getProductInformation().then(product => {
    if (!product) {
        return;
    }
    const image = document.querySelector(".product-image");
    if (image) {
        image.setAttribute("src", "/img/" + product.imageName);
        image.setAttribute("alt", product.imageName);
    }
    const nameContainer = document.querySelector(".product-name");

    if (nameContainer) {
        nameContainer.innerText = product.productName;
    }

    const descContainer = document.querySelector(".product-description");
    if (descContainer) {
        descContainer.innerText = product.description;
    }

    if (product.specialOffer) {
        const specialOffer = document.querySelector(".product-price");
        if (specialOffer) {
            specialOffer.innerText = "CHF " + formatPrice(product.specialOffer);
        }
    } else {
        const price = document.querySelector(".product-price");
        if (price) {
            price.innerText = "CHF " + formatPrice(product.normalPrice);
        }
    }

    const addToCartButton = document.querySelector(".product-add");
    if (addToCartButton) {
        addToCartButton.addEventListener("click", async () => {
            const response = await fetch("/basket", {
                method: "put",
                body: "productId=" + product.id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            const basket: Basket = await response.json();
            /* handle basket */
        });
    }
});

async function getProductInformation(): Promise<Product> {
    const productId = getParameterByName("product");
    const response = await fetch("/products/" + productId);
    return response.json();
}

function getParameterByName(name: string, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function countDecimals(num: number) {
    if (Math.floor(num.valueOf()) === num.valueOf()) return 0;
    return num.toString().split(".")[1].length || 0;
}

function formatPrice(price: number): string {
    const priceString = price.toString();
    switch (countDecimals(price)) {
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
