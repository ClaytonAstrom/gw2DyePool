import axios from "axios";
import { Request, Response } from "express";
import { getConnection } from "typeorm";
import User from "../../entity/User";

export default class UserController {
  private readonly connection;

  constructor() {
    this.connection = getConnection();
  }

  private static async verifyAccountPermissions(apiKey: string) {
    const response = await axios.get(
      `https://api.guildwars2.com/v2/tokeninfo?access_token=${apiKey}`
    );
    if (
      !response.data.permissions.includes("account") ||
      !response.data.permissions.includes("unlocks")
    ) {
      throw new Error("Missing permissions");
    }
    return response;
  }

  private async storeUserInfo(apiKey: string) {
    const response = await axios.get(
      `https://api.guildwars2.com/v2/account?access_token=${apiKey}`
    );
    const userRepo = this.connection.getRepository(User);
    const user = new User();
    user.id = response.data.id;
    user.name = response.data.name;
    user.key = apiKey;
    await userRepo.save(user);
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      await UserController.verifyAccountPermissions(req.body.apiKey);
      await this.storeUserInfo(req.body.apiKey);
      res.status(200).send("User updated");
    } catch (e) {
      if (e.toString().includes("401")) {
        res.status(401);
      } else {
        res.status(403);
      }
      res.send(e.toString());
    }
  }

  private async getUserDyes(): Promise<{ [index: string]: number[] }> {
    const userRepo = this.connection.getRepository(User);
    const userObject: { [index: string]: number[] } = {};
    const users = await userRepo.find();
    const promises: Promise<unknown>[] = [];
    users.forEach((user) => {
      promises.push(
        axios
          .get(
            `https://api.guildwars2.com/v2/account/dyes?access_token=${user.key}`
          )
          .then((userColors) => {
            userObject[user.name] = userColors.data;
          })
          .catch(() => {
            console.log(user);
          })
      );
    });
    await Promise.all(promises);
    return userObject;
  }

  public async getUsersWithColors(res: Response): Promise<void> {
    try {
      const userData = await this.getUserDyes();
      res.status(200).json(userData).send();
    } catch (e) {
      res.status(500).send(e.toString());
    }
  }
}
