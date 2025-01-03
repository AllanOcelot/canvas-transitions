export function example(context: CanvasRenderingContext2D, elapsed: number, canvas: object) {

  // Our 2d reference for canvas, standard is CTX.
  const ctx = context;

  // declare the start of the global animation 
  let startTime = performance.now(); // Record the animation start time
  let delay = 500; // Delay in milliseconds between each object's animation

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

  // Populate items we want to animate.
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
    drawAnimation()

    // Deal with our items and do logic on them.
    animationLogic()



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


  // OPERATIONS ON OBJECTS SHOULD BE ONLY DONE HERE
  // NOT IN THE DRAWER.
  // WHAT DOES THE DRAW-ER DO ALLAN!? IT DRAW(s)
  function animationLogic(){
    let currentTime = performance.now(); // Current time in the animation


    objectsArray.forEach((item, index) => {
      let itemStartTime = startTime + index * delay; // Calculate the start time for this object
  
      if (currentTime >= itemStartTime) {
        if(item.state === "Down"){
          if(objectsArray[index].getPositionY() < window.innerHeight - item.getHeight() ) {
            objectsArray[index].setPositionY( objectsArray[index].getPositionY() + 10)
          }
        }
      }
    });


/*
    objectsArray.forEach((item, index) => {
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
    */
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
  mainFunction();
}
