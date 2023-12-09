import sendResponse from "../../shared/SendResponse.js";
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

const getAllUser = asyncHandler(async (req, res,next) => {
  try {
    const user = await userServices.getAllUser();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Request successfully',
      data: user
  });
  } catch (err) {
    next(err);
  }
})

const getUserById = asyncHandler(async (req, res, next) => {
  try {
    const { id, name } = req.params;
    const result = await userServices.getUserById(id, name);
    // res.json(result)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Request successfully',
      data: result
  });
  } catch (err) {
    next(err);
  }
});

export const userControllers = {
  createUser,
  getAllUser,
  getUserById,
};
