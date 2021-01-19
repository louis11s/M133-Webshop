import {getAllProducts, getProductById} from "../deps.ts";

export type Basket = Map<string, number>;

async function checkForSession(context: any) {
    if (await context.state.session.get("basket") === undefined) {
        let emptyBasket: Basket = new Map<string, number>();
        getAllProducts().forEach(product => {
            emptyBasket.set(product.id, 0);
        })
        await context.state.session.set("basket", emptyBasket);
    }
}

export async function addItemToBasket(context: any, id: string) {
    const productToAdd = getProductById(id);
    if (!productToAdd) {
        return;
    }
    await checkForSession(context);
    let basket = await context.state.session.get("basket");
    const currentAmount = await basket.get(id);
    if (!currentAmount){
        return;
    }
    let newAmount = currentAmount + 1;
    basket.set(id, newAmount);
}

export async function removeItemFromBasket(context: any, id: string) {
    let basket: Basket = await context.state.session.get("basket");
    const productToAdd = getProductById(id);
    if (!basket || !productToAdd) {
        return;
    }
    const currentAmount = await basket.get(id);
    if (!currentAmount){
        return;
    }
    let newAmount = currentAmount - 1;
    newAmount = newAmount < 0 ? 0 : newAmount;
    basket.set(id, newAmount);
}
