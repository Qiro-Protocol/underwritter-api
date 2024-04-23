import { type Request, type Response } from "express";
import bcrypt from "bcrypt";

import { prisma, createJwtToken, hashPassword } from "@/utils";
import { validateEmail, validateUser } from "@/validators/validate-user";

const test_pass = "yesvikash29";

export const regiseterUser = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, role } = validateUser.parse(req.body);
    const hashedpassword = await hashPassword(test_pass);
    if (hashedpassword) {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedpassword,
          firstName,
          lastName,
          role,
        },
      });
      if (user) {
        const token = createJwtToken(user.id.toString());
        res.status(200);
        res.cookie("token", token, {
          httpOnly: false,
          secure: false,
          sameSite: "none",
          expires: new Date(Date.now() + 86400000),
        });
        res.json({
          data: {
            token,
          },
          err: null,
        });
      } else {
        res.status(500);
        res.json("some error");
      }
    }
  } catch (e) {
    if (e.code == "P2002") {
      res.status(409);
      res.json("user already exist");
    } else {
      res.status(500);
      res.json("internal server erro");
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email } = validateEmail.parse(req.body);
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log(user);
    if (user) {
      const isPasswordMatched = await bcrypt.compare(test_pass, user?.password);
      if (isPasswordMatched) {
        const token = createJwtToken(user.id.toString());
        res.cookie("token", token);

        res.json({
          data: {
            token,
            user,
          },
          err: null,
        });
      } else {
        res.status(403);
        res.json({
          msg: "incorrect password",
        });
      }
    } else {
      res.status(403);
      res.json({
        msg: "incorrect username",
      });
    }
  } catch (e) {
    console.log(e.code);
    res.status(500);
    res.json(e);
  }
};
