// *** particle ***
// --- inherits from game_object
// spec:
//  game_object spec

var particle = function(p, spec) {

    // --- defaults ---

    spec.width = spec.width || 10;
    spec.height = spec.height || 10;

    // obj to return
    var obj = game_object(p, spec);

    obj.get_type = function() {
        return "particle";
    };

    // --- private variables ---

    var alive = true;
    var par_shape = p.loadShape("images/virusfinal.svg");
	//var mutation = spec.mutation;

    // --- public methods --- 

    // implementing game_object interface
    
    // update is default (move)

    // draw makes a small virus particle
    // (circle for now)
    obj.draw = function() {
        var pos = obj.get_pos();
        p.shapeMode(obj.get_mode());
		//var color = mutation.get_color();
        p.fill(obj.get_color());
        p.noStroke();
        //p.ellipse(pos.x, pos.y,
                //obj.get_width(), obj.get_height());
        p.shape(par_shape, pos.x, pos.y, 
                obj.get_width(), obj.get_height());
    };
	
    // is_dead just returns whether it isn't alive 
    obj.is_dead = function() {
        return !alive;
    };

    // which means we need a way to die
    obj.die = function() {
        alive = false;
    };

    // override for circular object
    obj.calc_radius = function() {
        return obj.get_width()/2;
    };
    obj.set_radius(obj.calc_radius());

    return obj;
}
