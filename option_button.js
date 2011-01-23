// Have a rectangle representing their position and a state to go to when clicked
// spec:
//		rect 		: spec for a rectangle representing the button
//		click_fun 	: what to do when clicked
//		global_var 	: var that determines whether this option is enabled or not 

var option_button = function(p, spec) {
	
    // --- defaults ---
    spec.rect.width = spec.width || 250;
    spec.rect.height = spec.height || 80;

    // obj to return
    var obj = {};

    // --- private variables ---

	var rect = rectangle(p, spec.rect);
	// Left-edge x and top-edge y coordinates of 'checkbox' indicating whether
	// option is enabled
	var status_x = rect.get_left_x() + 50;
	var status_y = rect.get_top_y() + 40;

    // --- public methods --- 

	obj.draw = function() {
        rect.draw();
		if (g[spec.global_var]) {
			p.fill(255, 255, 255);
			p.ellipse(status_x, status_y, 10, 10);
		}
	};
	
	// Returns the state to go to if clicked, or
	// null if not clicked
	obj.click = function(x, y) {
		if (rect.is_in(x, y)) {
			spec.click_fun();
		}
		// Redraw in case anything changes
		obj.draw();
	};	
	
    return obj;
};
