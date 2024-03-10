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

export async function getUnderWritterStats(_: Request, res: Response) {
  try {
    res.status(200);
    res.json({
      data: underwritterstats,
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
