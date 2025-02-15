import { apiConnector } from "../apiConnector";
import { authEnpoint } from "../endPoints/authEndpoints";
import {
  setAuthLoading,
  setUser,
  setToken,
} from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

const { RegisterUser_API, LogInUser_API, AuthStatus_API } = authEnpoint;

// register user
export const registerUser = (data) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    console.log("Data in registerUser -> ", data);
    const { fullName, userName, email, password, accountType } = data;
    // console.log("Full Name -> ", fullName);

    if (!fullName || !email || !password || !accountType) {
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

    dispatch(setAuthLoading(false));

    toast.success("Registration Done Successfully");

    return response;
  } catch (error) {
    console.log("Error: ", error);
    dispatch(setAuthLoading(false));
    toast.error(error.message);
  }
};

// login user
export const login = (data) => async (dispatch) => {
  dispatch(setAuthLoading(true));
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

    dispatch(setAuthLoading(false));
    dispatch(setUser(true));

    dispatch(setToken(response.data.user.accessToken));

    toast.success("Logged In successfully");

    // return response;
  } catch (error) {
    console.log("Error: ", error);
    dispatch(setAuthLoading(false));
    toast.error(error.message);
  }
};

// auth status
export const authStatus = async (token) => {
  try {
    console.log("Auth status check");

    const authResponse = await apiConnector(
      "GET",
      AuthStatus_API,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Auth Response -> ", authResponse);

    return authResponse;
  } catch (error) {
    console.log("Error in auth status -> ", error);
    toast.response(`${error.response.data.message} , please login`);
  }
};
