const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const limitSchema = new mongoose.Schema(
    {
        userid: {
            type: String,
            required: [true, "userid is required"],
        },
        category: {
            type: String,
            required: [true, "category is required"],
        },
        limit: {
            type: Number,
            required: [true, "limit is required"],
        },
    },
    { timestamps: true }
);

const limitModel = mongoose.model("Limits", limitSchema);
module.exports = limitModel;