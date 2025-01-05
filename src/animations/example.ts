export function example(context: CanvasRenderingContext2D, winWidth: number, winHeight: number) {

  // Our 2d reference for canvas, standard is CTX.
  const ctx = context;
  let startTime : number; 
  let delay: number = 100; 
  let itemsToAnimate : Array<ItemToDraw>;
  let itemsToClear : Array<ItemToDraw>;
  let drawAnimationFrame  : number;



  function allItemsFinished(itemsToCheck : Array<ItemToDraw>){
    return itemsToCheck.every(obj => obj.isFinished)
  }

  // Each item drawn to scheme should follow a basic class.
  // this will be imported in future.
  class ItemToDraw {
    private width: number
    private height: number
    private position: [number, number]
    public color: string
    public state: string
    public isFinished: boolean = false
    private isClear:   boolean = false

    constructor(position:[number, number], width: number, height: number, color: string, isClear: boolean) {
      this.width    = width
      this.height   = height
      this.color    = color
      this.position = position
      this.state    = "Down"
      this.isClear  = isClear
    }

    getPositionX(){
      return this.position[0]
    }
    getPositionY(){
      return this.position[1]
    }
    getWidth(){
      return this.width
    }
    getHeight(){
      return this.height
    }
    setPositionX(newVal: number){
      this.position[0] = newVal
    }
    setPositionY(newVal: number){
      this.position[1] = newVal
    }
  }

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
  let animationFrame: number; // Use a single frame ID

  function mainFunction(timestamp: number) {
    // Check if all items are finished
    const animateDone = allItemsFinished(itemsToAnimate);
    const clearDone = allItemsFinished(itemsToClear);
  
    // If both animations and clearing are done, stop the animation loop
    if (animateDone && clearDone) {
      console.log("All animations and clearing complete.");
      cancelAnimationFrame(animationFrame);
      clearItems();
      const event = new Event("transitionComplete");
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
              itemsToAnimate[index].setPositionY( itemsToAnimate[index].getPositionY() + 20)
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


    // If the original items have finished their animation , we now need to clear the screen
    if(allItemsFinished(itemsToAnimate)){
      itemsToClear.forEach((item, index) => {
        if(item.isFinished){
          return;
        }
        let itemStartTime = startTime + index * delay; // Calculate the start time for this object
        if (currentTime >= itemStartTime) {
          if(item.state === "Down"){
            if(itemsToClear[index].getPositionY() < winHeight - item.getHeight() ) {
              itemsToClear[index].setPositionY( itemsToClear[index].getPositionY() + 60)
            }else{
              itemsToClear[index].isFinished = true
            }
          }
        }
      })
    }
  }

  function drawAnimation() {
    if(!allItemsFinished(itemsToAnimate)){
      itemsToAnimate.forEach((item, index) => {
          context.fillStyle = item.color;
          context.fillRect(item.getPositionX(), item.getPositionY(), item.getWidth(), item.getHeight());
      });
    }
    if(allItemsFinished(itemsToAnimate) && !allItemsFinished(itemsToClear)){
      itemsToClear.forEach((item, index) => {
        context.clearRect(item.getPositionX(), item.getPositionY(), item.getWidth(), item.getHeight());
      });
    }
  }


  // PROGRAM START'S HERE  
  // populate objects we want to animate
  function createItems() {
    clearItems(); // Clear the previous items
    startTime = performance.now(); // Reset start time
  
    // Repopulate and reset
    itemsToAnimate = populateAnimationItems(5, 0, false);
    itemsToClear = populateAnimationItems(5, 0, false);
  
    console.log("Initial positions for itemsToAnimate:");
    itemsToAnimate.forEach((item, index) => {
      console.log(`Item ${index} Position: (${item.getPositionX()}, ${item.getPositionY()})`);
    });
  
    drawAnimationFrame = requestAnimationFrame(mainFunction);
  }

  function clearItems(){
    itemsToAnimate = []
    itemsToClear   = []
  }


  // Fire off the animation!
  createItems();
}
