import express from "express";
import cors from "cors";
import asyncHandler from "../utils/asyncHandler.js";
import prisma from "../prisma/prisma.js";
import { userRouter } from "../modules/users/users.route.js";
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/auth.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

app.get(
  "/hero",
  asyncHandler(async (req, res) => {
    const hero = {
      title: "hadi",
      desc: "build your website rgbfkasj oi weo whfo wiehfd ",
      image1: "https://via.placeholder.com/350x150",
    };
    res.json(hero);
  }),
);
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

app.post(
  "/users",
  asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.users.create({
      data: {
        name,
        email,
      },
    });
    res.json(user);
  }),
);

app.post(
  "/posts",
  asyncHandler(async (req, res) => {
    const { title, content, authorEmail } = req.body;
    const post = await prisma.posts.create({
      data: {
        title,
        content,
        authorEmail,
      },
    });
    res.json(post);
  }),
);

app.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const post = await prisma.posts.findMany({});
    res.json(post);
  }),
);

app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const user = await prisma.users.findMany({});
    res.json(user);
  }),
);

app.patch(
  "/users",
  asyncHandler(async (req, res) => {
    const { id, name, email, password } = req.body;
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password,
      },
    });
    res.json(user);
  }),
);

app.delete(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await prisma.users.delete({
      where: { id: Number(id) },
    });
    res.json(user);
  }),
);

app.listen("8000", () => {
  console.log("server is running on port 8000");
});
