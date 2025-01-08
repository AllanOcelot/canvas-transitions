import { ItemToDraw  } from "./item";

export function populateAnimationItems(amount: number, offset: number, isClear: boolean, animationDirection: string) {
  let localArray  = [];
  let itemHeight:number  = window.innerHeight / amount;
  let itemWidth:number   = window.innerWidth / amount;
  let itemXPos:number    = 0; 
  let itemYPos:number    = 0;





  for (let i = 0; i < amount; i++) {
    switch(animationDirection.toLowerCase()){
      case 'up':
        itemYPos = window.innerHeight + itemHeight
        itemXPos = 0 - itemWidth * i
        break
      case 'down':
        itemYPos = -itemHeight
        break
      case 'left':
        itemXPos = window.innerWidth -itemWidth
        break
      case 'right':
        itemXPos = -itemHeight
        break
    }


    if (i > 0) {
      //itemXPos += itemWidth;
    }

    // Always set position off-screen at the start
    let localItem = new ItemToDraw([itemXPos, itemYPos], itemWidth, itemHeight, "black", isClear);
    localArray.push(localItem);
  }
  return localArray;
}