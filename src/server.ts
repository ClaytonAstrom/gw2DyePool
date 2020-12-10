import express from "express";
import { createConnection } from "typeorm";
import bodyParser from "body-parser";
import Routes from "./api/router";

createConnection().then(() => {
  const app = express();
  app.use(bodyParser.json());
  const router = new Routes();
  router.endpoints(app);

  app.listen(3000, () => {
    console.log(`server started at http://localhost:3000`);
  });
});
