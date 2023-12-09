const userModel = require('../models/usermodel')

//login callback
const loginController = async (res, req) => {
    try {
        const { email, password } = req.body
        const user = awaituserModel.findOne({ email, password });
        if (!user) {
            res.status(404).send("User not Found");
        }
        res.status(200).json({
            success:true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

//register callback
const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).json({
            success:true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

module.exports = { loginController, registerController };