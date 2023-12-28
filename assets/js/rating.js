function addStarRating(stars) {
	for (let i = 1; i <= 5; i++) {
		document.getElementById("star" + i).classList.remove("checked");
	}
	document.getElementById("star-rating").value = stars;
	for (let i = 1; i <= stars; i++) {
		document.getElementById("star" + i).classList.add("checked");
	}
}

var starWidth = 40;

$.fn.stars = function() {
  return $(this).each(function() {
    $(this).html($('<span />').width(Math.max(0, (Math.min(5, parseFloat($(this).html())))) * starWidth));
  });
}
$(document).ready(function() {
  $('span.stars').stars();
});