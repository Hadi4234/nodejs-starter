import express from "express";
import cors from "cors";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../prisma/prisma.js";
import { userRouter } from "../modules/users/users.route.js";
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/auth.js";
import CustomError from "../utils/customError.js";
import errorController from '../middleware/errorController.js'


const app = express();
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception occured! Shutting down...');
  process.exit(1);
})

// Logger middleware function
// const logger = (req, res, next) => {
//   const logMessage = `[${new Date().toUTCString()}] ${req.method} ${req.originalUrl}\n`;

//   // Writing log to a file named 'access.log'
//   fs.appendFile('access.log', logMessage, (err) => {
//     if (err) {
//       console.error('Error writing to log file:', err);
//     }
//   });

//   next();
// };
app.use(cors());
app.use(logger());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

const secretKey = process.env.AUTH_KEY;

app.post("/api/v1/login", async (req, res) => {
  // Here you'd typically validate the user's credentials
  const { username, password } = req.body;
  const user = await prisma.users.findMany(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const accessToken = jwt.sign(
    { username: user.username, id: user.id },
    secretKey,
  );
  res.json({ accessToken });
});

app.get("/api/v1/login", authenticateToken, (req, res) => {
  res.json({ message: "you have a accessToken. welcome" });
});

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //     status: 'fail',
  //     message: `Can't find ${req.originalUrl} on the server!`
  // });
  // const err = new Error(`Can't find ${req.originalUrl} on the server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, 404);
  next(err);
});

app.use(errorController);

app.listen("8000", () => {
  console.log("server is running on port 8000");
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection occured! Shutting down...');

  server.close(() => {
   process.exit(1);
  })
})