async function fetchProduct(){
    const productId = getParameterByName("product");
    const response = await fetch("/produkte/" + productId);
    const product = await response.json();
    const bodyElement = document.querySelector("body");
        const div = document.createElement("div");
        div.innerHTML =`
        <div>
            <img class="bild" width="40%" src="/img/${product.imageName}"></img>
            <h2>${product.productName}</h2>
            <div>
                <br><span  class="card">${product.normalPrice} CHF</span><br>
                <h3>Aktionspreis! </h3>
                <h3>${product.specialOffer} CHF</h3>
            <p>${product.description}</p>
        </div>`;
        bodyElement.append(div);
}



function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[[]]/g, '$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

fetchProduct() .then();