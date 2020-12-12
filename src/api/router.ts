import express, { Application } from "express";
import ColorController from "./controllers/ColorController";
import UserController from "./controllers/UserController";

export default class Routes {
  private readonly router: express.Router;

  private readonly userController: UserController;

  private readonly colorController: ColorController;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.colorController = new ColorController();
  }

  public endpoints(app: Application): void {
    this.router.route("/account").post((req, res) => {
      this.userController.updateUser(req, res);
    });
    this.router.route("/colors").get((_req, res) => {
      this.colorController.getColorInfo(res);
    });
    app.use("/api", this.router);
  }
}
