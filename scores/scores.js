// async gets scores and feeds to callback
var get_scores = function(callback) {
    // ajax request to get scores
    $.post("get_scores.php", { num: 10 }, callback);
};

// interprets json and displays it
var display_scores = function(data) {
    $("#scores").empty();
    var scores = jQuery.parseJSON(data);
    //console.log(scores);
    // scores is an array of row objects
    for_each(
        scores,
        function(row) {
            // convert each row to an array for now
            var rowarr = [];
            for_each(keys(row), function(i) { rowarr.push(row[i]); });
            $("#scores").append("<div>"+rowarr.join(", ")+"</div>");
        }
    );
};

// gets and displays scores
var do_scores = function() {
    get_scores(display_scores);
};

// inserts a score into the db
// score_obj:
//  - score: int score
//  - level: mutation level
//  - userid: unique id for the user (from fb?)
var post_score = function(score_obj, callback) {
    $.post("post_score.php", score_obj, callback);
};

// testing function to use with form
var submit_score = function() {
    var form = document.forms[0];
    var score = form.elements[0].value; 
    var level = form.elements[1].value; 
    var userid = form.elements[2].value; 

    var score_obj = {
        score: parseInt(score),
        level: parseInt(level),
        userid: userid,
        date: new Date().f('yyyy-MM-dd')
    };
    console.log(score_obj);

    post_score(
        score_obj,
        function(data) {
            console.log(data);
            do_scores();
        }
    );
};
