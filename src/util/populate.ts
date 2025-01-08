import { ItemToDraw  } from "./item";

export function populateAnimationItems(amount: number, offset: number, isClear: boolean) {
  let localArray = [];
  let itemHeight = window.innerHeight / amount;
  let itemWidth = window.innerWidth / amount;
  let itemXPos = 0;

  for (let i = 0; i < amount; i++) {
    if (i > 0) {
      itemXPos += itemWidth;
    }

    // Always set position off-screen at the start
    let localItem = new ItemToDraw([itemXPos, -itemHeight], itemWidth, itemHeight, "black", isClear);
    localArray.push(localItem);
  }
  return localArray;
}