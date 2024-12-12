import { ScreenTransition } from './ScreenTransition.js';
import { fadeToBlack } from '../animations/fadeToBlack.js';

// HTML: <canvas id="transitionCanvas" style="position:fixed; top:0; left:0; z-index:9999;"></canvas>
const transition = new ScreenTransition('transitionCanvas');

// Trigger the animation
transition.startAnimation(fadeToBlack, () => {
    console.log('Animation complete, user callback triggered.');
});
