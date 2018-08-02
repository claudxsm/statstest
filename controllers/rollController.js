const roller = require('../roller');

var rollStats = function (req, res) {
    var result = [];
    var minpb = req.body.minpb;
    var maxpb = req.body.maxpb;

    while (result.length < req.body.repeat ) {
        var roll = roller.getRollArray();
        var r = {
            roll,
            total: roller.getPBCost(roll)
        };
       if(minpb == 0 && maxpb == 99) {
        result.push(r);
       }
       else if (r.total != "N/A"){
       if(minpb == 0 && r.total < maxpb){
        result.push(r);
       }
       else if(maxpb == 99 && r.total >= minpb ){
        result.push(r);
       }
       else if (r.total >= minpb && r.total <= maxpb) {
            result.push(r);
       }
    }
    }

    res.render('home.hbs', {
        repeat: req.body.repeat,
        minpb,
        maxpb,
        result
    });
};

module.exports = {
    rollStats
}