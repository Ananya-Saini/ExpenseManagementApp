const userModel = require('../models/usermodel')

//login callback
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
    //    const email = req.body.email;
    //    const password = req.body.password;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            res.status(404).send("User not Found");
        }
        else{
            res.status(200).json({
                success:true,
                user,
            });
        }
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
      const newUser = new userModel(req.body); // Use new userModel directly
      const result = await newUser.save();
      if (!result) {
        res.status(404).json({
          success: false,
          error,
        });
      } else {
        res.status(201).json({
          success: true,
          user: result,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        error,
      });
    }
  };
  
// const registerController = async (req, res) => {
//     try {
//         // const newUser = new userModel(req.body)
//         const email = req.body.email;
//         const name = req.body.name;
//         const password= req.body.password;
//         const user = new userModel({email, name, password});
//         const result = await user.save();
//         if(!result){
//             res.status(404).json({
//                 success:false,
//                 error,
//             });
//         }
//         else{
//             res.status(201).json({
//                 success:true,
//                 user,
//             });
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(400).json({
//             success: false,
//             error,
//         });
//     }
// };

module.exports = { loginController, registerController };