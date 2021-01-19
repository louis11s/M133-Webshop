async function fetchProducts(){
    const response = await fetch("/produkte");
    const products = await response.json();
    const bodyElement = document.querySelector("body");
    for (const product of products){
        const div = document.createElement("div");
        div.addEventListener("click", ()=>{
            window.location.href="/product.html?product=" + product.id;
        });
        div.innerHTML =`
        <div  class="bilder">
            <img width="50%" src="/img/${product.imageName}"></img>
            <p>${product.productName}</p>
            <div>
                <h4 class="card">${product.normalPrice} CHF</h4><br>
                <h3>Aktionspreis! </h3>
                <h3>${product.specialOffer} CHF</h3>
            </div>
        </div>`;
        bodyElement.append(div);
    }
}
fetchProducts() .then();