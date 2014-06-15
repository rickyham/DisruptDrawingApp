// Create and append DOM elements
var newCanvas = document.createElement('canvas'),
    clearAllContainer = document.createElement('div'),
    clearAllContainerText = document.createTextNode('Clear'),
    saveContainer = document.createElement('div'),
    saveContainerText = document.createTextNode('Save'),
    body = document.body;

// Canvas node
newCanvas.id = 'canvas';

// Clear node
clearAllContainer.id = 'clear-all';
clearAllContainer.appendChild(clearAllContainerText);

// Save node
saveContainer.id = 'save-image';
saveContainer.appendChild(saveContainerText);

// Append to page body
body.appendChild(newCanvas);
body.appendChild(clearAllContainer);
body.appendChild(saveContainer);

// Minipulate CREATED DOM elements
var canvas = document.getElementById('canvas'),
    clearAllButton = document.getElementById('clear-all'),
    saveButton = document.getElementById('save-image'),
    context = canvas.getContext('2d'),
    radius = 5,
    dragging = false;

var setLineWidth = function(){
    context.lineWidth = radius *2;
    setColor();
};

var setColor = function(){
    var color = "rgb(219, 68, 55)";
    context.fillStyle = color;
    context.strokeStyle = color;
};

// Set canvas width & height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set pen color
setColor();

window.onresize = function(){
    
    // Save current drawing
    var image = context.getImageData(0, 0, canvas.width, canvas.height);    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Put back drawing
    context.putImageData(image, 0, 0);
    
    // Reset path line thickness
    setLineWidth();
};

// Make stroke line same as radius
setLineWidth();

var putPoint = function(e){
    if(dragging){
        console.log(e);
        var startAngle = 0,
            endAngle = Math.PI * 2;
        
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.arc(e.clientX, e.clientY, radius, startAngle, endAngle);
        context.fill();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
    }
};

var engage = function(e){
    dragging = true;
    putPoint(e);
};

var disEngage = function(e){
    dragging = false;
    context.beginPath();
};

var clearCanvas = function(){
    canvas.width = canvas.width;
    
    // Reset path line thickness
    setLineWidth();
};

var saveImage = function(){
    var data = canvas.toDataURL();
    window.open(data, '_blank', 'location=0, menubar=0');
};

canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disEngage);

clearAllButton.addEventListener('click', clearCanvas);
saveButton.addEventListener('click', saveImage);