console.log("Hello!");

var interval = setInterval(showProgress,50);	

var progress_min = 0;
var progress_max = 100;
var progress_steps = 0;
var progress_elem = document.querySelector(".progress");
var progress_state = progress_elem.querySelector(".progress__state");

var percents_box = document.createElement("span");
var percents_box_class = "progress__percents";
percents_box.classList.add(percents_box_class);

var percents_box_state = percents_box.cloneNode();

progress_elem.insertBefore(percents_box);
progress_state.insertBefore(percents_box_state);

var percents_boxes_list = progress_elem.querySelectorAll("." + percents_box_class);

// console.log (progress_state)
console.log (percents_boxes_list)

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
		percents_boxes_list[i].innerText = percents;
	}

}

var rating = document.querySelector(".rating");
var item_class = "rating__item";
var item_active_class = "rating__item--active";
var item_hover_class = "rating__item--hover";

function resetClass( parent_elem, class_name ) {
	var items = parent_elem.querySelectorAll("." + class_name);
	for (var i = 0; i < items.length; i++) {
		items[i].classList.remove(class_name);
	}
}

function setActiveClass( parent_elem, class_name ) {
	var items = parent_elem.querySelectorAll("." + item_class);
	for (var i = 0; i < items.length; i++) {
		if ( items[i].classList.contains(class_name) ){
			return;
		}
		items[i].classList.add(class_name);
	}
}

var rating_radio_list = rating.querySelectorAll(".rating__radio");

for ( var i = 0; i < rating_radio_list.length; i++ ){
  var item_radio = rating_radio_list[i];
  
  
	item_radio.parentNode.onmouseover = function(){
		resetClass( rating, item_active_class );
		this.classList.add( item_hover_class );
		setActiveClass( rating, item_hover_class );
	}

	item_radio.parentNode.onmouseout = function(){
		var checked = rating.querySelector(":checked");
		// console.log(checked);
		resetClass( rating, item_hover_class );
		if ( checked ){
			checked.parentNode.classList.add( item_active_class );
			setActiveClass( rating, item_active_class );
		}
	}			

	item_radio.onclick = function(){
		var parent = this.parentNode;

		resetClass( rating, item_active_class );
		parent.classList.add ( item_active_class );
		setActiveClass( rating, item_active_class );
	}
}