import { ItemToDraw  } from "../util/item";
import { populateAnimationItems } from "../util/populate"

export function squares(context: CanvasRenderingContext2D, winWidth: number, winHeight: number, type: string, amountOfObjects: number, amountOfOffset: number, animationDirection: string, animationSpeed: number) {

  // Our 2d reference for canvas, standard is CTX.
  const ctx = context;
  let startTime : number; 
  let delay: number = 100; 
  let itemsToAnimate : Array<ItemToDraw>;
  let drawAnimationFrame  : number;



  function allItemsFinished(itemsToCheck : Array<ItemToDraw>){
    return itemsToCheck.every(obj => obj.isFinished)
  }

  function mainFunction(timestamp: number) {
    // Check if all items are finished  
    if (allItemsFinished(itemsToAnimate)) {
      console.log("All animations complete.");
      cancelAnimationFrame(drawAnimationFrame);
      clearItems();
      const event = new Event(type + "Complete");
      document.dispatchEvent(event);
      return;
    }
  
    // Perform drawing and clearing logic
    drawAnimation();
    animationLogic();
  
    // Schedule the next frame
    drawAnimationFrame = requestAnimationFrame(mainFunction);
  }
  

  // Logic for the animation goes here.
  function animationLogic(){
    let currentTime = performance.now();

    // loop over each item we want to animate
    itemsToAnimate.forEach((item, index) => {
      let itemStartTime = startTime + index * delay; // Calculate the start time for this object
      if (currentTime >= itemStartTime) {
        if(!item.isFinished){

          // How should they animate?
          switch(animationDirection.toLowerCase()){
            case 'up':
              if(itemsToAnimate[index].getPositionY() > 0 ) {
                itemsToAnimate[index].setPositionY( itemsToAnimate[index].getPositionY() - 5 * animationSpeed)
              }else{
                itemsToAnimate[index].isFinished = true
              }
              break
            case 'down':
              if(itemsToAnimate[index].getPositionY() < winHeight - item.getHeight() ) {
                itemsToAnimate[index].setPositionY( itemsToAnimate[index].getPositionY() + 5 * animationSpeed)
              }else{
                itemsToAnimate[index].isFinished = true
              }
              break
            case 'left':
              if(itemsToAnimate[index].getPositionX() > 0 - item.getWidth() ) {
                itemsToAnimate[index].setPositionX( itemsToAnimate[index].getPositionX() - 5 * animationSpeed)
              }else{
                itemsToAnimate[index].isFinished = true
              }
              break
            case 'right':
              if(itemsToAnimate[index].getPositionX() < winWidth + item.getWidth() ) {
                itemsToAnimate[index].setPositionX( itemsToAnimate[index].getPositionX() + 5 * animationSpeed)
              }else{
                itemsToAnimate[index].isFinished = true
              }
              break
          }
        }else{
          return;
        }
      }
    });
  }

  // Draw the animation.
  function drawAnimation() {
    if(!allItemsFinished(itemsToAnimate)){
      itemsToAnimate.forEach((item, index) => {
          context.fillStyle = item.color;
          if(type === 'fill'){
            context.fillRect(item.getPositionX(), item.getPositionY(), item.getWidth(), item.getHeight());
          }else {
            context.clearRect(item.getPositionX(), item.getPositionY(), item.getWidth() + 5, item.getHeight() + 5);
          }
      });
    }
  }


  // PROGRAM START'S HERE  
  function createItems() {
    clearItems(); // Clear the previous items
    startTime = performance.now(); // Reset start time
    itemsToAnimate = populateAnimationItems(amountOfObjects, amountOfOffset, false, animationDirection);
    drawAnimationFrame = requestAnimationFrame(mainFunction);
  }

  function clearItems(){
    itemsToAnimate = []
  }


  // Fire off the animation!
  createItems();
}
