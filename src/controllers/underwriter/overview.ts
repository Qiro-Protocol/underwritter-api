import { prisma } from "@/utils";
import { Request, Response } from "express";

const underwritterstats = [
  { label: "Total-Underwritten", data: "20" },
  { label: "Default-ate", data: "50%" },
  {
    label: "Acceptance-Rate",
    data: "10%",
  },
  {
    label: "Earnings",
    data: "$20k",
  },
] as const;

export async function getUnderWritterStats(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const profile = await prisma.underwriterProfile.findUnique({
      where: {
        userId: id,
      },
    });

    res.status(200);
    res.json({
      data: {
        profile: profile,
        stats: underwritterstats,
      },
      err: null,
    });
  } catch (e) {
    res.status(500);
    res.json({
      data: null,
      err: "INTERNAL SERVER ERROR",
    });
  }
}
