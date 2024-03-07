import { prisma } from "@/utils";
import { Request, Response } from "express";

export async function getUser(req: Request, res: Response) {
  try {
    const userId = Number(req.body.id);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    res.status(200);
    res.json({
      data: user,
      err: null,
    });
  } catch (e) {
    console.log(e);
    res.json({
      data: null,
      err: {
        message: "Internal Server Erro",
        status: 500,
      },
    });
  }
}
