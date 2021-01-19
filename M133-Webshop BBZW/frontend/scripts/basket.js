async function getBasket() {
    const response = await fetch("/basket");
    console.log(await response.json());
}

getBasket().then();
