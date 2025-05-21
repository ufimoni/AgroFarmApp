const Users = require('./../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('./../middlewares/asyncErrorHandler');


const JWT_Secrete = process.env.Secret_Key || '123456!!!!!.34=HappyCoding';



exports.signup = asyncErrorHandler( async (req, res) => {
  try {
    const { firstname, lastname, email, password, role, phone, image, roleProfileType } = req.body;

    //  Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Sorry This User Exists',
      });
    }

    // Validate password length
    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 
    const user = new Users({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      phone,
      image,
      roleProfileType,
    });

    const newuser =  await user.save();
  console.log(newuser);
    //  Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_Secrete, {
      expiresIn: '1d',
    });

    // Set cookie and send response
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

   return res.send({
      success: true,
      message: 'Signup successful',
       token,
      user: {
       newuser
      },
     
    });

  } catch (error) {
    console.error('Signup Error:', error);
   return res.send({
      success: false,
      message: error.message,
    });
  }
}

) 
 exports.login = asyncErrorHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check if user already exists
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exists',
      });
    }
      
   // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
    }


    //  Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.Secret_Key, {
      expiresIn: '1d',
    });


    // Set cookie and send response
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: 'Login successful',
      user,
      token,
    });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}) 

exports.logout = asyncErrorHandler( async( req, res ) =>{
   res.clearCookie('token')
   res.send({
      message: "User Logged Out successfully",
      success: true
   })
})

