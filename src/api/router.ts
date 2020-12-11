import express, { Application } from "express";
import UserController from "./controllers/UserController";

export default class Routes {
  private readonly router: express.Router;

  private readonly userController: UserController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
  }

  public endpoints(app: Application): void {
    this.router.route("/account").post((req, res) => {
      this.userController.updateUser(req, res);
    });
    this.router.route("/userDyes").get((_req, res) => {
      this.userController.getUsersWithColors(res);
    });
    app.use("/api", this.router);
  }
}
