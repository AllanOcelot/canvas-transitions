// this is how a user would call our events

const page1button = document.getElementById('button1')
const page2button = document.getElementById('button2')

page1button.addEventListener('click',function(){
  triggerStartTransition("example", 50);
})

page2button.addEventListener('click',function(){
  triggerStartTransition("example", 50);
})


