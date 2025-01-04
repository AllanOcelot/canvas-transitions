//import { ScreenTransition } from './ScreenTransition.js';

// Import animations here
import { example } from '../animations/example';


const canvas : any = document.getElementById('transitionCanvas');
const context = canvas.getContext('2d');

let winWidth  = window.innerWidth
let winHeight = window.innerHeight

// handle event listener here
window.addEventListener('resize', () => resizeCanvas());
function resizeCanvas() {
  winWidth       = window.innerWidth
  winHeight      = window.innerHeight
  canvas.width   = winWidth
  canvas.height  = winHeight
  canvas.width   = window.innerWidth
  canvas.height  = window.innerHeight
}


// Trigger the animation
resizeCanvas()
window.setTimeout(
  function(){
    console.log("Start");
    const animation = example(context, winWidth, winHeight)
},2000)

