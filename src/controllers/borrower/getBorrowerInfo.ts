import { prisma } from "@/utils";
import { Request, Response } from "express";

export async function getBorrwerInfo(req: Request, res: Response) {
  try {
    const userId = Number(req.body.id);
    const profile = await prisma.company.findFirst({
      where: {
        ownerId: userId,
      },
      include: {
        credit: {
          take: 6,
        },
        documents: {
          take: 10,
        },
      },
    });
    if (profile) {
      res.status(200);
      res.json({
        data: profile,
        err: null,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      data: null,
      err: "INTERNAL SERVER ERROR",
    });
  }
}
