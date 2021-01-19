import {Application, router, send, Session} from "./deps.ts"

const app = new Application();

const session = new Session({ framework: "oak" });
await session.init();
app.use(session.use()(session));

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (context) => {
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/frontend/`,
        index: "index.html",
    });
});

app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(
        `Listening on: ${secure ? "https://" : "http://"}${
            hostname ?? "localhost"
        }:${port}`
    );
});

await app.listen({ port: 8000 });