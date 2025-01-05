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


  console.log(eventType)
  console.log(eventDuration)

  createTransition();
})

export function triggerStartTransition(transitionType : string, transitionSpeed : number) {
  console.log('trigger transition')
  const event = new CustomEvent("startTransition", {
    detail: { transitionType, transitionSpeed }
  });
  document.dispatchEvent(event);
}
(window as any).triggerStartTransition = triggerStartTransition;

export default{};





document.addEventListener("transitionComplete", () => {
  console.log("Animation is complete!")
  removeCanvas()
})


// Trigger the animation
function createCanvas(){
  if(!canvas){
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
    canvas.remove()
  }
}


function createTransition(){
  createCanvas()
  const animation = example(context, winWidth, winHeight)
}
