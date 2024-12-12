export function fadeToBlack(context, elapsed, canvas) {
  const duration = 1000; // 1 second
  const progress = Math.min(elapsed / duration, 1);

  // Clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw a black rectangle with opacity based on progress
  context.fillStyle = `rgba(0, 0, 0, ${progress})`;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Return true if the animation is complete
  return progress === 1;
}
