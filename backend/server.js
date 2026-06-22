import http from "http";
import logger from "./logger.js";
import app from "./app.js";
import connectDB from "./config/database.js";

const port = process.env.PORT || 5000;

try {
  await connectDB();

  const server = http.createServer();

  server
    .on("request", app)
    .on("listening", function () {
      const addr = this.address();
      const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

      logger.info(`Listening on ${bind}`);
    })
    .on("error", function (error) {
      if (error.syscall !== "listen") throw error;

      const addr = this.address() || { port };

      const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;

      switch (error.code) {
        case "EACCES":
          logger.error(`${bind} requires elevated privileges`);
          break;

        case "EADDRINUSE":
          logger.error(`${bind} is already in use`);
          break;

        default:
          throw error;
      }
    })
    .listen(port, () => console.log(`server running on port ${port}`));
} catch (error) {
  console.log(error);
  logger.error("Error starting server:", error);
  process.exit(1);
}
