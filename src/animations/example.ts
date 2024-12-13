export function example(context: CanvasRenderingContext2D, elapsed: number, canvas: object) {
  interface context {

  }



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


    constructor(position:[number, number], width: number, height: number, color: string) {
      this.width = width;
      this.height = height;
      this.color = color;
      this.position = position;
    }

    getPositionX(){
      return this.position[0]
    }
    setPositionX(newVal: number){
      this.position[0] = newVal
    }
    getPositionY(){
      return this.position[1]
    }
    setPositionY(newVal: number){
      this.position[1] = newVal
    }

    getWidth(){
      return this.width
    }
    getHeight(){
      return this.height
    }
  }

  // we will add an amount of "items to draw"
  // to our list, offsetting them by X
  // The logic yes it's a pain to work with an array of items when you might be animation only ONE
  // BUT the pay off it's easier to work with multiple when you need to - and I'm making an assumption  we will need to more
  // than we wont.
  function populateArrayList(amount: number,offset: number){
    let localArray = []
    
    let itemHeight = 20;
    let itemWidth  = 20;

    let localItem  = new ItemToDraw([itemHeight / 2, itemWidth / 2], itemWidth, itemHeight, "black")

    localArray.push(localItem)
    return localArray
  }



  const shitToDraw = populateArrayList(1,0);


  // This is our main drawing function
  function drawReveal() {
    if (progress >= 30000) {
      // Stop the animation when progress is complete
      return;
    }


    // we will draw each item, and update it's position in relation to the animation
    // I know enough about "game design" to know this is NOT how we do it future me
    // this is just Proof of concept, CHILL OUT FUTURE ME.



    shitToDraw.forEach((item, index) => {
      let radius = item.getWidth() + item.getHeight();
      context.beginPath();
      context.arc(item.getPositionX(), item.getPositionY(), radius, 0, 2 * Math.PI, false);
      context.fillStyle = item.color;
      context.fill();

      console.log(shitToDraw)
      shitToDraw[index].setPositionX( shitToDraw[index].getPositionX() + 5)
      shitToDraw[index].setPositionY( shitToDraw[index].getPositionY() + 5)
    });

    // Increment progress
    progress += animationSpeed;

    // Continue the animation
    requestAnimationFrame(drawReveal);
  }

  // Start the animation
  drawReveal();
}
