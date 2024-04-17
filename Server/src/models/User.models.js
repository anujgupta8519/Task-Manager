import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    mobileNumber: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        default: null

    },
    role: {
        type: String,
        enum: ["Developer", "Manager"],
        default: "Developer"
    },
    otp: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    }

}, {
    timestamps: true
})

userSchema.methods.genrateAccessToken = function () {

    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role

    }, process.env.ACCESS_TOKEN_SECREAT_KEY,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });
}

userSchema.methods.genrateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.REFRESS_TOKEN_SECREAT_KEY,
        { expiresIn: process.env.REFRESS_TOKEN_EXPIRE_TIME });

}

userSchema.methods.encryptPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.plugin(mongooseAggregatePaginate)


export const User = mongoose.model('User', userSchema);