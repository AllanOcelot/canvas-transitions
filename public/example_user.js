// this is how a user would call our events

const page1button = document.getElementById('button1')
const page2button = document.getElementById('button2')

page1button.addEventListener('click',function(){
  triggerStartTransition("squares", 5, 0, "down");
})

// When any transition is completed
document.addEventListener('fillComplete',function(){
  window.setTimeout(function(){
    triggerClearTransition("example", 50);
  },1000)
  console.log('its done dude')
})

page2button.addEventListener('click',function(){
  triggerClearTransition("example", 50);
})


