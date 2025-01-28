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
  console.log("Request body -> ",req.body);

  try {
    // Extract user details from the frontend
    const { fullName, email, userName, password } = req.body;

    // Validate required fields
    if ([fullName, email, userName, password].some((field) => !field?.trim())) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if the user already exists (by userName or email)
    const existedUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (existedUser) {
      return res.status(409).json({
        message: "username or email already exists",
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
      userName: userName.toLowerCase(),
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
// const loginUser = asyncHandler(async (req, res) => {
//   // req body -> data
//   // userName or email
//   //find the user
//   //password check
//   //access and referesh token
//   //send cookie

//   const { email, userName, password } = req.body;
//   console.log(email);

//   if (!userName && !email) {
//     throw new ApiError(400, "userName or email is required");
//   }

//   // Here is an alternative of above code based on logic discussed in video:
//   // if (!(userName || email)) {
//   //     throw new ApiError(400, "userName or email is required")

//   // }

//   const user = await User.findOne({
//     $or: [{ userName }, { email }],
//   });

//   if (!user) {
//     throw new ApiError(404, "User does not exist");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(password);

//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid user credentials");
//   }

//   const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
//     user._id
//   );

//   const loggedInUser = await User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedInUser,
//           accessToken,
//           refreshToken,
//         },
//         "User logged In Successfully"
//       )
//     );
// });

export { registerUser };
