import { ValidationChain, body, param } from "express-validator";
import { UserController } from "./controller/UserController";

export interface Route {
  method: string;
  route: string;
  controller: typeof UserController;
  action: string;
  validation: ValidationChain[];
}
export const Routes: Route[] = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    validation: [],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    validation: [param("id").isInt()],
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    validation: [
      body("firstName").isString(),
      body("lastName").isString(),
      body("age").isInt({ min: 18 }).withMessage("User must be older than 18"),
    ],
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    validation: [param("id").isInt()],
  },
];
