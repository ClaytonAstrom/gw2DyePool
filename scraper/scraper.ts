import { createConnection, getConnection } from "typeorm";
import axios from "axios";
import promise from "bluebird";
import Item from "../src/entity/Item";
import Color from "../src/entity/Color";

axios.defaults.headers.common["User-Agent"] = "gw2dyescraperpool";

const callApi = async (endpoint: string) => {
  const url = `https://api.guildwars2.com/v2/${endpoint}`;
  const response = await axios.get(url);
  return response.data;
};

const getRGBIfMatExists = (
  obj: { [index: string]: { rgb: number[] } },
  prop: string
) => {
  if (Object.prototype.hasOwnProperty.call(obj, prop)) {
    return obj[prop].rgb;
  }
  return null;
};

const storeInfo = async (color: number) => {
  const colorData = await callApi(`colors/${color}`);
  if (Object.prototype.hasOwnProperty.call(colorData, "item")) {
    try {
      const connection = getConnection();
      const itemData = await callApi(`items/${colorData.item}`);
      const itemRepo = connection.getRepository(Item);
      const gw2Item = new Item();
      const gw2Color = new Color();
      gw2Item.id = itemData.id;
      gw2Item.chat_link = itemData.chat_link;
      gw2Item.icon = itemData.icon;
      gw2Color.id = colorData.id;
      gw2Color.cloth = getRGBIfMatExists(colorData, "cloth");
      gw2Color.fur = getRGBIfMatExists(colorData, "fur");
      gw2Color.leather = getRGBIfMatExists(colorData, "leather");
      gw2Color.metal = getRGBIfMatExists(colorData, "metal");
      gw2Color.name = colorData.name;
      gw2Color.item = gw2Item;
      gw2Item.color = gw2Color;
      await itemRepo.save(gw2Item);
    } catch (e) {
      console.log(color);
    }
  }
};

(async () => {
  await createConnection();

  const colors = await callApi("colors");

  promise.each(colors, async (color: number, idx) => {
    if (idx > 0 && idx % 250 === 0) {
      await promise.delay(60000);
      return storeInfo(color);
    }
    return storeInfo(color);
  });
})();
