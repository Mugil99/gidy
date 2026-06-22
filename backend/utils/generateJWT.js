import jwt from "jsonwebtoken";
import dotevn from "dotenv";
dotevn.config();

export default (studentInfo, expTime) => {
  const securityKey = process.env.AUTHENTICATION_TOKEN_KEY;

  console.log(process.env.AUTHENTICATION_TOKEN_KEY);
  try {
    const token = jwt.sign(studentInfo, securityKey, { expiresIn: expTime });
    return { token, status: true };
  } catch (err) {
    return { status: false, error: err };
  }
};
