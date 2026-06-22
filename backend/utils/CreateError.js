import logger from "../logger.js";

const Error = (msg, err = null) => {
  const properties = new Object();
  properties.error = true;
  properties.status = "Access Denied";
  properties.message = msg;
  if (err) {
    logger.error(err.message || err);
  }
  if (process.env.DATABASE_ENV === "dev") {
    properties.errorMessage = err;
  }

  return properties;
};

export default Error;
