
// this is how a user would call our events
const page1button = document.getElementById('button1')
//const page2button = document.getElementById('button2')

page1button.addEventListener('click',function(){
  triggerTransition("squares", "fill", 5, 0, "down");
})

// When any transition is completed we want to fire a clear, and then tell our library
document.addEventListener('fillComplete',function(){
  window.setTimeout(function(){
    triggerTransition("squares", "clear", 5, 0, "down");
  },1000)
  console.log('its done dude')
})



