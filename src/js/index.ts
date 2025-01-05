//import { ScreenTransition } from './ScreenTransition.js';

// Import animations here
import { example } from '../animations/example';


let canvas : HTMLCanvasElement;
let context;

let winWidth  = window.innerWidth
let winHeight = window.innerHeight

// handle event listener here
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

document.addEventListener("transitionComplete", () => {
  console.log("Animation is complete!")
  removeCanvas()
});


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

createTransition()