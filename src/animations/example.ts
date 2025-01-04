export function example(context: CanvasRenderingContext2D, winWidth: number, winHeight: number) {

  // Our 2d reference for canvas, standard is CTX.
  const ctx = context;

  // declare the start of the global animation 
  let startTime = performance.now(); // Record the animation start time
  let delay = 50; // Delay in milliseconds between each object's animation

  let mainAnimationFrame : number;

  // Progress is a value, from 0 - 100. 
  // At 100, the animation should be complete.
  // We want users to pass in a "time" for their transition, so we will have to do some math on incemennting this.
  let progress = 0;

  // unsure if needed.
  const animationSpeed = 1;


  function allItemsFinished(){
    return objectsArray.every(obj => obj.isFinished)
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

    constructor(position:[number, number], width: number, height: number, color: string) {
      this.width = width
      this.height = height
      this.color = color
      this.position = position
      this.state = "Down"
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
  function populateArrayList(amount: number, offset: number){
    let localArray = []
   
    let itemHeight = winHeight / amount;
    let itemWidth  = winWidth / amount;
    let itemXPos = 0;

    for(let i = 0; i < amount; i++){
      if(i > 0){
        itemXPos += itemWidth
      }
      let localItem  = new ItemToDraw([itemXPos, -itemHeight], itemWidth, itemHeight, "black")
      localArray.push(localItem)
    }
    return localArray
  }




  // This is our main drawing function
  function mainFunction(timestamp: number) {

    // Stop the animation when all items have animated.
    if (allItemsFinished() ) {
        console.log('Stopping animation frame...');
        cancelAnimationFrame(mainAnimationFrame); // Cancel the animation
        return;
    }

    // Draw and update logic
    drawAnimation();
    animationLogic();

    // Schedule the next frame
    mainAnimationFrame = requestAnimationFrame(mainFunction);
  }



  // OPERATIONS ON OBJECTS SHOULD BE ONLY DONE HERE
  // NOT IN THE DRAWER.
  // WHAT DOES THE DRAW-ER DO ALLAN!? IT DRAW(s)
  function animationLogic(){
    let currentTime = performance.now(); // Current time in the animation


    // loop over each item we want to animate
    // ensure that time has passed ( the delay we want )
    // then check if it's state is blah, and do blah.
    objectsArray.forEach((item, index) => {
      if(item.isFinished){
        return;
      }

      let itemStartTime = startTime + index * delay; // Calculate the start time for this object
  
      if (currentTime >= itemStartTime) {
        if(item.state === "Down"){
          if(objectsArray[index].getPositionY() < winHeight - item.getHeight() ) {
            objectsArray[index].setPositionY( objectsArray[index].getPositionY() + 60)
          }else{
            console.log("" + index + "is finished")
            objectsArray[index].isFinished = true
          }
        }
      }
    });
  }

  // We need to think about adding delays in for multiple objects
  // now, we can do a setTimeout, for each one, but we'd need to ensure we have a defined "finished"
  // state for each item, this brings us back to 
  // the whole discussion on "how do we give a list of commands to an object in an easy way, idiot"
  // so think about that Allan
  function drawAnimation() {
    objectsArray.forEach((item, index) => {
        context.fillStyle = item.color;
        context.fillRect(item.getPositionX(), item.getPositionY(), item.getWidth(), item.getHeight());
    });
  }


  // PROGRAM START'S HERE  
  // populate objects
  const objectsArray = populateArrayList(5,0);
  // start animation
  mainAnimationFrame = requestAnimationFrame(mainFunction);
}
