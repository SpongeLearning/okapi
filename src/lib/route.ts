import { Context, Next } from "koa";

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
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

type Hook = (hook: Context) => Promise<Context | void> | Context | void;

type HookMap = {
  [method in HOOK_METHOD]: Hook[];
};

interface HooksObject{
  before: HookMap;
  after: HookMap;
  error: HookMap;
  finally?: HookMap;
}

const hooks = new Map<string, HooksObject>();

const addMessagesService = () => {
  hooks.set("/messages", {
    before: {
      all: [],
      find: [],
      get: [],
      create: [
        async (ctx) => {
          ctx.body = "hello world";
        },
      ],
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
};

hooks.set("/services", {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async (ctx) => {
        addMessagesService();
        ctx.body = "hello world";
      },
    ],
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

const matchHook = (path: string): HooksObject | undefined => {
  console.log(hooks.get(path));
  console.log(path);
  return hooks.get(path);
};

const execHookMap = async (ctx: Context, hookMap: HookMap): Promise<void> => {
  hookMap.all.forEach((hook) => hook(ctx));

  switch (ctx.method) {
    case HTTP_METHOD.DELETE: {
      hookMap.remove.forEach((hook) => hook(ctx));
      break;
    }
    case HTTP_METHOD.GET: {
      hookMap.get.forEach((hook) => hook(ctx));
      break;
    }
    case HTTP_METHOD.PATCH: {
      hookMap.patch.forEach((hook) => hook(ctx));
      break;
    }
    case HTTP_METHOD.POST: {
      hookMap.create.forEach((hook) => hook(ctx));
      break;
    }
    case HTTP_METHOD.PUT: {
      hookMap.update.forEach((hook) => hook(ctx));
      break;
    }
    default: {
      throw new Error(`This method ${ctx.method} has no implementation`);
    }
  }
};

const route = async (ctx: Context, next: Next): Promise<void> => {
  console.debug(ctx.method, ctx.path);
  const hook = matchHook(ctx.path);

  if (hook == null) {
    return await next();
  }

  try {
    execHookMap(ctx, hook.before);
  } catch (error) {
    try {
      execHookMap(ctx, hook.error);
    } catch (error) {
      console.log("[Error] at route", error);
    }
  }

  await next();

  try {
    execHookMap(ctx, hook.after);
  } catch (error) {
    try {
      execHookMap(ctx, hook.error);
    } catch (error) {
      console.log("[Error] at route", error);
    }
  }
};

export default route;
