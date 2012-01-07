////
/// Image Blender - produces a linear gradient that works like an alpha channel 
/// and uses it to blend an image to an existing canvas element. 
//

	function pingPoint() { 
		document.getElementById("paper").addEventListener("mousedown",down, false); 
	} 

	function down(e) {  
                var canvas   = document.getElementById("paper");
                var ctx = canvas.getContext("2d");
		ctx.fillStyle = "orange";  
		ctx.fillRect(e.clientX-20, e.clientY-10, 20,20);  
	} 

	function loadImage(name) { 
		a = new Image();
		a.src=name; 
		a.onload = function callback() { 
			imgToCanvas(400, 400, a, 10, 100);

		} 

	} 
	function imgToCanvas(width, height, img, x, y) {
                var canvas   = document.getElementById("paper");
                var ctx = canvas.getContext("2d");
		ctx.drawImage(img, x,y);
                return canvas;
        }


	function canvasLinear(width, height) { 

		var canvas   = document.createElement("canvas");	
		var ctx = canvas.getContext("2d");
		canvas.style.width  = width +"px";
		canvas.style.height = height+"px";
		canvas.width = width;
		canvas.height = height;
		ctx.clearRect(0, 0, width, height);
		ctx.save();
		var lin = ctx.createLinearGradient(0,0,0,height);
		lin.addColorStop(1, '#fff');
		lin.addColorStop(0, '#fff');
		ctx.fillStyle = lin;
		ctx.fillRect (0, 0, width, height);
		ctx.restore();
		return canvas; 

 	} 

	function blendCanvas(x,y,canvasImage, canvasOutput, width, height) { 
				
		var horizAlpha  = canvasLinear(width,height); 
		var bitsToAlpha = horizAlpha.getContext("2d").getImageData(0,0,width,height);
		var bitsSource  = canvasImage.getContext("2d").getImageData(0,0,width,height);
		var ctxTarget   = canvasOutput.getContext("2d");
		var c=0;	
		for(var i=0;i<width;i++) { // square stupid 
			for(var j=0;j<height;j++) { // square stupid
			  	bitsSource.data[c+3]=bitsToAlpha.data[c+0];
				c+=4;
			} 
		} 
		canvasImage.getContext("2d").putImageData(bitsSource, 0,0);
		var b = new Image(); 
		b.src=canvasImage.toDataURL("image/png");
		b.onload = function () { 
			ctxTarget.drawImage(b,x,y);
			ctxTarget.save();	
		}
	} 


