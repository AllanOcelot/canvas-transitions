export class ScreenTransition {
  constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.context = this.canvas.getContext('2d');
      this.animationFrameId = null; // Track the animation frame ID
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
  }

  startAnimation(animationFunction, callback) {
      const startTime = performance.now();

      const renderFrame = (currentTime) => {
          const elapsed = currentTime - startTime;
          const isComplete = animationFunction(this.context, elapsed, this.canvas);

          if (isComplete) {
              this.stopAnimation(); // Ensure the animation is stopped
              if (callback) callback(); // Call the callback if provided
          } else {
              this.animationFrameId = requestAnimationFrame(renderFrame);
          }
      };

      this.stopAnimation(); // Stop any existing animation before starting a new one
      this.animationFrameId = requestAnimationFrame(renderFrame);
  }

  stopAnimation() {
      if (this.animationFrameId !== null) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
      }
  }
}