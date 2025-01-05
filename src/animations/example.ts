import { ItemToDraw  } from "../util/item";

export function example(context: CanvasRenderingContext2D, winWidth: number, winHeight: number, type: string) {

  // Our 2d reference for canvas, standard is CTX.
  const ctx = context;
  let startTime : number; 
  let delay: number = 100; 
  let itemsToAnimate : Array<ItemToDraw>;
  let drawAnimationFrame  : number;



  function allItemsFinished(itemsToCheck : Array<ItemToDraw>){
    return itemsToCheck.every(obj => obj.isFinished)
  }

  // Each item drawn to scheme should follow a basic class.
  // this will be imported in future.


  // Populate items we want to animate.
  function populateAnimationItems(amount: number, offset: number, isClear: boolean) {
    let localArray = [];
    let itemHeight = winHeight / amount;
    let itemWidth = winWidth / amount;
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


  // This is our main drawing function
  let animationFrame: number;

  function mainFunction(timestamp: number) {
    // Check if all items are finished  
    if (allItemsFinished(itemsToAnimate)) {
      console.log("All animations complete.");
      cancelAnimationFrame(animationFrame);
      clearItems();
      const event = new Event("fillComplete");
      document.dispatchEvent(event);
      return;
    }
  
    // Perform drawing and clearing logic
    drawAnimation();
    animationLogic();
  
    // Schedule the next frame
    animationFrame = requestAnimationFrame(mainFunction);
  }
  



  function animationLogic(){
    let currentTime = performance.now();

    // loop over each item we want to animate
    // ensure that time has passed ( the delay we want )
    itemsToAnimate.forEach((item, index) => {
      let itemStartTime = startTime + index * delay; // Calculate the start time for this object
      if (currentTime >= itemStartTime) {
        if(!item.isFinished){
          if(item.state === "Down"){
            if(itemsToAnimate[index].getPositionY() < winHeight - item.getHeight() ) {
              itemsToAnimate[index].setPositionY( itemsToAnimate[index].getPositionY() + 50)
            }else{
              itemsToAnimate[index].isFinished = true
            }
          }
        }else{
          console.log('the item is finished')
          return;
        }
      }
    });
  }

  function drawAnimation() {
    if(!allItemsFinished(itemsToAnimate)){
      itemsToAnimate.forEach((item, index) => {
          context.fillStyle = item.color;
          if(type === 'fill'){
            context.fillRect(item.getPositionX(), item.getPositionY(), item.getWidth(), item.getHeight());
          }else {
            context.clearRect(item.getPositionX(), item.getPositionY(), item.getWidth(), item.getHeight());
          }
      });
    }
  }


  // PROGRAM START'S HERE  
  function createItems() {
    clearItems(); // Clear the previous items
    startTime = performance.now(); // Reset start time
    itemsToAnimate = populateAnimationItems(5, 0, false);
    drawAnimationFrame = requestAnimationFrame(mainFunction);
  }

  function clearItems(){
    itemsToAnimate = []
  }


  // Fire off the animation!
  createItems();
}
