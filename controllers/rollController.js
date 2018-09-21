const roller = require('../app/roller');
const stats = require('../app/stats');

var pb = JSON.stringify(roller.pBCost, null, 2);

var getHome = function (req, res) {
    res.render('home.hbs', {
        pbCostList: roller.pBCost
    });
}

var getRoll = function (req, res) {
    var result = [];
    var repeat = req.body.repeat;
    var minpb = req.body.minpb == 0 ? null : req.body.minpb;
    var maxpb = req.body.maxpb == 99 ? null : req.body.maxpb;
    var minattr = req.body.minattr == 0 ? null : parseInt(req.body.minattr);
    var maxattr = req.body.maxattr == 99 ? null : parseInt(req.body.maxattr);

    for (let index = 0; index < req.body.repeat; index++) {
        result.push(roller.getAttributes(minpb, maxpb, minattr, maxattr));
    }

    var stat = stats.getStats(result);
    var prepop = {
        minpb, maxpb, minattr, maxattr
    }

    res.render('home.hbs', {
        repeat,
        prepop,
        result,
        pbCostList: roller.pBCost,
        stats: [stat]
    });
};

module.exports = {
    getRoll,
    getHome
} 