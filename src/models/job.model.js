import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number },
  location: { type: String, required: true },
  jobType: {
    type: String,
    enum: ["REMOTE", "ONSITE", "HYBRID"],
    required: true,
  },
  skills: { type: [String], required: true },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },
  
  createdAt: { type: Date, default: Date.now },
});

const Job = mongoose.model("Job", JobSchema);
export default Job;
