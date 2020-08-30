import Router from "@koa/router";

const router = new Router();

const services = [
  {
    path: "/users",
    method:"get"
  },
  {
    path: "/users",
    method:"post"
  },
  {
    path: "/users",
    method:"put"
  },
  {
    path: "/users",
    method:"put"
  }
];

services.forEach((service) => {
  router.get(service.path, async (ctx) => {
    ctx.body = "hello world";
  });
});

router.use("/", async (ctx) => {
  ctx.body = "hello world";
});

router.get("/", async (ctx) => {
  ctx.body = "hello world";
});

router.get("/", async (ctx) => {
  ctx.body = "hello world2";
});

router.register

export default router;
