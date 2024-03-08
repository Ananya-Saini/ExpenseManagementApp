// import {nanoid} from 'nanoid';
const mongoose = require("mongoose");
// const nanoid = require('nanoid');

// Design user schema
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    // default: nanoid(7),
  },
  // uniqueId: {
  //   type: String,
  //   required: true,
  //   default: async () => (await import('nanoid')).nanoid(7),
  //   index: { unique: true },
  // },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required and should be unique"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  }, 
},
{timestamps: true}
);

// userSchema.pre('save', async function (next) {
//   if (!this.isNew) {
//     return next();
//   }
//   this._id = async () => (await import('nanoid')).nanoid(7);
//   next();
// });

// Generate a unique auto-incrementing user ID before saving
// userSchema.pre("save", async function (next) {
//   if (!this.isNew) {
//     return next(); // Skip for existing user updates
//   }

//   console.log("Generated userId:", this.userId); // Add a console log
//   next();

//   const lastUser = await this.constructor.findOne().sort({ userId: -1 }); // Get last user
//   let newId = 1;
//   if (lastUser) {
//     const userIdParts = lastUser.userId.split("-"); // Extract numeric part from existing ID
//     newId = parseInt(userIdParts[1]) + 1; // Increment the numeric part
//   }
//   this.userId = `USR-${newId}`; // Format the generated ID (e.g., USR-1, USR-2, ...)
//   next();
// });
// userSchema.pre("save", async function (next) {
//     if (!this.isNew) {
//       return next(); // Skip for existing user updates
//     }
  
//     console.log("Generated userId:", this.userId); // Add a console log
  
//     const lastUser = await this.constructor.findOne().sort({ userId: -1 }); // Get last user
//     let newId = 1;
//     if (lastUser) {
//       const userIdParts = lastUser.userId.split("-");
//       newId = parseInt(userIdParts[1]) + 1;
//     }
//     this.userId = `USR-${newId}`;
  
//     next(); // Call next only once after setting userId
//   });
  
// Export the model
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
