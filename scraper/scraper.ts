import { createConnection, getConnection } from "typeorm";
import axios from "axios";
import lodash from "lodash";
import Item from "../src/entity/Item";
import Color from "../src/entity/Color";

axios.defaults.headers.common["User-Agent"] = "gw2dyescraperpool";

interface Rgb {
  rgb: number[];
}
interface ColorResponse {
  id: number;
  name: string;
  cloth: Rgb;
  fur?: Rgb;
  metal: Rgb;
  leather: Rgb;
}

interface ItemResponse {
  id: number;
  // eslint-disable-next-line camelcase
  chat_link: string;
  icon: string;
}

const callApi = async (endpoint: string) => {
  const url = `https://api.guildwars2.com/v2/${endpoint}`;
  const response = await axios.get(url);
  return response.data;
};

const storeInfo = async (color: ColorResponse, item: ItemResponse) => {
  try {
    const connection = getConnection();
    const itemRepo = connection.getRepository(Item);
    const gw2Item = new Item();
    const gw2Color = new Color();
    gw2Item.id = item.id;
    gw2Item.chat_link = item.chat_link;
    gw2Item.icon = item.icon;
    gw2Color.id = color.id;
    gw2Color.cloth = color.cloth.rgb;
    gw2Color.fur = color.fur ? color.fur.rgb : null;
    gw2Color.leather = color.leather.rgb;
    gw2Color.metal = color.metal.rgb;
    gw2Color.name = color.name;
    gw2Color.item = gw2Item;
    gw2Item.color = gw2Color;
    await itemRepo.save(gw2Item);
  } catch (e) {
    console.log(e);
  }
};

(async () => {
  await createConnection();

  const colors = await callApi("colors?ids=all");
  let itemSet: number[] = [];
  const promises: Promise<unknown>[] = [];
  lodash.each(colors, (color) => {
    if (Object.prototype.hasOwnProperty.call(color, "item")) {
      itemSet.push(color.item);
    }
  });

  lodash.each(lodash.chunk(itemSet, 200), (smallSet) => {
    promises.push(
      callApi(`items?ids=${smallSet.toString()}`)
        .then((items) => {
          lodash.each(items, (item) => {
            promises.push(
              storeInfo(lodash.find(colors, { item: item.id }), item)
            );
          });
          itemSet = [];
        })
        .catch((e) => {
          console.log(e);
        })
    );
  });
  await Promise.all(promises);
})();
