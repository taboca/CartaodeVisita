
var dimen = [ { width:210*3, height: 297*3 } ];
var gCanvas = null; 


function renderRotation() { 

  rotate();
} 

      var r =0;
        function rotate() { 
                r++;
                document.getElementById("paper").setAttribute("style","-moz-transform: rotate("+r+"deg)");
                if(r<360) { 
                        setTimeout("rotate()",10);
                } else { r=0 }  
        }



function renderTheme () {
    var canvas = document.getElementById("paper");
    var ctx = canvas.getContext("2d");
    var b = new Image();
    b.src="./telasocial/bg.png";
    b.onload = function () {
          ctx.drawImage(b, 700, 300);
    initReflection();
    }
}
function renderPreview () {
    var canvas = document.getElementById("paper");
    var ctx = canvas.getContext("2d");
    var b = new Image();
    b.src=gCanvas.toDataURL("image/png");
    b.onload = function () {
          ctx.drawImage(b, parseInt(dimen[0].width/2)-160, 100);
    }
}

function init() { 

	var canvas = document.getElementById("paper");
	ctxPaper = canvas.getContext("2d");
        buffer_create();
	drawBackground();
	generate();
	
//	Pointer.editorInit( canvas, document, "ref1" );

        if(!gCanvas) {
           gCanvas = document.getElementById("canvaslocal"); 
        }
        //initCanvas(320,240);
} 


// These are the translation point
var tX = 0; 
var tY = 0;

var state_draw_title = false;

var pageWidth = 1050; 
var pageHeight = 600; 

var ctxBuffer = null; 
var ctxPaper = null; 

function buffer_create() { 
 	var a = document.createElement("canvas");
        document.body.appendChild(a);
	a.setAttribute("width",pageWidth);
	a.setAttribute("height",pageHeight);
	a.setAttribute("style","width:1px;height:1px");
	a.setAttribute("id","buffer");
	ctxBuffer = a.getContext("2d");
} 

function buffer_save() { 
	ctxBuffer.drawImage(document.getElementById('paper'),0,0);	
} 

function buffer_load() { 
	ctxPaper.drawImage(document.getElementById('buffer'),0,0);	
} 


function drawBackground() { 
	ctxPaper.fillStyle = "rgba(255, 255, 255, 1)";
	ctxPaper.fillRect (0, 0, pageWidth, pageHeight);
} 

function generate() { 
	tX = 40; 
	tY = 550;
	//draw_title(); 
	draw_desc();
} 

function draw_title() { 
		var elm = document.getElementById("texttop").value;
		var canvas = document.getElementById("paper");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		ctx.font = "40px " + nameFont; 
		//var ww = ctx.mozMeasureText(elm);
		//ctx.fillText(elm, parseInt(dimen[0].width/2)-parseInt(ww/2),60);
 		ctx.save();
		ctx.translate(tX, tY);
		ctx.fillText(elm, 0,0);
		ctx.restore();

} 

function draw_desc() {

		drawBackground();
                var elm = document.getElementById("desc").value;
                var canvas = document.getElementById("paper");
                var ctx = canvas.getContext("2d");

		var lines = elm.split("\n");
		var yy = tY - (lines.length)*40;

		var elm = document.getElementById("texttop").value;
		ctx.fillStyle = "rgba(0, 0, 0, 1)";
		ctx.font = "40px " + nameFont; 
		//var ww = ctx.mozMeasureText(elm);
		//ctx.fillText(elm, parseInt(dimen[0].width/2)-parseInt(ww/2),60);
 		ctx.save();
		ctx.translate(tX, yy);
		ctx.fillText(elm, 0,0);
		ctx.restore();

		ctx.fillStyle = "rgba(0, 0, 0, 1)";
                ctx.font = "22px " + nameFont;

		for(var i=0;i<lines.length;i++) { 
                     ctx.fillText(lines[i], tX, yy+=40);
		} 

		initReflection();
}


function draw() { 
	var canvas = document.getElementById("paper");
	var ctx = canvas.getContext("2d");
	var ww = dimen[0].width;
	var hh = dimen[0].height;
	canvas.setAttribute("width",ww);
	canvas.setAttribute("height",hh);
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fillRect (0, 0, ww , hh);
	ctx.fillStyle = "rgba(255,255,255, 1)";
	ctx.fillRect (2, 2, ww-4 , hh-4);
	var stripY = 600;
	ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
	ctx.fillRect (0, stripY, ww , 5);
	var stripX = 0; 
	stripX += 10; // margin left 
	var stripLines = 10; 
	var stripWidth = ww/stripLines;
	ctx.translate(1,1);
	ctx.save();
	for ( var i = 0 ; i<= stripLines; i++) { 
                ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
                ctx.fillRect (stripX, stripY, stripWidth-10 , hh-stripY);
                ctx.fillStyle = "rgba(255,255,255, 1)";
                ctx.fillRect (stripX, stripY, stripWidth-15 , hh-stripY);
		stripX+= stripWidth;
	} 

	ctx.rotate( 90* Math.PI/180 );  
	ctx.translate(520,0);
	ctx.fillStyle = "black";
	var elm = document.getElementById("title").value;
	var ww = ctx.mozMeasureText(elm);
	var textWidth  = ((hh-stripY)*7 ) /ww ;
	ctx.font = textWidth + "px Verdana"; 
	for(var i=0;i<=stripLines;i++) { 
		ctx.translate(0,-1*stripWidth);
		ctx.fillText(elm,100,100);
	} 
	ctx.restore();
} 

