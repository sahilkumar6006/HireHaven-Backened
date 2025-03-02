import Employer from "../models/employer.model.js";
import Employee from '../models/employee.model.js'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const RegisterEmployer = async (req, res) => {
    try {
        const { employerType, fullname, companyName, email, password, confirmPassword } = req.body;

        // ✅ 1. Check required fields
        if (!employerType || !fullname || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // ✅ 2. Determine if the employer is an individual
        const isIndividual = employerType.toLowerCase() === "individual";

        // ✅ 3. Ensure `companyName` is provided for companies
        if (!isIndividual && !companyName) {
            return res.status(400).json({ message: "Company name is required for company employers" });
        }

        // ✅ 4. Ensure `fullname` is provided for individuals
        if (isIndividual && !fullname) {
            return res.status(400).json({ message: "Full name is required for individual employers" });
        }

        // ✅ 5. Check if passwords match
        if (password !== confirmPassword) {
            return res.status(409).json({ message: "Passwords do not match" });
        }

        // ✅ 6. Check if employer already exists
        const existingEmployer = await Employer.findOne({ email });
        if (existingEmployer) {
            return res.status(409).json({ message: "User already exists" });
        }

        // ✅ 7. Create employer object correctly
        const newEmployer = new Employer({
            isIndividual,  // ✅ Define first before using in other fields
            fullname: isIndividual ? fullname : "",  // ✅ Prevent validation error
            email,
            password,
            companyName: isIndividual ? "" : companyName,  // ✅ Prevent validation error
        });

        // ✅ 8. Save to database
        await newEmployer.save();

        return res.status(200).json({ message: "Employer registered successfully" ,newEmployer});

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const RegisterEmployee = async (req, res)=>{

    try {

        const {  name,email,phone, password, confirmPassword } = req.body;

       
        if (!name || !email || !phone || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user  = await Employee.findOne({email})
        if (user) {
           throw new ApiError(409,"User already exist",["User is already in the database"])
        }

        const newEmployee = new Employee({
            name:name,
            email,
            password,
            phone
        })

        await newEmployee.save()
        return res.status(200).json(new ApiResponse(200,newEmployee,"User created successfully"));

        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//employee signUp

export const SignIn = async (req,res)=>{
    try {

        const{email,password} = req.body;
        if(!email || !password){

            throw new ApiError(400,"all fields are required",[" All fileds should be filled"])

        }

        let user = await Employee.findOne({email})  ||  await Employer.findOne({email});
        if(!user){
            throw new ApiError(401,"Invalid username or password",['User not available'])
        }

        if(!user.isPasswordCorrect(password)){
            throw new ApiError(401,"Password is not correct",["Password is not correct"])
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        const data = {
            accessToken,refreshToken
        }

        return res.status(200).json(new ApiResponse(200,data,"Logged in successfully"));
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

