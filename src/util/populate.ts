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
        itemXPos = itemWidth * i
        break
      case 'down':
        itemYPos = -itemHeight
        itemXPos = itemWidth * i
        break
      case 'left':
        itemYPos = itemHeight * i
        itemXPos = window.innerWidth + itemWidth * 1.2
        break
      case 'right':
        itemYPos = itemHeight * i
        itemXPos = 0 - itemWidth * 1.2
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