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
// event for ending a transition
const eventEnd = new CustomEvent("endTransition", {
  detail: {
    transitionType: "example",
    transitionSpeed: 1
  }
});



document.addEventListener("startTransition", (event) => {
  const customEvent = event as CustomEvent<{ transitionType?: string; transitionSpeed?: number }>;
  //let eventType = customEvent.detail.transitionType;
  //let eventDuration = customEvent.detail.transitionSpeed;
  createTransition();
})

function createTransition(){
  createCanvas()
  const animation = example(context, winWidth, winHeight, 'fill')
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
    const animation = example(context, winWidth, winHeight, 'clear')
  }else {
    console.error('There is no canvas defined')
  }
}


export function triggerStartTransition(transitionType : string, transitionSpeed : number) {
  const event = new CustomEvent("startTransition", {
    detail: { transitionType, transitionSpeed }
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
document.addEventListener("transitionComplete", () => {
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



