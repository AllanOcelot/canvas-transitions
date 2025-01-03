import { ScreenTransition } from './ScreenTransition.js';

// Import animations here
import { example }      from '../animations/example.ts';


// 
const canvas : any = document.getElementById('transitionCanvas');
const context = canvas.getContext('2d');


// HTML: id="transitionCanvas"
//const transition = new ScreenTransition('transitionCanvas');

// Trigger the animation
window.setTimeout(
  function(){
    console.log("Start");
    const animation = example(context, canvas)
},2000)

