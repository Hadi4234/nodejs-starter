import prisma from "../../prisma/prisma.js";

const createNewUser = async (name, email, password) => {
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
  return user;
};

const getAllUser = async () => {
  const user = await prisma.users.findMany({});
  return user;
};

const getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  // if user error then throw error
  return user;
};

export const userServices = {
  createNewUser,
  getAllUser,
  getUserById,
};
