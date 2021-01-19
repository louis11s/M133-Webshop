import {addItemToBasket, getAllProducts, getProductById, removeItemFromBasket, Router} from "../deps.ts";

export const router = new Router();

router
.get("/produkte", (context)=> {
context.response.body= getAllProducts();
})
.get("/produkte/:id", (context)=>{
    if (context.params && context.params.id){
   context.response.body = getProductById(context.params.id);
}})
.put("/basket", async (context) => {
    const result = context.request.body();
    const params: URLSearchParams = await result.value;
    const productId = params.get("productId");
    if (!productId){
        return;
    }
    await addItemToBasket(context, productId);
    context.response.status = 200;
    context.response.body = "ok";
})
.delete("/basket", async (context) => {
    const result = context.request.body();
    const params: URLSearchParams = await result.value;
    const productId = params.get("productId");
    if (!productId){
        return;
    }
    await removeItemFromBasket(context, productId);
    context.response.status = 200;
    context.response.body = "ok";
});

