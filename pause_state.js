var pause_state = function (p, prev_state) {

    // object to return
    var obj = game_state(p);
	obj.set_previous_state(prev_state);

    // --- private variables ---
	
	// Buttons
	// Have a rectangle representing their position and
	// a state to go to when pressed
    var button_x = p.width / 2;
    var button_top = 200;
    var button_sep = 50;
	
	var continue_button = button(p, {
		state : function() { return prev_state; },
		rect : {
			pos : new p.PVector(button_x, button_top),
			text: "Continue"
		}
	});

	var options_button = button(p, {
		state : function() { return options_state(p, obj); },
		rect : {
			pos : new p.PVector(button_x, button_top+button_sep),
			text: "Settings"
		}
	});

	var help_button = button(p, {
		state : function() { return help_state(p, obj); },	
		rect : {
			pos : new p.PVector(button_x, button_top+2*button_sep),
			text: "Instructions"
		}
	});
    
	var quit_button = button(p, {
		state : function() { return splash_state(p); },	
		rect : {
			pos : new p.PVector(button_x, button_top+3*button_sep),
			text: "Quit"
		}
	});
	
	//Not ordered
	var all_buttons = [ continue_button, options_button, help_button, quit_button ];

    // --- public methods ---
    
    obj.get_type = function() {
        return "pause";
    };

    obj.update = function() {
		//do nothing
    };

    obj.render = function() {
        p.noStroke();
        p.fill(0, 150);
        p.rectMode(p.CORNER);
        p.rect(0, 0, p.width, p.height);

        p.fill(255);
        p.textSize(40);
        p.textAlign(p.CENTER);
        p.text("Game Paused", p.width/2, 150);
    };

	obj.key_pressed = function(k) {
		if (k === 112 || p.keyCode == 13) { //p, enter
			obj.exit_state();;
		}
	};
	
	obj.get_all_buttons = function() {
		return all_buttons;
	};
	
    return obj;
};
