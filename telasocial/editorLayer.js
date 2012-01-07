
var Pointer = {
  targetCanvas  : null, 

  ////
  /// Activate the editor mode
  //
  editorInit: function (canvas, doc, indexId) { 
	Pointer.editor.canvas = canvas; 
	Pointer.editor.doc    = doc; 
	Pointer.editor.refIndexId = indexId;

 	Pointer.editor.canvas.addEventListener("mousemove",Pointer.editorBoxCross, false);
 	Pointer.editor.canvas.addEventListener("mousedown",  Pointer.editorBoxOff, true);
// 	Pointer.editor.doc.addEventListener("mousedown",Pointer.editorBoxOn,    false);

	jQuery("body",Pointer.editor.doc).append("<div id='editorboxaxisx' style='border:1px dotted gray;position:absolute;width:1px;'></div>");
	jQuery("body",Pointer.editor.doc).append("<div id='editorboxaxisy' style='border:1px dotted gray;position:absolute;height:1px;;'></div>");
	Pointer.editor.axis_x = jQuery("#editorboxaxisx", Pointer.editor.doc);
	Pointer.editor.axis_y = jQuery("#editorboxaxisy", Pointer.editor.doc);

 	Pointer.editor.axis_y.css("top", Pointer.editor.y  +"px");
 	Pointer.editor.axis_x.css("left",Pointer.editor.x  +"px");

  }, 
  
  editorBoxCross: function(e) { 

	if(!Pointer.editor.on) { 
		try { 

		var st = Pointer.editor.doc.body.scrollTop; 
		var sl = Pointer.editor.doc.body.scrollLeft; 

		var leftCanvas = Pointer.editor.canvas.getBoundingClientRect().left + sl; 
		var topCanvas  = Pointer.editor.canvas.getBoundingClientRect().top  + st;

		var xx = (e.clientX+sl);
                var yy = (e.clientY+st);

		Pointer.editor.xx = (e.clientX+sl) - leftCanvas;
		Pointer.editor.yy = (e.clientY+st) - topCanvas;
		if(xx>leftCanvas && yy>topCanvas) { 

		 	Pointer.editor.axis_y.css("top",    yy + "px");
	 		Pointer.editor.axis_y.css("left",   leftCanvas + "px");
	 		//Pointer.editor.axis_y.css("width",  Pointer.editor.canvas.width   + "px");
	 		Pointer.editor.axis_y.css("width",  parseInt(Pointer.editor.canvas.style.width ) + "px");
 			Pointer.editor.axis_x.css("left",   xx + "px");
	 		Pointer.editor.axis_x.css("top",    topCanvas + "px");
	 		Pointer.editor.axis_x.css("height", parseInt(Pointer.editor.canvas.style.height)  + "px");
		}
	   	} catch(i) { 
         	} 

	} else { 

		var st = Pointer.editor.doc.body.scrollTop; 
		var sl = Pointer.editor.doc.body.scrollLeft; 
		var hh = (e.clientY+st)-Pointer.editor.y-10;
		var ww = (e.clientX+sl)-Pointer.editor.x-10;
 	 	Pointer.editor.ww = ww; 
  		Pointer.editor.hh = hh; 
		Pointer.editor.box.css("height",  hh +"px");
		Pointer.editor.box.css("width",   ww +"px");
	} 
  },

  editorBoxUpdate: function(e) { 
  },
  editorBoxOff: function(e) { 
	Pointer.editor.on = false;
	jQuery("#editorbox",      Pointer.editor.doc).remove();
	jQuery("#editorboxaxisx", Pointer.editor.doc).remove();
	jQuery("#editorboxaxisy", Pointer.editor.doc).remove();
 //	Pointer.editor.canvas.removeEventListener("mousedown", Pointer.editorBoxOn,      false);
 	Pointer.editor.canvas.removeEventListener("mousedown", Pointer.editorBoxOff,     false);
	// We were removing the editorBoxUpdate... before. why? 
	Pointer.editor.canvas.removeEventListener("mousemove", Pointer.editorBoxCross  , false);
        jQuery("#menu-focus",Pointer.editor.doc).attr("disabled",false);
        jQuery("#menu-focus",Pointer.editor.doc).html("Drag box");
	var sl = Pointer.editor.doc.body.scrollLeft;
        var st = Pointer.editor.doc.body.scrollTop;
        var leftCanvas = Pointer.editor.canvas.getBoundingClientRect().left + sl;
        var topCanvas  = Pointer.editor.canvas.getBoundingClientRect().top  + st;
        var xx = (e.clientX+sl);
        var yy = (e.clientY+st);
        if(xx>leftCanvas && yy>topCanvas) {
		Pointer.editorSnap();
	}
  }, 

  editorSnap: function () { 
	killPan();
	//var selectedItem = Pointer.service.tabs[Pointer.editor.refIndexId];
        //selectedItem.canvasFocused = Pointer.createPreviewRaw(selectedItem.tabReference, Pointer.editor.canvas, Pointer.editor.x, Pointer.editor.y, Pointer.editor.ww, Pointer.editor.hh);
		
  }  

};

Pointer.editor = { 
 	canvas: null, 
	refIndexId: -1, // id to the thumb
	doc: null,
        axis_x: null, 
        axis_y: null, 
  	box: null, 
	on: false,
	x:0, y:0,
	xx:0, yy:0,
	ww:0, hh:0
} 

