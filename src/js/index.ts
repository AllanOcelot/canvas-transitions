//import { ScreenTransition } from './ScreenTransition.js';

// Import animations here
import { example } from '../animations/example';


let canvas : HTMLCanvasElement;
let context;

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
  let eventType;
  let eventDuration;

  if(event.detail.transitionType){
    eventType = event.detail.transitionType
  }
  if(event.detail.transitionSpeed){
    eventDuration = event.detail.transitionSpeed
  }

  console.log(eventType)
  console.log(eventDuration)

  createTransition();
})

window.triggerStartTransition = function(transitionType : string, transitionSpeed : number) {
  console.log('trigger transition')
  const event = new CustomEvent("startTransition", {
    detail: { transitionType, transitionSpeed }
  });
  document.dispatchEvent(event);
}





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
    context  = canvas.getContext('2d')
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
