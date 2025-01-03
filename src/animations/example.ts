export function example(context: CanvasRenderingContext2D, elapsed: number, canvas: object) {

  // Our 2d reference for canvas, standard is CTX.
  const ctx = context;

  // Progress is a value, from 0 - 100. 
  // At 100, the animation should be complete.
  // We want users to pass in a "time" for their transition, so we will have to do some math on incemennting this.
  let progress = 0;

  // unsure if needed.
  const animationSpeed = 1;

  // Each item drawn to scheme should follow a basic class.
  // this will be imported in future.
  class ItemToDraw {
    private width: number
    private height: number
    private position: [number, number]
    public color: string
    public state: string

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

  // we will add an amount of "items to draw"
  // to our list, offsetting them by X
  // The logic yes it's a pain to work with an array of items when you might be animation only ONE
  // BUT the pay off it's easier to work with multiple when you need to - and I'm making an assumption  we will need to more
  // than we wont.
  function populateArrayList(amount: number,offset: number){
    let localArray = []
    
    let itemHeight = 100;
    let itemWidth  = window.innerWidth / amount;

    let itemXPos = 0;

    for(let i = 0; i < amount; i++){
      if(i > 0){
        itemXPos += itemWidth
      }
      let localItem  = new ItemToDraw([itemXPos, 0], itemWidth, itemHeight, "black")
      localArray.push(localItem)
    }
    return localArray
  }




  // This is our main drawing function
  function mainFunction() {
    if (progress >= 30000) {
      return;
    }


    // Draw the results of the logic.
    drawAnimation();

    // Deal with our items and do logic on them.
    animationLogic();



    // Increment progress
    progress += animationSpeed;

    // Continue the animation
    requestAnimationFrame(mainFunction);
  }


  // maybe objects should have a "object instruction" function, that based upon state, does stuff?
  function objectInstruction(){
    // i.e 
    // if object is not at the bottom of the screen, go down
    // then, step 2 
  }


  // This will be called each animation frame, but should be kept seperate from the drawing.
  function animationLogic(){
    objectsArray.forEach((item, index) => {


      // brainstorm - how to give a set of "instructions" for "complex" animations
      // maybe we would have an array of directions
      // like ["down", "right", "up", "left"]
      // each state incrementing the "direction" array by one, therfore moving onto the next animation state.
      // we would then need to times the position by the arrayIndex(?) to simulate the square moving inwards?
      // but this feels iffy to me.




      if(item.state === "Up"){
        if(objectsArray[index].getPositionY() > item.getHeight() ) {
          objectsArray[index].setPositionY( objectsArray[index].getPositionY() - 10)
        }
      }
      if(item.state === "Down"){
        if(objectsArray[index].getPositionY() < window.innerHeight - item.getHeight() ) {
          objectsArray[index].setPositionY( objectsArray[index].getPositionY() + 10)
        }
      }

      if(item.state === "Left"){
        if(objectsArray[index].getPositionX() > item.getWidth() ) {
          objectsArray[index].setPositionX( objectsArray[index].getPositionX() - 10)
        }
      }
      if(item.state === "Right"){
        if(objectsArray[index].getPositionX() < window.innerWidth - item.getWidth() ) {
          objectsArray[index].setPositionX( objectsArray[index].getPositionX() + 10)
        }
      }
    });
  }

  function drawAnimation(){
    objectsArray.forEach((item, index) => {
      context.fillRect(item.getPositionX(), item.getPositionY(), item.getWidth(), item.getHeight())
      context.fillStyle = item.color;
      context.fill();
    });
  }


  // PROGRAM START'S HERE  
  // populate objects
  const objectsArray = populateArrayList(5,0);
  // start animation
  mainFunction();
}
