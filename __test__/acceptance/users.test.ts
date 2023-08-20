import * as request from "supertest";

import app from "../../src/app";
import { port } from "../../src/config";
// import { AppDataSource } from "../../src/data-source";
import { IncomingMessage, Server, ServerResponse } from "http";
import { DataSource } from "typeorm";
import { User } from "../../src/entity/User";

const mockDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

beforeEach(async () => {
  await mockDataSource.initialize().then(async () => {
    server = await app.listen(port);
  });
});

afterEach(async () => {
  await mockDataSource.destroy();
  server.close();
});

it("it should be with no users in the first place", async () => {
  const response = await request(app).get("/users");
  console.log(response.statusCode);
  expect(response.statusCode).toBe(500);
  expect(response.body).toBe([]);
});
