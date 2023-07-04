const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET);
}

const User = mongoose.model("User", UserSchema);
module.exports = { User };
 


