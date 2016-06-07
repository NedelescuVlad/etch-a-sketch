$(document).ready(function() {

	drawGrid(16);

});

function drawGrid(n) {

	for (i = 0; i < n * n; i++) {
		$("body").prepend($("<div class='square'></div>"));
	}

	var squares = $("body").children("div");
	var square_width =  100/n + "%";
	var square_height = $(window).height() / n;

	squares.css({"width":square_width, "height":square_height});

	squares.on('mouseenter', function() {

		$(this).addClass('highlight');

	});
}