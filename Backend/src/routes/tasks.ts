// Purpose: Handle all routes related to the tasks endpoint.
import { SubRoutes } from "./Sub_Routes";
import JWT from "../controllers/Authentication";
import limiter from "../controllers/rate_limitter";
import { prisma } from "../utils/Clients/Prisma";
import { TodoData } from "../utils/helpers/Todo";

const createUserRoutes = () => {
  
  const auth = new JWT();
  const todosRoutes = new SubRoutes();
  const tasks = new TodoData(prisma.task);

  todosRoutes.endpoint("get", "/", tasks.getAll.bind(tasks), [auth.decryptJWT, limiter]);
  todosRoutes.endpoint("get", "/:id", tasks.getOne.bind(tasks), [auth.decryptJWT, limiter]);
  todosRoutes.endpoint("post", "/", tasks.create.bind(tasks), [auth.decryptJWT, limiter]);
  todosRoutes.endpoint("patch", "/:id", tasks.update.bind(tasks), [auth.decryptJWT, limiter]);
  todosRoutes.endpoint("delete", "/:id", tasks.delete.bind(tasks), [auth.decryptJWT, limiter]);

  return todosRoutes.getRouter();
};

const tasks = createUserRoutes();
export default tasks;
