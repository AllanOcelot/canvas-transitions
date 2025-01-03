import { ScreenTransition } from './ScreenTransition.js';

// Import animations here
import { example }      from '../animations/example.ts';

// HTML: id="transitionCanvas"
const transition = new ScreenTransition('transitionCanvas');

// Trigger the animation
window.setTimeout(
  function(){
    console.log("Fire transition");
    transition.startAnimation(example, () => {
      console.log('Animation complete, user callback triggered.');
    });
},2000)

