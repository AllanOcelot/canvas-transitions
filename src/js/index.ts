//import { ScreenTransition } from './ScreenTransition.js';

// Import animations here
import { example } from '../animations/example';


let canvas : HTMLCanvasElement;
let context : CanvasRenderingContext2D;

let winWidth  = window.innerWidth
let winHeight = window.innerHeight

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
    transitionType: "example",
    transitionSpeed: 1
  }
});



document.addEventListener("startTransition", (event) => {
  const customEvent = event as CustomEvent<{ transitionType?: string; transitionSpeed?: number }>;
  let eventType = customEvent.detail.transitionType;
  let eventDuration = customEvent.detail.transitionSpeed;
  createTransition();
})

export function triggerStartTransition(transitionType : string, transitionSpeed : number) {
  const event = new CustomEvent("startTransition", {
    detail: { transitionType, transitionSpeed }
  });
  document.dispatchEvent(event);
}
(window as any).triggerStartTransition = triggerStartTransition;

export default{};





// Animation complete.
document.addEventListener("transitionComplete", () => {
  console.log('removing canvas')
  removeCanvas()
})


// Trigger the animation
function createCanvas(){
  console.log(canvas)
  if(!canvas){
    console.log('adding canvas')
    canvas = document.createElement('canvas')
    canvas.classList.add('ct')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    context  = canvas.getContext('2d')!
    document.body.appendChild(canvas)
  }
}

function removeCanvas(){
  if(canvas){
    console.log('removing canvas')
    canvas.remove()
    canvas = null;
  }
}


function createTransition(){
  createCanvas()
  const animation = example(context, winWidth, winHeight)
}
