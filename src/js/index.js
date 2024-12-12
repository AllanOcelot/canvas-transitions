import { ScreenTransition } from './ScreenTransition.js';

// Import animations here
import { fadeToBlack } from '../animations/fadeToBlack.js';
import { gridTest } from '../animations/grid_test.js';

// HTML: id="transitionCanvas"
const transition = new ScreenTransition('transitionCanvas');

// Trigger the animation
window.setTimeout(
  function(){
    console.log("Fire transition");
    transition.startAnimation(gridTest, () => {
      console.log('Animation complete, user callback triggered.');
    });
},2000)

