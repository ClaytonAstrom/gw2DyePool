import { Response } from "express";
import { getConnection } from "typeorm";
import Item from "../../entity/Item";

export default class ColorController {
  private readonly connection;

  constructor() {
    this.connection = getConnection();
  }

  public async getColorInfo(res: Response): Promise<void> {
    const itemRepo = this.connection.getRepository(Item);
    const items = await itemRepo.find({ relations: ["color"] });
    res.status(200).json(items);
  }
}
