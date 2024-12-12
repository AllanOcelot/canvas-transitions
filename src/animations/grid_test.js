export function gridTest(context, elapsed, canvas) {
  const ctx = canvas.getContext('2d');

  let progress = 0;
  const animationSpeed = 1;

  // Initial setup: Paint the entire canvas black
  // ctx.fillStyle = '#000';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);

  // What is the shit we are trying to draw? 
  // lets define it so we KNOW about it
  class ItemToDraw  {
    constructor(name,position,color,height,width){
      this.name = name,
      this.position = position,
      this.color = color,
      this.height = height,
      this.width = width
    }
  }


  // we will add an amount of "items to draw"
  // to our list, offsetting them by X
  function populateArrayList(amount,offset){
    let localArray = []
    
    let itemHeight = 20;
    let itemWidth  = 20;

    let localItem  = new ItemToDraw("name", [itemHeight / 2, itemWidth / 2], "black", itemHeight, itemWidth)

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
      let radius = item.width + item.height;
      context.beginPath();
      context.arc(item.position[0], item.position[1], radius, 0, 2 * Math.PI, false);
      context.fillStyle = item.color;
      context.fill();


      console.log(shitToDraw)
      shitToDraw[index].position[0] += 5
      shitToDraw[index].position[1] += 5
      


    });

    // Increment progress
    progress += animationSpeed;

    // Continue the animation
    requestAnimationFrame(drawReveal);
  }

  // Start the animation
  drawReveal();
}
