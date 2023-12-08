import asyncHandler from "../../utils/asyncHandler.js";
import { userServices } from "./users.service.js";

const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userServices.createNewUser(name, email, password);

    res.json(user);
  } catch (err) {
    res.json("Email already used");
    console.log(err);
  }
});

const getAllUser = async (req, res) => {
  try {
    const user = await userServices.getAllUser();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id, name } = req.params;
    const user = await userServices.getUserById(id, name);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getUserById,
};
