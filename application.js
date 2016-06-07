$(document).ready(function() {

	drawGrid(16);

	$("button").click(function() {

		var response = prompt("What size should the grid be?");
		// substring the response in case the user typed e.g. 12x12 instead of 12
		drawGrid(response.substring(0, 3));

	});

});

function drawGrid(n) {

	$("body").children("div").remove();

	for (i = 0; i < n * n; i++) {
		var div = $("<div class='square' data-hovered='false'></div>")
		div.insertAfter($("button"));
	}

	var squares = $("body").children("div");

	// Handle the mouseenter event
	$(squares).on({
    mouseenter: function() {

    	// First time the div is hovered, set it's color to random
    	if($(this).data('hovered') === false) {

     		$(this).addClass('transition');
    		$(this).data('hovered', true);

     		$(this).css("background-color", getColor(null));
    		
    	} else 

    		var colorsOnly = getColorsOnly($(this).css("background-color"));

    		$(this).data("redInset", getInset(colorsOnly[0]));
    		$(this).data("greenInset", getInset(colorsOnly[1]));
    		$(this).data("blueInset", getInset(colorsOnly[2]));

    		console.log($(this).data("redInset"));
    		console.log($(this).data("greenInset"));
    		console.log($(this).data("blueInset"));

    		$(this).css("background-color", getColor($(this).css("background-color")));
    }
   });

	// Calculate the width and height for a square
	var square_width =  100 / n + "%";
	var square_height = (+$(window).height() - (+$("button").height())) / n;

	// Set that width and height
	squares.css({"width":square_width, "height":square_height});

}

// Returns a random rgb color
function getColor(prevColor) {

		var red;
  	var green;
  	var blue;

		if (prevColor == null) {

			red = getRandomColor() + ", ";
			green = getRandomColor() + ", ";
			blue = getRandomColor() + ")";
		
		} else {

			var colorsOnly = getColorsOnly(prevColor);

			var red_inset = +$(this).data('redInset');
			var green_inset = +$(this).data('greenInset');
			var blue_inset = +$(this).data('blueInset');


			red = colorsOnly[0] + red_inset ;
			green = colorsOnly[1] + green_inset;
			blue = colorsOnly[2] + blue_inset;

		}
    
   	var color = 'rgb(' + red + green + blue;

    return color;

}

function getColorsOnly(rgb) {
	return colorsOnly = rgb.substring(rgb.indexOf('(') + 1, rgb.lastIndexOf(')')).split(/,\s*/);
}

// Returns a random value between 0 - 255 representing a red / green / blue value for rgb
function getRandomColor() {
	return Math.floor(Math.random() * 256);
}

function getInset(color) {
	return Math.floor(color / 10);
}