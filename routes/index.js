import { Router } from "express";
import { userRouter } from "../modules/users/users.route.js";

const router = Router();
const moduleRoutes = [
  {
    path: "/users",
    routes: userRouter,
  },
  {
    path: "/posts",
    routes: postRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
