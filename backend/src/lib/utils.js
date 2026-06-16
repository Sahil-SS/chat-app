import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (id, res) => {
  //Generate JWT token
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwtToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
    httpOnly: true, //Prevent XSS attacks by making the cookie inaccessible to JavaScript : cross site scripting attack
    sameSite: "strict", //Prevent CSRF attacks by only sending the cookie for same-site requests : cross site request forgery attack
    secure: process.env.NODE_ENV === "development" ? false : true, //Ensure the cookie is only sent over HTTPS in production
  });
  return token;
};
