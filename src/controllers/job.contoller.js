import Job from "../models/job.model.js";

const createJob = async (req, res) => {
    const { title, description, salary, location, jobType, skills, employerId } = req.body;
  
    // Log the incoming request body for debugging
    console.log("In the createJob controller", req.body);
  
    // Validate required fields
    if (!title || !description || !location || !jobType || !skills || !employerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
  
    // Validate jobType
    if (!["REMOTE", "ONSITE", "HYBRID"].includes(jobType)) {
      return res.status(400).json({ message: "Invalid job type" });
    }
  
    // Validate skills
    if (!Array.isArray(skills) || skills.length < 1) {
      return res.status(400).json({ message: "Invalid skills" });
    }
  
    // Validate employerId
    // if (!mongoose.Types.ObjectId.isValid(employerId)) {
    //   return res.status(400).json({ message: "Invalid employer ID" });
    // }
  
    try {
      // Create the job
      const job = await Job.create({
        title,
        description,
        salary,
        location,
        jobType,
        skills,
        employer: employerId,
      });
  
      // Respond with the created job
      res.status(201).json(job);
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ message: "Error creating job" });
    }
  };
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error getting jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error getting job" });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, salary, location, jobType, skills, employerId } = req.body;
    if (!title || !description || !salary || !location || !jobType || !skills || !employerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (jobType !== "REMOTE" && jobType !== "ONSITE" && jobType !== "HYBRID") {
      return res.status(400).json({ message: "Invalid job type" });
    }
    if (skills.length < 1) {
      return res.status(400).json({ message: "Invalid skills" });
    }
    if (employerId.length < 1) {
      return res.status(400).json({ message: "Invalid employer" });
    }
    const job = await Job.findByIdAndUpdate(id, {
      title,
      description,
      salary,
      location,
      jobType,
      skills,
      employer: employerId,
    });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error updating job" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job" });
  }
};   


const jobfilter = async (req, res) => {
  try {
    const { keyword ,location} = req.body;
    
    if(!keyword && !location){
      return res.status(400).json({ message: "Missing required fields" });
    }
    console.log(keyword,location)

    const filterQuery = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { jobType: { $regex: keyword, $options: "i" } },
        { skills: { $elemMatch: { $regex: keyword, $options: "i" } } },
        {location: { $regex: location||keyword, $options: "i" }}
         // Matching inside array
      ]
    };
    // if(location){
    //   filterQuery.location = { $regex: location, $options: "i" };
    // }

  

    const jobs = await Job.find(filterQuery);
    console.log(jobs)

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ message: "Error filtering jobs" });
  }
}

export  {
  createJob,
  getJobs,
  getJobById,
  updateJob,    
  deleteJob,
  jobfilter
}