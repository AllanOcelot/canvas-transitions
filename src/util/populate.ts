import { ItemToDraw  } from "./item";

export function populateAnimationItems(amount: number, offset: number, isClear: boolean, animationDirection: string) {
  let localArray  = [];
  let itemHeight:number  = window.innerHeight / amount;
  let itemWidth:number   = window.innerWidth / amount;
  let itemXPos:number    = 0; 
  let itemYPos:number    = 0;


  switch(animationDirection.toLowerCase()){
    case 'up':
      itemYPos = window.innerHeight + itemHeight
      break
    case 'down':
      itemYPos = -itemHeight
      break
  }


  for (let i = 0; i < amount; i++) {
    if (i > 0) {
      itemXPos += itemWidth;
    }

    // Always set position off-screen at the start
    let localItem = new ItemToDraw([itemXPos, itemYPos], itemWidth, itemHeight, "black", isClear);
    localArray.push(localItem);
  }
  return localArray;
}