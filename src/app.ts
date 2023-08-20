import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import * as morgan from "morgan";
import { Routes } from "./routes";
import { validationResult } from "express-validator";

function handleError(
  err,
  req: Request,
  res: Response,
  next: express.NextFunction
) {
  res.status(err.statusCode || 500).send({ message: err.message });
}

// create express app
const app = express();

// logging
app.use(morgan("tiny"));
app.use(bodyParser.json());

// register express routes from defined application routes
Routes.forEach((route) => {
  app[route.method](
    route.route,
    ...route.validation,
    async (req: Request, res: Response, next: Function) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const result = await new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        res.json(result);
      } catch (error) {
        // pass the error to the next middleware
        next(error);
      }
    }
  );
});

app.use(handleError);

export default app;
