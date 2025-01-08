


// Canvas creation
export function createCanvas(canvasImport : HTMLCanvasElement | null){

  let canvas: HTMLCanvasElement | null;

  if(!canvasImport){
    canvas = document.createElement('canvas')
    canvas.id = 'ct-canvas'
    canvas.classList.add('ct')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight


    // Apply the  CSS styles
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '500';
    canvas.style.pointerEvents = 'none';

    document.body.appendChild(canvas)
    return canvas;
  }
}

export function canvasGetContext(canvasImport : HTMLCanvasElement | null){
  console.log('hi')
  console.log(canvasImport)
  if(canvasImport){

    return canvasImport.getContext('2d')!
  }
}

// Canvas removal
export function removeCanvas(canvas : HTMLCanvasElement | null){
  console.log('remove')
  console.log(canvas)
  if(canvas){
    console.log('removing canvas')
    canvas.remove();
    canvas = null;
    //context = null;
  }
}

export function resizeCanvas(canvas : HTMLCanvasElement | null) {
  if(canvas){
    canvas.width   = window.innerWidth
    canvas.height  = window.innerHeight
    canvas.width   = window.innerWidth
    canvas.height  = window.innerHeight
  }
}