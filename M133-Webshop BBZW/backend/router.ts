import {addItemToBasket, Basket, getAllProducts, getProductById, removeItemFromBasket, Router} from "../deps.ts";

export const router = new Router();

router
.get("/produkte", (context)=> {
context.response.body= getAllProducts();
})
.get("/produkte/:id", (context)=>{
    if (context.params && context.params.id){
   context.response.body = getProductById(context.params.id);
}})
.get("/basket", async (context) => {
    if (await context.state.session.get("basket") === undefined) {
        context.response.status = 404;
        return;
    }
    const basket: Basket = await context.state.session.get("basket");
    context.response.status = 200;
    context.response.body = Object.fromEntries(basket);
})
.put("/basket", async (context) => {
    const result = context.request.body();
    const params: URLSearchParams = await result.value;
    const productId = params.get("productId");
    if (!productId){
        return;
    }
    await addItemToBasket(context, productId);
    const res: Map<string, number> = await context.state.session.get("basket");
    context.response.status = 200;
    context.response.body = Object.fromEntries(res);
})
.delete("/basket", async (context) => {
    const result = context.request.body();
    const params: URLSearchParams = await result.value;
    const productId = params.get("productId");
    if (!productId){
        return;
    }
    await removeItemFromBasket(context, productId);
    const res = await context.state.session.get("basket");
    context.response.status = 200;
    context.response.body = Object.fromEntries(res);
});




