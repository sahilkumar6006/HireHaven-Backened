import Employee  from "../models/employee.model.js";
import Employer  from "../models/employer.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const updateProfile = async (req, res) => {
    try {
        const { role } = req.params;
        const updates = req.body;
        const userId = req.user._id; // Assuming user ID is available from auth middleware

        // Remove fields that shouldn't be updated directly
        delete updates.password;
        delete updates._id;
        
        let user;
        // Select model based on role
        const Model = role.toLowerCase() === 'employee' ? Employee : 
                     role.toLowerCase() === 'employer' ? Employer : null;

        if (!Model) {
            throw new ApiError(400, "Invalid role specified", ["Role must be either employee or employer"]);
        }

        // Find and update the user
        user = await Model.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true, runValidators: true }
        ).select("-password");
        

        if (!user) {
            throw new ApiError(404, "User not found", ["User does not exist"]);
        }

        return res.status(200).json(
            new ApiResponse(200, user, "Profile updated successfully")
        );

    } catch (error) {
        res.status(error.statusCode || 500).json({ 
            error: error.message || "Something went wrong while updating profile" 
        });
    }
}



export const registerUser = async (req, res) => {
    try {
        // TODO: Implement user registration logic
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong during registration"
        });
    }
}

export const verifyOtp = async (req, res) => {
    try {
        // TODO: Implement OTP verification logic
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong during OTP verification"
        });
    }
}

export const setPassword = async (req, res) => {
    try {
        // TODO: Implement password setting logic
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong while setting password"
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        // TODO: Implement user login logic
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong during login"
        });
    }
}

export const completeProfile = async (req, res) => {
    try {
        // TODO: Implement profile completion logic
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong while completing profile"
        });
    }
}

export const resendOtp = async (req, res) => {
    try {
        // TODO: Implement OTP resend logic
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong while resending OTP"
        });
    }
}

export const forgotPassword = async (req, res) => {
    try {
        // TODO: Implement forgot password logic
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong with forgot password request"
        });
    }
}

export const resetPassword = async (req, res) => {
    try {
        // TODO: Implement password reset logic
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong while resetting password"
        });
    }
}

export const logout = async (req, res) => {
    try {
        // TODO: Implement logout logic
        
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: error.message || "Something went wrong during logout"
        });
    }
}
