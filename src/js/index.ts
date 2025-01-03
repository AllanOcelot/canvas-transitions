import { ScreenTransition } from './ScreenTransition.js';

// Import animations here
import { example }      from '../animations/example.ts';


const canvas : any = document.getElementById('transitionCanvas');
const context = canvas.getContext('2d');
let winWidth  = window.innerWidth
let winHeight = window.innerHeight

// handle event listener here
window.addEventListener('resize', () => resizeCanvas());
function resizeCanvas() {
  winWidth  = window.innerWidth
  winHeight = window.innerHeight
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}




// HTML: id="transitionCanvas"
//const transition = new ScreenTransition('transitionCanvas');

// Trigger the animation
window.setTimeout(
  function(){
    console.log("Start");
    const animation = example(context, winHeight, winWidth)
},2000)

