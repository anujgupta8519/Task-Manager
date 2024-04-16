import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.models.js';


export const auth = asyncHandler(async (req, res, next) => {
    try {
       
        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
       

        if (!token) {
            throw new ApiError(401, "Unauthorized request token")
        }

        if (token===undefined) {
            throw new ApiError(401, "Unauthorized request token")
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECREAT_KEY);

        if (!decoded) {
            throw new ApiError(401, "Unauthorized request token")
        }

        const user = await User.findById(decoded._id).select("-password -otp -refreshToken");

        if (!user) {
            throw new ApiError(401, "Unauthorized request token")
        }
        req.user =  user

        next();

    }catch(error){

        throw new ApiError(401,error)

    }
})