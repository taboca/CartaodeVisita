
var canvasReflection = null; 
var ctxReflection = null; 
var paper = null;  

function initReflection() { 

  canvasReflection = document.getElementById("reflection"); 
  paper = document.getElementById("paper");

  ctxReflection = canvasReflection.getContext("2d"); 
  canvasReflection.setAttribute('height', 600);
  canvasReflection.setAttribute('width', 1050);
  ctxReflection.translate(canvasReflection.width/2, canvasReflection.height/2);
  ctxReflection.scale(1, -1);
  ctxReflection.translate(-canvasReflection.width/2, -canvasReflection.height/2);

  var canvasReflection2 = document.getElementById('reflectionmask')
  canvasReflection2.setAttribute('height', 100);
  canvasReflection2.setAttribute('width', 1050);
  var ctxReflection2 = canvasReflection2.getContext('2d');
  var lingrad2 = ctxReflection.createLinearGradient(0,0,0,100);
  lingrad2.addColorStop(1, 'rgb(0,0,0)');
  lingrad2.addColorStop(0, 'rgba(0,0,0,0)');

  // assign gradients to fill and stroke styles
  ctxReflection2.fillStyle = lingrad2;
  ctxReflection2.fillRect(0,0,1050,300);

  drawReflection();
}

function drawReflection() { 
  ctxReflection.drawImage(paper, 0, 300, paper.width, paper.height-300, 0, 0, canvasReflection.width, 600);
} 


