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
		var square = new Object();
		square.div = $("<div class='square'></div>");
		square.color = "rgb(255, 255, 255)";
		square.wasHovered = false;
		square.div.insertAfter($("button"));
	}

	var squares = $("body").children("div");

	// Handle the mouseenter event
	$(squares).on({
    mouseenter: function() {

    	if(!$(this).hasClass('transition'))
     		$(this).addClass('transition');

      $(this).css("background-color", getRandomRGB);
    }
   });

	// Calculate the width and height for a square
	var square_width =  100 / n + "%";
	var square_height = (+$(window).height() - (+$("button").height())) / n;

	// Set that width and height
	squares.css({"width":square_width, "height":square_height});

}

// Returns a random rgb color
function getRandomRGB() {

    var red = getRandomColor() + ", ";
    var green = getRandomColor() + ", ";
    var blue = getRandomColor() + ")";

    var color = 'rgb(' + red + green + blue;
    
    return color;

}

// Returns a random value between 0 - 255 representing a red / green / blue value for rgb
function getRandomColor() {
	return Math.floor(Math.random() * 256);
}