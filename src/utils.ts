import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const hashPassword = async (password: string, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createJwtToken = (userID: string) => {
  const privateKey = process.env.JWT_TOKEN_SECRETE;
  if (privateKey) {
    const token = jwt.sign(userID, privateKey);
    return token;
  } else {
    return null;
  }
};

export const prisma = new PrismaClient();