// Import animations here
import { squares } from '../animations/squares';


let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

let winWidth  = window.innerWidth
let winHeight = window.innerHeight



const transitions = {
  squares: squares,
}




// Events
window.addEventListener('resize', () => resizeCanvas());
function resizeCanvas() {
  if(canvas){
    winWidth       = window.innerWidth
    winHeight      = window.innerHeight
    canvas.width   = winWidth
    canvas.height  = winHeight
    canvas.width   = window.innerWidth
    canvas.height  = window.innerHeight
  }
}

// Event for calling a transition
const event = new CustomEvent("startTransition", {
  detail: {
    transitionName: 'Squares',
    amount: null,
    offset: null,
    direction: 'down',
    transitionSpeed: 1,
  }
});
// event for ending a transition
const eventEnd = new CustomEvent("endTransition", {
  detail: {
    transitionType: "example",
    transitionSpeed: 1
  }
});



document.addEventListener("startTransition", (event) => {
  const customEvent = event as CustomEvent<{
    transitionName?: string;
    transitionAmount?: number;
    transitionOffset?: number;
    transitionDirection?: string;
  }>;

  const { transitionName, transitionAmount, transitionOffset, transitionDirection } = customEvent.detail;

  if (transitionName) {
    createTransition(transitionName, transitionAmount ?? 0, transitionOffset ?? 0, transitionDirection ?? "down", 10);
  }
});



// Function to create all animations
function createTransition(
  transitionName: string,
  amount: number,
  offset: number,
  direction: string,
  animationSpeed: number,
){
  createCanvas();
  if (transitionName === 'squares' && context) {
    squares(context, winWidth, winHeight, "fill", amount, offset, direction,animationSpeed);
  }
}



// we want the user to be able to clear the canvas when they want - for example, when their new page finishes loading
document.addEventListener("clearTransition", (event) => {
  const customEvent = eventEnd as CustomEvent<{ transitionType?: string; transitionSpeed?: number }>;
  //let eventType = customEvent.detail.transitionType;
  //let eventDuration = customEvent.detail.transitionSpeed;
  clearTransition();
})

function clearTransition(){
  if(canvas){
    const animation = squares(context!, winWidth, winHeight, 'clear', 5, 0, 'right', 20)
  }else {
    console.error('There is no canvas defined')
  }
}


export function triggerStartTransition(transitionName : string, transitionAmount: number, transitionOffset: number, transitionDirection: string) {
  const event = new CustomEvent("startTransition", {
    detail: { transitionName, transitionAmount, transitionOffset, transitionDirection }
  });
  document.dispatchEvent(event);
}

export function triggerClearTransition(transitionType : string, transitionSpeed : number) {
  const event = new CustomEvent("clearTransition", {
    detail: { transitionType, transitionSpeed }
  });
  document.dispatchEvent(event);
}


(window as any).triggerStartTransition = triggerStartTransition;
(window as any).triggerClearTransition = triggerClearTransition;




export default{};





// Animation complete.
document.addEventListener("clearComplete", () => {
  console.log('removing canvas')
  removeCanvas()
})

document.addEventListener("fillComplete", () => {
  console.log('CanvasTransition : Fill has completed')
})


// Trigger the animation
function createCanvas(){
  if(!canvas){
    console.log('adding canvas')
    canvas = document.createElement('canvas')
    canvas.classList.add('ct')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    context  = canvas.getContext('2d')!

    // Apply the  CSS styles
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '500';
    canvas.style.pointerEvents = 'none';

    document.body.appendChild(canvas)
  }
}

function removeCanvas(){
  if(canvas){
    console.log('removing canvas')
    canvas.remove();
    canvas = null;
    context = null;
  }
}



