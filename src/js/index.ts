import {  createCanvas, removeCanvas, canvasGetContext, resizeCanvas } from '../util/helpers'

// Import animations here
import { squares } from '../animations/squares';



// our canvas element.
let canvas: HTMLCanvasElement | null;

let winWidth  = window.innerWidth
let winHeight = window.innerHeight



const transitions = {
  squares: squares,
}







// Event for calling a transition
/*
const event = new CustomEvent("createTransition", {
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
*/


export function triggerTransition(transitionName : string, transitionType: string, transitionAmount: number, transitionOffset: number, transitionDirection: string) {
  const event = new CustomEvent("startTransition", {
    detail: { transitionName, transitionType, transitionAmount, transitionOffset, transitionDirection }
  });
  document.dispatchEvent(event);
}


// Listen for our custom event, the user's will call.
document.addEventListener("startTransition", (event) => {
  const customEvent = event as CustomEvent<{
    transitionName?: string;
    transitionType:string;
    transitionAmount?: number;
    transitionOffset?: number;
    transitionDirection?: string;
  }>;

  const { transitionName, transitionType, transitionAmount, transitionOffset, transitionDirection } = customEvent.detail;

  if (transitionName) {
    createTransition(transitionName, transitionType ?? 'clear', transitionAmount ?? 0, transitionOffset ?? 0, transitionDirection ?? "down", 10);
  }
});

// Events
window.addEventListener('resize', function(){
  resizeCanvas(canvas)}
);



// Function to create all animations
function createTransition(
  transitionName: string,
  type: string,
  amount: number,
  offset: number,
  direction: string,
  animationSpeed: number,
){
  if(!canvas){
    canvas = createCanvas(canvas);
  }
  let context = canvasGetContext(canvas)

  if (transitionName === 'squares' && context) {
    squares(context, type, winWidth, winHeight, amount, offset, direction,animationSpeed);
  }
}









(window as any).triggerTransition = triggerTransition;

export default{};





// Animation complete.
document.addEventListener("clearComplete", () => {
  console.log('removing canvas')
  removeCanvas(canvas)
})

document.addEventListener("fillComplete", () => {
  console.log('CanvasTransition : Fill has completed')
})






