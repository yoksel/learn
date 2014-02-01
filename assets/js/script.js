// Common
//----------------------------------------

function makeMap( class_name ) {
	var list = class_name.split(" ");
	var map = {};

	for (var i = 0; i < list.length; i++) {
		map[list[i]] = list[i];
	}
	return map;
}

// because classList.add doesn't work in ie9a and older
function addClass( elem, class_name ) {

	if ( !elem.className ){
		elem.className = class_name;
		return;
	}

	var map = makeMap( elem.className );
	if ( !map[class_name] ){
		elem.className += " " + class_name;
	}
}

function removeClass( elem, class_name ) {
	var new_class_name = "";
	
	if ( !elem.className ){
		return;
	}

	var map = makeMap( elem.className );
	var list = elem.className.split(" ");

	if ( map[class_name] ){
		var added_counter = 0;
		for (var item in map ) {
			if ( item != class_name ){
				new_class_name += item;
				if ( list.length > 2 && added_counter < list.length - 2 ){
					new_class_name += " ";
					}
				added_counter++;
			}	
			
		}
	}
	elem.className = new_class_name;
	
}

function containsClass( elem, class_name ) {

	if ( !elem.className ){
		return false;
	}

	var map = makeMap( elem.className );
	if ( map[class_name] ){
		return true;
	}
	return false;
}

function toggleClass( elem, class_name ){
	
	if ( containsClass ( elem, class_name )){
		removeClass( elem, class_name );
		}
	else {
		addClass( elem, class_name );	
	}
}

// Progress
//----------------------------------------

var interval = setInterval(showProgress,50);	

var progress_min = 0;
var progress_max = 100;
var progress_steps = 0;
var progress_elem = document.querySelector(".progress");
var progress_state = progress_elem.querySelector(".progress__state");

var percents_box = document.createElement("span");
var percents_box_class = "progress__percents";

addClass( percents_box, percents_box_class );

var percents_box_state = percents_box.cloneNode();

progress_elem.insertBefore(percents_box, null);
progress_state.insertBefore(percents_box_state, null);

var percents_boxes_list = progress_elem.querySelectorAll("." + percents_box_class);

function showProgress() {
	if ( progress_steps < progress_max ) {
		progress_steps++;
		}
	else {
		progress_steps = 0;
		}	
	var percents = progress_steps + "%"
	progress_state.style.width = percents;

	for ( var i = 0; i < percents_boxes_list.length; i++ ){
		percents_boxes_list[i].innerHTML = percents;
	}

}

// Rating
//----------------------------------------

var ratings = document.querySelectorAll(".rating");
var item_class = "rating__item";
var item_active_class = "rating__item--active";
var item_hover_class = "rating__item--hover";

function resetClass( parent_elem, class_name ) {
	var items = parent_elem.querySelectorAll("." + class_name);
	for (var i = 0; i < items.length; i++) {
		
		removeClass( items[i], class_name );
	}
}

function setActiveClass( parent_elem, class_name ) {
	var items = parent_elem.querySelectorAll("." + item_class);
	for (var i = 0; i < items.length; i++) {
		if ( containsClass( items[i], class_name ) ){
			return;
		}
		addClass( items[i], class_name );
	}
}

for (var i = 0; i < ratings.length; i++) {
	var rating_item = ratings[i];
	rating_handler ( rating_item );
};

function rating_handler ( rating ){
	var rating_radio_list = rating.querySelectorAll(".rating__radio");
	var init_checked_pos = 3;
	var items = rating.querySelectorAll(".rating__label");
	var init_checked = items[2];
	
	for ( var i = 0; i < rating_radio_list.length; i++ ){
		var item_radio = rating_radio_list[i];
	  
		item_radio.parentNode.onmouseover = function(){
			console.log("over");
			resetClass( rating, item_active_class );
			addClass( this, item_hover_class );
			setActiveClass( rating, item_hover_class );
		}

		item_radio.parentNode.onmouseout = function(){
			console.log("out");
			var checked = rating.querySelector(":checked");

			console.log( checked );
			resetClass( rating, item_hover_class );
			if ( checked ){
				console.log( "checked = true" );
				addClass( checked.parentNode, item_active_class );
				setActiveClass( rating, item_active_class );
			}
		}			

		item_radio.onclick = function(){
			var parent = this.parentNode;

			resetClass( rating, item_active_class );
			addClass( parent, item_active_class );
			setActiveClass( rating, item_active_class );
		}
	}

	// inititial state
	addClass( init_checked.parentNode, item_active_class );
	setActiveClass( rating, item_active_class );
}



// Button
//----------------------------------------

var buttons = document.querySelectorAll(".button");
var button_pressed_class = "button--pressed";

for (var i = 0; i < buttons.length; i++) {
	
	buttons[i].onclick = function () {
		toggleClass ( this, button_pressed_class );
	}
}

// Browsers
//----------------------------------------

function coloring_chrome ( text ) {
	var out = "";
	var colors_classes = [ "text--green", "text--red", "text--gold" ];
	var text_arr = text.split("");
	
	for ( var i = 0; i < colors_classes.length; i++ ) {
		var letters = text_arr.splice(0, 2).join("");
		out += "<span class='" + colors_classes[i] + "'>" + letters + "</span>"; 
	}

	return out;
}

var images = document.querySelectorAll(".browsers__img");

for ( var i = 0; i < images.length; i++ ) {
	var image_elem = images[i];
	var image_url = image_elem.getAttribute("src");
	var image = new Image();
	image.src = image_url;
	
	if ( image.width == 0 && image.height == 0 ){
		var image_alt = image_elem.getAttribute("alt");
		var placeholder = document.createElement("div");
		if ( image_alt == "Chrome" ) {
			image_alt = coloring_chrome ( image_alt );
			}
		placeholder.innerHTML = image_alt
		placeholder.setAttribute("class", "placeholder");

		image_elem.parentNode.replaceChild(placeholder, image_elem);
	}
}

