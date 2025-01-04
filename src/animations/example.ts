export function example(context: CanvasRenderingContext2D, winWidth: number, winHeight: number) {

  // Our 2d reference for canvas, standard is CTX.
  const ctx = context;

  // declare the start of the global animation 
  let startTime = performance.now(); // Record the animation start time
  let delay = 50; // Delay in milliseconds between each object's animation

  let drawAnimationFrame  : number;
  let clearAnimationFrame : number;

  // Progress is a value, from 0 - 100. 
  // At 100, the animation should be complete.
  // We want users to pass in a "time" for their transition, so we will have to do some math on incemennting this.
  let progress = 0;

  // unsure if needed.
  const animationSpeed = 1;


  function allItemsFinished(itemsToCheck){
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
  function populateAnimationItems(amount: number, offset: number, isClear: boolean){
    let localArray = []
    
    let itemHeight = winHeight / amount;
    let itemWidth  = winWidth / amount;
    let itemXPos = 0;

    for(let i = 0; i < amount; i++){
      if(i > 0){
        itemXPos += itemWidth
      }
      let localItem  = new ItemToDraw([itemXPos, -itemHeight], itemWidth, itemHeight, "black", isClear)
      localArray.push(localItem)
    }
    return localArray
  }




  // This is our main drawing function
  function mainFunction(timestamp: number) {
    if (allItemsFinished(itemsToAnimate)) {
        console.log('Stopping animation frame...');
        cancelAnimationFrame(drawAnimationFrame); // Cancel the animation
        console.log('starting clear frame req')
        clearAnimationFrame = requestAnimationFrame(mainFunction);
    }
    if(allItemsFinished(itemsToClear)){
      console.log('all clearing items complete')
      cancelAnimationFrame(clearAnimationFrame);
    }

    if(allItemsFinished(itemsToAnimate) && allItemsFinished(itemsToClear)){
      return;
    }


    // Draw and update logic
    drawAnimation();
    animationLogic();

    // Schedule the next frame
    drawAnimationFrame = requestAnimationFrame(mainFunction);
  }



  // OPERATIONS ON OBJECTS SHOULD BE ONLY DONE HERE
  // NOT IN THE DRAWER.
  // WHAT DOES THE DRAW-ER DO ALLAN!? IT DRAW(s)
  function animationLogic(){
    let currentTime = performance.now(); // Current time in the animation


    // loop over each item we want to animate
    // ensure that time has passed ( the delay we want )
    itemsToAnimate.forEach((item, index) => {
      if(item.isFinished){
        return;
      }

      let itemStartTime = startTime + index * delay; // Calculate the start time for this object
  
      if (currentTime >= itemStartTime) {
        if(item.state === "Down"){
          if(itemsToAnimate[index].getPositionY() < winHeight - item.getHeight() ) {
            itemsToAnimate[index].setPositionY( itemsToAnimate[index].getPositionY() + 60)
          }else{
            console.log("" + index + "is finished")
            itemsToAnimate[index].isFinished = true
          }
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
              console.log("" + index + "is finished")
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
    }else{
      itemsToClear.forEach((item, index) => {
        context.fillStyle = item.color;
        context.clearRect(item.getPositionX(), item.getPositionY(), item.getWidth(), item.getHeight());
      });
    }

  }


  // PROGRAM START'S HERE  
  // populate objects we want to animate
  const itemsToAnimate = populateAnimationItems(5,0,false)
  const itemsToClear   = populateAnimationItems(5,0,false)

  // start animation
  drawAnimationFrame = requestAnimationFrame(mainFunction);
}
