import { apiConnector } from "../apiConnector";
import { authEnpoint } from "../endPoints/authEndpoints";

const { RegisterUser_API } = authEnpoint;

export const registerUser = async (data) => {
  try {
    console.log("Data in registerUser -> ", data);
    const { fullName, userName, email, password } = data;
    // console.log("Full Name -> ", fullName);

    if (!fullName || !userName || !email || !password) {
      throw new Error("All fields are required");
    }

    console.log("Register api ->", RegisterUser_API);

    const response = await apiConnector("POST", RegisterUser_API, {
      fullName,
      userName,
      email,
      password,
    });

    console.log("Response from register user in authApi -> ", response);

    return response;
  } catch (error) {
    console.log("Error: ", error);
  }
};
