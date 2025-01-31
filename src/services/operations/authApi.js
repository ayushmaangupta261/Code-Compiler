import { apiConnector } from "../apiConnector";
import { authEnpoint } from "../endPoints/authEndpoints";

const { RegisterUser_API, LogInUser_API } = authEnpoint;

// register user
export const registerUser = async (data) => {
  try {
    console.log("Data in registerUser -> ", data);
    const { fullName, userName, email, password, accountType } = data;
    // console.log("Full Name -> ", fullName);

    if (!fullName || !userName || !email || !password || !accountType) {
      throw new Error("All fields are required");
    }

    console.log("Register api ->", RegisterUser_API);

    const response = await apiConnector("POST", RegisterUser_API, {
      fullName,
      userName,
      email,
      password,
      accountType,
    });

    console.log("Response from register user in authApi -> ", response);

    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
};

// login user
export const login = async (data) => {
  try {
    console.log("Data in login api -> ", data);
    const { email, password } = data;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const response = await apiConnector("POST", LogInUser_API, {
      email,
      password,
    });

    console.log("Response from login user in authApi -> ", response);
  } catch (error) {
    console.log("Error: ", error);
  }
};
