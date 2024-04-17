import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/User.models.js";
import { deleteUserMail, sendUserRegistrationUser } from "../utils/SendEmail.js";
import { Task } from "../models/Task.models.js";

const adminLoginController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        throw new ApiError(400, "username is required");
        
    }
    if (!password) {
        throw new ApiError(400, "password is required");
        
    }

    if (username !== process.env.ADMIN_NAME || password !== process.env.ADMIN_PASSWORD) {
        throw new ApiError(400, "Invalid username or password");
    }
    if (username === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD) {
         
        const token = jwt.sign({ username: process.env.ADMIN_NAME }, process.env.ADMIN_JWT, { expiresIn: '1d' });
        const options = {
            httpOnly: true,
            secure: true,
        }
        
        return res.status(200)
        .cookie("accessToken", token, options)
        .json(new ApiResponse(200, {
            AccessToken:token,
            UserType: "Admin"
        }, "Login successfull"));
    }

});

const adminLogoutController = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken")
    return res.status(200).json(new ApiResponse(200, {}, "Logout successfull"));

});

const registerUser = asyncHandler(async (req, res) => {
    const {name, email,role,mobileNumber} = req.body;

    if ([name, email,role, mobileNumber].some(field => field?.trim()==="" && !field)) {
        throw new ApiError(400, "All fields are required");
    }

    if (email && !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new ApiError(400, "Invalid email")
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(400, "User already exists");
    }

    if (role !== "Developer" && role !== "Manager") {
        throw new ApiError(400, "Invalid role");
        
    }

    const createdUser = await User.create({ name, email,role,mobileNumber });

    const user = await User.findById(createdUser._id).select("-password -otp -refreshToken");
    sendUserRegistrationUser(user)
    
    return res.status(201).json(new ApiResponse(201, user, "User created successfully and Email has been send to user"));
 
});

const getAllUsers = asyncHandler(async (req, res) => {
    if(req.user.username!==process.env.ADMIN_NAME){
        throw new ApiError(401, "Unauthorized access");
    }
    const users = await User.find().select("-password -otp -refreshToken");
    return res.status(200).json(new ApiResponse(200, users, "Users retrieved successfully")); 
});

const updateProfile = asyncHandler(async (req, res) => {

    if(req.user.username!==process.env.ADMIN_NAME){
        throw new ApiError(401, "Unauthorized access");
    }
    const {role, mobileNumber } = req.body;

    if ([role, mobileNumber].some(field => field?.trim()==="" && !field)) {
        throw new ApiError(400, "All fields are required");
    }

    if (!role || role !== "Developer" && role !== "Manager") {
        throw new ApiError(400, "Invalid role");
    }

    if (mobileNumber && !mobileNumber.match(/^[6-9]\d{9}$/)) {
        throw new ApiError(400, "Invalid mobile number");
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, { role, mobileNumber }, { new: true }).select("-password -otp -refreshToken");
    return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));

})

const deleteProfile = asyncHandler(async (req, res) => {

    if(req.user.username!==process.env.ADMIN_NAME){
        throw new ApiError(401, "Unauthorized access");
    }

    const {email} = req.body;

    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new ApiError(400, "Invalid email");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const deletedUser = await User.findByIdAndDelete(user._id).select("-password -otp -refreshToken");
    deleteUserMail(user)
    return res.status(200).json(new ApiResponse(200, deletedUser, "User deleted successfully"));



})

const getAllTask = asyncHandler(async (req, res) => {
    if(req.user.username!==process.env.ADMIN_NAME){
        throw new ApiError(401, "Unauthorized access");
    }
    const tasks = await Task.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdBy"
            }
        },{
            $addFields: {
                assignedTo: {
                    $first: "$assignedTo"
                },
                createdBy: {
                    $first: "$createdBy"
                }
            }
        },{
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "taskId",
                as: "comments"
            }
        }

    ])
    return res.status(200).json(new ApiResponse(200, tasks, "Tasks retrieved successfully")); 
});

export { adminLoginController,
    adminLogoutController,
    registerUser,
    getAllUsers,
    updateProfile,
    deleteProfile,
    getAllTask};
