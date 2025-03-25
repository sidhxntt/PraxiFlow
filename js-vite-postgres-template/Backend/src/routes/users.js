// Init router and user controller
import { SubRoutes } from "./Sub_Routes.js";
import User from "../utils/helpers/User.js"; // Updated import path
import limiter from "../controllers/rate_limitter.js";
import JWT from "../controllers/Authentication.js";
import AUTH from "../controllers/Authorisation.js";
import { prisma } from "../utils/Clients/Prisma.js";

const createUserRoutes = () => {
  const auth = new JWT();
  const userRoutes = new SubRoutes();
  const userController = new User(prisma.user); // Changed to prisma.user to match schema

  userRoutes.endpoint("get", "/signup", userController.signupPage, [limiter]);
  userRoutes.endpoint("post", "/signup", userController.signup, [limiter]);
  userRoutes.endpoint("get", "/login", userController.loginPage, [limiter]);
  userRoutes.endpoint("post", "/login", userController.login, [limiter]);

  userRoutes.endpoint("get", "/users", userController.getAll.bind(userController), [auth.decryptJWT, AUTH.checkAdmin, limiter]);
  userRoutes.endpoint("get", "/users/:id", userController.getOne.bind(userController), [auth.decryptJWT, AUTH.checkAdmin, limiter]);
  userRoutes.endpoint("delete", "/users/:id", userController.delete.bind(userController), [auth.decryptJWT, AUTH.checkAdmin, limiter]);
  userRoutes.endpoint("patch", "/users/:id", userController.update.bind(userController), [auth.decryptJWT, AUTH.checkAdmin, limiter]);

  userRoutes.endpoint("post", "/users/invite", userController.invite.bind(userController), [auth.decryptJWT, limiter]);

  return userRoutes.getRouter();
};

const users = createUserRoutes();
export default users;