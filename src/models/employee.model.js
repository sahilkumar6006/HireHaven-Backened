

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const EmployeeSchema = new mongoose.Schema({
    role:{
        type:String,
        default:"Employee"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["employee"],
        default: "employee"
    },
    profileImage: {
        type: String // URL of profile picture
    },
    resume: {
        type: String // URL of uploaded resume
    },
    skills: {
        type: [String], // Array of skills
        default: []
    },
    experience: [
        {
            company: String,
            jobTitle: String,
            startDate: Date,
            endDate: Date,
            description: String
        }
    ],
    education: [
        {
            institution: String,
            degree: String,
            startYear: Number,
            endYear: Number
        }
    ],
    appliedJobs: [
        {
            jobId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job"
            },
            status: {
                type: String,
                enum: ["pending", "shortlisted", "rejected", "selected"],
                default: "pending"
            },
            appliedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    savedJobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job"
        }
    ],
    location: {
        type: String
    },
    bio: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})

EmployeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// **🛡️ Compare Password**
EmployeeSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// **🔑 Generate Access Token**
EmployeeSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name:this.name,
      role:this.role,
      profileImage:this.profileImage,
      isVerified:this.isVerified
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

// **♻️ Generate Refresh Token**
EmployeeSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export default mongoose.model("Employee",EmployeeSchema)