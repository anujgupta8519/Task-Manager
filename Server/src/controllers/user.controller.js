import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';
import { User } from "../models/User.models.js";
import { sendOTP } from "../utils/SendEmail.js";
import genrateOTP from "../utils/GenrateOTP.js";
import { Task } from "../models/Task.models.js";



const genrateAndsendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new ApiError(400, "Invalid email");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const OTP = genrateOTP();
    const userwithotp = await User.findByIdAndUpdate(user._id, { otp: OTP }, { new: true }).select("-password -otp -refreshToken");

    setTimeout(async () => {
        try {
            await User.findByIdAndUpdate(user._id, { otp: null }, { new: true });
            console.log('OTP expired');
        } catch (error) {
            console.error('Error invalidating OTP:', error);
        }
    }, 600000); // 10 minutes



  
    sendOTP(email, OTP);
    return res.status(200).json(new ApiResponse(200, userwithotp, "OTP sent successfully"));
})

const setPassword = asyncHandler(async (req, res) => {

    const { email, otp, password, confirmPassword } = req.body;

    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new ApiError(400, "Invalid email");
    }

    if (!otp) {
        throw new ApiError(400, "OTP is required");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    if (!confirmPassword) {
        throw new ApiError(400, "Confirm password is required");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Passwords do not match");
    }

    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user.otp === null) {
        throw new ApiError(400, "Sent OTP first");
        
    }
    if(user.password!==null){
        throw new ApiError(400, "Password already set");

    }
    if (user.otp !== otp) {
        await User.findByIdAndUpdate(user._id, { otp: null }, { new: true });
        throw new ApiError(400, "Invalid OTP");
    }

    if (user.otp === otp) {
        const bycrptPassword = await user.encryptPassword(password);
        
    const updatedUser = await User.findByIdAndUpdate(user._id, { password:bycrptPassword, otp: null }, { new: true }).select("-password -otp -refreshToken");

    return res.status(200).json(new ApiResponse(200, updatedUser, "Password set successfully"));
        
    }else{
        throw new ApiError(400, "Invalid OTP");
    }

})

const loginWithPassword = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new ApiError(400, "Invalid email");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user.password === null) {
        throw new ApiError(400, "Password not set please set the password first");
    }

    const  ispasswordCorrect = await user.comparePassword(password);
    if (!ispasswordCorrect) {
        throw new ApiError(400, "Invalid password");
    }

   

    const accessToken = user.genrateAccessToken();
    const refreshToken = user.genrateRefreshToken();

    const updatedUser = await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true }).select("-password -otp -refreshToken");


    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {loggedinUser: updatedUser, accessToken, refreshToken }, "Login successful"));

})

const loginWithOTP = asyncHandler(async (req, res) => {

    const { email, otp } = req.body;

    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new ApiError(400, "Invalid email");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user.otp === null) {
        throw new ApiError(400, "Sent OTP first");
    }

    if (user.otp !== otp) {
        throw new ApiError(400, "Invalid OTP");
    }

    const accessToken = user.genrateAccessToken();
    const refreshToken = user.genrateRefreshToken();

    const updatedUser = await User.findByIdAndUpdate(user._id, { refreshToken, otp: null }, { new: true }).select("-password -otp -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {loggedinUser: updatedUser, accessToken, refreshToken }, "Login successful"));
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(400, "Refresh token is required");
    }
    try{

        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECREAT_KEY);

        if (!decoded) {
            throw new ApiError(400, "Invalid refresh token");
        }   

        const user = await User.findById(decoded?._id).select("-password -otp -refreshToken");

        if (!user) {
            throw new ApiError(400, "User not found");
        }

        if (!user.refreshToken) {
            throw new ApiError(400, "Refresh token not found");
        }

        if (user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(400, "Invalid refresh token");
        }

        const accessToken = user.genrateAccessToken();
        const refreshToken = user.genrateRefreshToken();

        const updatedUser = await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true }).select("-password -otp -refreshToken");

        const options = {
            httpOnly: true,
            secure: true,
        }

        return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, {user: updatedUser, accessToken }, "Access token refreshed successfully"));


    }catch(error){

        throw new ApiError(400, error);
    }

    
})

const updatePassword = asyncHandler(async (req, res) => {

    const { password, confirmPassword } = req.body;

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    if (!confirmPassword) {
        throw new ApiError(400, "Confirm password is required");
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user.password === null) {
        throw new ApiError(400, "Password not set please set the password first");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Passwords do not match");
    }
    const bycrptpassword = await user.encryptPassword(password);


    const updatedUser = await User.findByIdAndUpdate(user._id, { password: bycrptpassword , otp: null}, { new: true }).select("-password -otp -refreshToken");

    return res.status(200).json(new ApiResponse(200, { user: updatedUser }, "Password updated successfully"));
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1
        }
    },
        {
            new: true,
        })
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))



})

const getcreatedTask = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user.role !=="Manager") {
        throw new ApiError(400, "Unauthorized access");
        
    }

    const task = await Task.aggregate([
        {
            $match: {
                createdBy: user._id
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "assignedTo",
                foreignField: "_id",
                as: "assignedTo",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            role: 1,
                            email: 1,
                            mobileNumber: 1

                        }

                    },{
                        $addFields:{
                            assignedTo:{
                              $first:"$assignedTo"
                            }
                        }
                    }
                   
                ]

            }
        },
        {
            $lookup: {
                from:"comments",
                localField:"_id",
                foreignField:"taskId",
                as:"comments"
            }
        }
        
    ])

    if (!task) {
        throw new ApiError(400, "Task not found");
    }


    return res.status(200).json(new ApiResponse(200, task, "Task retrieved successfully"));

})

const getAssigntomeTask = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if (user.role !=="Developer") {
        throw new ApiError(400, "Unauthorized access");
        
    }

    const task = await Task.aggregate([
        {
            $match: {
                assignedTo: user._id
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "createdBy",
                foreignField: "_id",
                as: "createdBy",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            role: 1,
                            email: 1,
                            mobileNumber: 1

                        }

                    },{
                        $addFields:{
                            createdBy:{
                              $first:"$createdBy"
                            }
                        }
                    }
                   
                ]

            }
        },
        {
            $lookup: {
                from:"comments",
                localField:"_id",
                foreignField:"taskId",
                as:"comments"
            }
        }

    ])

    if (!task) {
        throw new ApiError(400, "Task not found");
    }

    return res.status(200).json(new ApiResponse(200, task, "Task retrieved successfully"));


})

const getCurrentUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user?._id);

    if (!user) {
        throw new ApiError(400, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user, "User retrieved successfully"));
})


export { genrateAndsendOTP,
     setPassword,
      loginWithPassword, 
      loginWithOTP, 
      refreshAccessToken, 
      updatePassword , 
      logoutUser,
       getcreatedTask, 
       getAssigntomeTask,
       getCurrentUser}

