import { User } from "../models/userModel.js";

// User signup
const userSignup = async(req, res) => {
  try {
    // Destructing data from request.body
    const { name, email, mobile, password } = req.body;

    // Check each field not empty
    if (!name || !email || !mobile || !password){
      return res.status(400).json({ error: "All fields required" })};
    
      // Check user already exists
      const existUser = await User.fineOne({email})
      if(existUser){
        return res.status(400).json({error: 'User already exists'})
      }

      // Create new user object
      const newUser = new User()

      // Save data to database
      newUser.save()
      res.status(200).json({message: 'User created successfully'})
  } catch (error) {
    res.status(error.status || 500).json({error: error.message || 'Internal server error'})

  }
};
