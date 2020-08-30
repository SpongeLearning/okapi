import { Context, Next } from "koa";

type Route = (ctx: Context) => Promise<void>;

enum HOOK_METHOD {
  ALL = "all",
  FIND = "find",
  GET = "get",
  CREATE = "create",
  UPDATE = "update",
  PATCH = "patch",
  REMOVE = "remove",
}

enum HTTP_METHOD {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  PUT = "put",
  DELETE = "delete",
}

type Router = {
  [method in HOOK_METHOD]: Route[];
};

interface IHook {
  before: Router;
  after: Router;
  error: Router;
}

const hooks = new Map<string, IHook>();

hooks.set("messages", {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

const matchHook = (path: string): IHook | undefined => {
  return hooks.get(path);
};

const execRouter = async (ctx: Context, Router: Router): Promise<void> => {
  switch (ctx.method) {
    case HTTP_METHOD.DELETE: {
      break;
    }
    case HTTP_METHOD.GET: {
      break;
    }
    case HTTP_METHOD.PATCH: {
      break;
    }
    case HTTP_METHOD.POST: {
      break;
    }
    case HTTP_METHOD.PUT: {
      break;
    }
    default: {
      throw new Error(`This method ${ctx.method} has no implementation`);
    }
  }
};

const route = async (ctx: Context, next: Next): Promise<void> => {
  console.debug(ctx.method, ctx.path);
  const hook = matchHook(ctx.method);

  if (hook == null) {
    return await next();
  }
  try {
    execRouter(ctx, hook.before);
  } catch (error) {
    console.log("[Error] at route", error);
  }
  await next();
};

export default route;
