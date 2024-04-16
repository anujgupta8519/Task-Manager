import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';


export const isAdmin = asyncHandler(async (req, res, next) => {
    try {
       
        const token =  req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        

        if (!token) {
            throw new ApiError(401, "Unauthorized request token")
        }

        if (token===undefined) {
            throw new ApiError(401, "Unauthorized request token")
        }
        const decoded = jwt.verify(token, process.env.ADMIN_JWT);

        if (!decoded) {
            throw new ApiError(401, "Unauthorized request token")     
        }

        if (decoded.username !== process.env.ADMIN_NAME) {
            throw new ApiError(401, "Unauthorized request token")
        }

        req.user = decoded

        
    next();

    
    
    }catch(error){

        throw new ApiError(401,error)

        }

})