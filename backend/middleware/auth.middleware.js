import jwt from "jsonwebtoken";
import { User } from "../modules/user.module.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token missing"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(decoded._id).select("-password"); // attach user
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token invalid"
    });
  }
};
