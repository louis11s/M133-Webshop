async function productToCart(product) {
    await fetch("/babashop/cart", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
async function loadTable2() {
    const table = document.querySelector("table");
    const responseTableColumns = await fetch("/babashop/cart/tablecolumns");
    const tablecolumns = await responseTableColumns.json();
    const trTitle = document.createElement("tr");
    const tdProductTitle = trTitle.appendChild(document.createElement("th"));
    const tdEinzelpreisTitle = trTitle.appendChild(document.createElement("th"));
    const tdAnzahlTitle = trTitle.appendChild(document.createElement("th"));
    const tdTotalTitle = trTitle.appendChild(document.createElement("th"));
    tdProductTitle.innerHTML = tablecolumns[0].title;
    tdEinzelpreisTitle.innerHTML = tablecolumns[1].title;
    tdAnzahlTitle.innerHTML = tablecolumns[2].title;
    tdTotalTitle.innerHTML = tablecolumns[3].title;
    table.appendChild(trTitle);
    const responseCartProducts = await fetch("/babashop/cart/products");
    const cartProducts = await responseCartProducts.json();
    for (const product of cartProducts){
        const tr = document.createElement("tr");
        const tdProduct = tr.appendChild(document.createElement("td"));
        const tdEinzelpreis = tr.appendChild(document.createElement("td"));
        const tdAnzahl = tr.appendChild(document.createElement("td"));
        const tdTotal = tr.appendChild(document.createElement("td"));
        tdProduct.innerHTML = product.productName;
        tdEinzelpreis.innerHTML = product.specialOffer.toString();
        tdAnzahl.innerHTML = "<button>-</button>1<button>+</button>";
        tdTotal.innerHTML = "2";
        table.appendChild(tr);
    }
}
const loadTable1 = loadTable2;
export { loadTable1 as loadTable };
async function loadProducts2() {
    const responseProducts = await fetch("/babashop/products");
    const products = await responseProducts.json();
    const main = document.querySelector("main");
    const button = document.createElement("button");
    button.id = "btn-cart";
    button.innerHTML = "Warenkorb";
    const header = document.querySelector("header");
    header.appendChild(button);
    document.querySelector("#btn-cart").addEventListener("click", ()=>{
        location.href = "./lib/html/cart.html";
    });
    for (const product of products){
        const div = document.createElement("div");
        div.setAttribute("data-id", product.id);
        div.innerHTML = `\n            <div class="card">\n            <img src="./../assets/img/${product.imageName}" alt="Avatar" style="width:100%">\n            <div class="container">\n                <h4>${product.productName}</h4>\n                <p>${product.specialOffer} ${product.normalPrice}</p>\n                <button class="btn-addToCart" id="btn-id-${product.id}">Add to cart</button>\n            </div>\n            </div>\n        `;
        div.querySelector(".btn-addToCart").addEventListener("click", ()=>productToCart(product)
        );
        main.appendChild(div);
    }
}
const loadProducts1 = loadProducts2;
export { loadProducts1 as loadProducts };
