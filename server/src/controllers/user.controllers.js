import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Function to generate access and refresh token
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};


// Function to register the user
const registerUser = async (req, res, next) => {
  console.log("Request body -> ", req.body);

  try {
    // Extract user details from the frontend
    const { fullName, email, password, accountType } = req.body;

    // Validate required fields
    if (
      [fullName, email, password, accountType].some((field) => !field?.trim())
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if the user already exists (by userName or email)
    const existedUser = await User.findOne({
      email,
    });

    if (existedUser) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    // Validate avatar file
    // const avatarLocalPath = req.files?.avatar?.[0]?.path;
    // // console.log("avatar local path: ", avatarLocalPath);

    // if (!avatarLocalPath) {
    //   return res.status(400).json({
    //     message: "Avatar file is required",
    //     success: false,
    //   });
    // }

    // // Upload avatar to Cloudinary
    // const avatar = await uploadOnCloudinary(avatarLocalPath);
    // // console.log("Avatar -> ", avatar);

    // if (!avatar) {
    //   return res.status(500).json({
    //     message: "Failed to upload avatar",
    //     success: false,
    //   });
    // }

    // Create user object in the database
    const user = await User.create({
      fullName,
      // avatar: avatar.url,
      email,
      password,
      accountType,
      // userName: userName.toLowerCase(),
    });

    if (!user) {
      return res.status(500).json({
        message: "Failed to register user",
        success: false,
      });
    }

    // Remove sensitive fields before sending the response
    const createdUser = user.toObject(); // Convert to plain object
    delete createdUser.password; // Remove password
    delete createdUser.refreshToken; // Remove refresh token

    // Send the response
    return res.status(201).json({
      user: createdUser,
      success: true,
    });
  } catch (error) {
    // Handle errors and send a proper response
    console.error("Error in registerUser:", error);
    return res.status(error.statusCode || 500).json({
      message: error.message || "An error occurred during registration",
      success: false,
    });
  }
};

// Function to login the user
const loginUser = async (req, res) => {
  // req body -> data
  // userName or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, password } = req.body;
  console.log(email);

  if (!password && !email) {
    return res.status(401).json({
      message: "All credentials are required",
      success: false,
    });
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email, user doesn't exists",
      success: false,
    });
  }

  console.log("User -> ", user);

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password, please check your password",
      success: false,
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  console.log("Tokens -> ", accessToken, " ", refreshToken);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "None",
  };

  // return res
  //   .status(200)
  //   .cookie("accessToken", accessToken, options)
  //   .cookie("refreshToken", refreshToken, options)
  //   .json({
  //     user: loggedInUser,
  //     success: true,
  //   });

  setTimeout(() => {
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: user,
        success: true,
      });
  }, 5000); // 5 seconds delay
};

// function to check auth status
const authStatus = async (req, res) => {
  try {
    const { user } = req;
    console.log("User -> ,", user);

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User is not loggedin",
      });
    }

    const userInDB = await User.findById(user._id);

    if (!userInDB) {
      return res.status(400).json({
        status: false,
        message: "User doesn't exist",
      });
    }

    return res.status(200).json({
      status: true,
      message: "User Authenticated",
    });
  } catch (error) {
    console.log("Error in auth status ->", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, loginUser, authStatus };
