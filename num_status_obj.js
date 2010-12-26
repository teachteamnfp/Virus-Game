// Generic wrapper for a status that includes text and a num
// Can be drawn as a number or a bar
// Provides draw, incr, set_num, and get_num
// spec:
//		pos : center pos of text
//		text : Will display "<text> <num>"
//		num : num to start at
//		bar : bool (optional)

var num_status_obj = function(p, spec) {
	
    // obj to return
    var obj = {};

    // --- private variables ---

	var pos = spec.pos;
	var number = spec.num;
	var txt = spec.text;
	var bar = spec.bar || false;
	var height = 20;
	
	var get_obj_text = function() {
		if (bar) {
			return txt;
		}
		else {
			return txt + " " + number;
		}	
	}
	
	var rect = rectangle(p, { // Really just a text obj
		pos : pos,
		width : 0,
		height : 0,
		text : get_obj_text()
	})
	
	// --- private methods
	
	var update = function(n) {
		number = n;
		rect.update_text(get_obj_text());
	}
	
    // --- public methods --- 

	obj.draw = function() {
        rect.draw();
		// Draw the bar separately, if appropriate
		if (bar) {
	        p.fill(0);
	        p.noStroke();
			
			var topy = pos.y - (height / 2);
			var leftx = pos.x + (txt.length * 3);
			p.rect(leftx, topy, number, height);
			
			p.fill(255)
		}
	};
	
	obj.incr = function(n) {
		update(number + n);
	};
	
	// Set and get
	
	obj.set_num = function(n) {
		update(n);
	}
	
	obj.get_num = function(n) {
		return number;
	}
	
    return obj;
};
