import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const EmployerSchema = new mongoose.Schema(
  {
    role:{
      type:String,
      default:"Employer"
    },

    isIndividual: {
      type: Boolean,
      default: false,
    },
    fullname: {
      type: String,
      required: function () {
        return this.isIndividual;
      },
    },
    companyName: {
      type: String,
      required: function () {
        return !this.isIndividual;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: { type: String },
    website: { type: String },
    industry: { type: String },

    // Company details
    profilePicture: { type: String },
    companyLogo: { type: String },
    address: { type: String },
    location: { type: String }, // City, Country

    bio: { type: String },
    description: { type: String },
    foundedYear: { type: Number },

    postedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    appliedCandidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
    accountStatus: { type: String, enum: ["Active", "Suspended"], default: "Active" },
  },
  { timestamps: true }
);

// **🔐 Hash Password Before Saving**
EmployerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// **🛡️ Compare Password**
EmployerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// **🔑 Generate Access Token**
EmployerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
      companyName: this.companyName,
      isVerified: this.isVerified,
      companyLogo: this.companyLogo,
      profilePicture: this.profilePicture,
      role:this.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// **♻️ Generate Refresh Token**
EmployerSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export default mongoose.model("Employer", EmployerSchema);
