import jwt from "jsonwebtoken";
import dotevn from "dotenv";
dotevn.config();

export default (token) => {
  try {
    if (!token?.startsWith("Bearer ")) {
      const res = jwt.verify(token, process.env.AUTHENTICATION_TOKEN_KEY);

      return { status: true, student: res };
    }

    const originalToken = token.split(" ")[1];
    const res = jwt.verify(originalToken, process.env.AUTHENTICATION_TOKEN_KEY);
    console.log(process.env.AUTHENTICATION_TOKEN_KEY);
    return { status: true, student: res };
  } catch (err) {
    console.log(err);
    return { status: false, error: err };
  }
};
