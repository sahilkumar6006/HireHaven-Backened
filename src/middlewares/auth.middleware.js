import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import Employee from "../models/employee.model.js";
import Employer from "../models/employer.model.js";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Unauthorized: No token provided");
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        let user;
        if(decoded.role === "employee"){
            user = await Employee.findById(decoded._id).select("-password");
        }else if(decoded.role === "Employer"){
            user = await Employer.findById(decoded._id).select("-password");
        }

        
       // Attach user data to request
        if (!user) throw new ApiError(404, "User not found");
        req.user = user;

        next();
    } catch (error) {
      res.json({
        error:error.message
      })        
    }
};

export { authMiddleware };
