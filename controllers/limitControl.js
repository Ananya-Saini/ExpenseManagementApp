const limitModel = require('../models/limitModel');

const addLimit = async (req, res) => {
    try {
        const payload = req.body.payload
        await limitModel.findOneAndUpdate({ userid: req.body.payload.userid, category: req.body.payload.category}, {userid: req.body.payload.userid, category: req.body.payload.category, limit: req.body.payload.amount}, {upsert: true, new: true});
        res.status(200).send("Limit Added Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    addLimit,
};