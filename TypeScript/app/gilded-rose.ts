export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const handleAgedBrie = (item: Item) => {
  item.sellIn--;
  item.quality = Math.min(50, item.quality + 1);
};

const handleSulfuras = (item: Item) => {};

const handleBackstagePasses = (item: Item) => {
  const sellIn = item.sellIn;

  if (sellIn < 0) item.quality = 0;
  else {
    let incRate = 1;
    if (sellIn <= 5 && sellIn >= 0) incRate = 3;
    else if (sellIn <= 10 && sellIn > 5) incRate = 2;
    item.quality = item.quality + incRate;
  }
  item.sellIn--;
};

const handleConjured = (item: Item) => {
  let decRate = 1 * 2;
  if (item.sellIn < 0) decRate = 2 * 2;
  item.quality = Math.max(0, item.quality - decRate);
  item.sellIn--;
};
const handleOthers = (item: Item) => {
  let decRate = 1;
  if (item.sellIn < 0) decRate = 2;
  item.quality = Math.max(0, item.quality - decRate);
  item.sellIn--;
};

const getHandler = (name: string) => {
  const ifAgedBrie = name.includes("Aged Brie");
  const ifSulfuras = name.includes("Sulfuras");
  const ifBackstagePasses = name.includes("Backstage passes");
  const ifConjured = name.includes("Conjured");

  if (ifAgedBrie) return handleAgedBrie;
  else if (ifSulfuras) return handleSulfuras;
  else if (ifBackstagePasses) return handleBackstagePasses;
  else if (ifConjured) return handleConjured;
  else return handleOthers;
};

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      getHandler(this.items[i].name)(this.items[i]);
    }
    return this.items;
  }
}
