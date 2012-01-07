

var nameFont = "Arial";

	function change(index) { 
		setFont(document.getElementById("fontlist").options[index].value);
		
		
	} 
	function setFont(font) { 
		nameFont = font;
		    WebFont.load({
			  google: {
     		 	  families: [ font  ]
	  	    }});
	} 
	
