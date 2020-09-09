const { isNumeric } = require('./routes/util/helper');

const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    if (!isNumeric(numWeeks) || !isNumeric(weeklyRevenue) || (numWeeks * weeklyRevenue) < 1000000) {
        return res.status(400).send('Must be $1,000,000 idea');
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;