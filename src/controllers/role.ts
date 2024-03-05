import { prisma } from "@/utils";
import { Request, Response } from "express";

export const AddRole = async (req: Request, res: Response) => {
  try {
    const userId = req.body.id;
    const { role } = req.body;

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });

    if (!user) {
      res.status(404);
      res.json({
        data: null,
        err: {
          message: "User Not found",
        },
      });
    }

    res.status(201);
    res.json({
      data: {
        message: "Added ROLE",
      },
      err: null,
    });
  } catch (e) {
    res.status(200);
    res.json({
      data: null,
      err: e,
    });
  }
};
