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

	// Calculate the width and height for a square
	var square_width =  100 / n + "%";
	var square_height = (+$(window).height() - (+$("button").height())) / n;

	// Set that width and height
	squares.css({"width":square_width, "height":square_height});

	// Handle the mouseenter event
	$(squares).on({
    mouseenter: function() {

    	// First time the div is hovered
    	if($(this).data('hovered') === false) {

    		// add the transition class and mark the div as hovered
     		$(this).addClass('transition');
    		$(this).data('hovered', true);

    		// paint the div randomly and store that color
    		var firstColor = paintSquare($(this), null);

    		// get the red green blue values of the color and set the div's insets
    		// insets are used to calculate how much r / g / b to substract from a color upon reentering
    		var colorsOnly = getColorsOnly(firstColor);

    		$(this).data("redInset", getInset(colorsOnly[0]));
    		$(this).data("greenInset", getInset(colorsOnly[1]));
    		$(this).data("blueInset", getInset(colorsOnly[2]));
    		
    		// make the color darker if it was hovered before
    	} else 
    		paintSquare($(this), $(this).css("background-color"));

    }
   });

}

// Sets the background of a square based on its previous color and returns that color.
// If no previous color exists, a random new color is generated.
function paintSquare(square, prevColor) {

		var red;
  	var green;
  	var blue;

  	// no previous color, generate a random one
		if (prevColor == null) {

			red = getRandomColor() + ", ";
			green = getRandomColor() + ", ";
			blue = getRandomColor() + ")";
		
		// previous color exists, darken it using insets
		} else {

			var colorsOnly = getColorsOnly(prevColor);

			var red_inset = +square.data('redInset');
			var green_inset = +square.data('greenInset');
			var blue_inset = +square.data('blueInset');

			red = colorsOnly[0] - red_inset + ", " ;
			green = colorsOnly[1] - green_inset + ", ";
			blue = colorsOnly[2] - blue_inset + ")";

		}
    
		var color = "rgb(" + red + green + blue;

   	square.css("background-color", color);

    return color;

}

// Parse an rgb color and return an array of red green blue and opacity, in this order
function getColorsOnly(rgb) {
	return colorsOnly = rgb.substring(rgb.indexOf('(') + 1, rgb.lastIndexOf(')')).split(/,\s*/);
}

function getRandomColor() {
	return Math.floor(Math.random() * 256);
}

function getInset(color) {
	return Math.floor(color / 10);
}