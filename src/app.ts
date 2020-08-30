import Koa from "koa";
import bodyparser from "koa-bodyparser";

import route from "./lib/route";

const app = new Koa();

app.use(bodyparser());

app.use(route);

export default app;
