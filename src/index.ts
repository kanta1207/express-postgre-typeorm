import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import * as morgan from "morgan";
import { Routes } from "./routes";
import { port } from "./config";
import { error } from "console";
import { validationResult } from "express-validator";
import app from "./app";

AppDataSource.initialize()
  .then(async () => {
    // start express server
    app.listen(port);
    console.log(
      `Express server has started on port ${port}. Open http://localhost:${port}/users to see results`
    );
  })
  .catch((error) => console.log(error));
