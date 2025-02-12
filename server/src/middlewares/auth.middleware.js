import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {

    console.log("Cookie -> ",req)

    const { accessToken } = req.cookies; // Get token from cookies


    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Not authenticated", isAuthenticated: false });
    }

    // Verify the token
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid token", isAuthenticated: false });
    }

    // Attach user details to `req.user` for further processing
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Authentication failed", isAuthenticated: false });
  }
};

export default authMiddleware;
