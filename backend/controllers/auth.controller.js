import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return next(createError(400, "Email already exists!!"));
      }
      if (existingUser.username === username) {
        return next(createError(400, "Username already exists!!"));
      }
    }

    const hashpass = bcrypt.hashSync(password, 10);
    await prisma.users.create({
      data: {
        email,
        username,
        pass_hash: hashpass,
      },
    });
    res.status(201).json({ message: "register success" });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        OR: [{ email: username }, { username: username }],
      },
    });

    if (!user) {
      return next(createError(400, "Invalid credentials!!"));
    }

    const checkPassword = bcrypt.compareSync(password, user.pass_hash);

    if (!checkPassword) {
      return next(createError(400, "Invalid credentials!!"));
    }

    const payload = {
      id: user.user_id,
      username: user.username,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" });
    res.json({
      message: "Login Success!!!",
      payload: payload,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
