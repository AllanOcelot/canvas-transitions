export class ScreenTransition {
  constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.context = this.canvas.getContext('2d');
      this.resizeCanvas();
      window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
  }

  /// yeeeaaahhh I don't like this.
  startAnimation(animationFunction, callback) {
      const startTime = performance.now();
      const renderFrame = (currentTime) => {
          const elapsed = currentTime - startTime;
          const isComplete = animationFunction(this.context, elapsed, this.canvas);

          if (isComplete) {
              callback?.();
          } else {
              requestAnimationFrame(renderFrame);
          }
      };
      requestAnimationFrame(renderFrame);
  }
}
