import { prisma } from "@/utils";
import { Request, Response } from "express";

export async function getAllApplications(_: Request, res: Response) {
  try {
    const allapplications = await prisma.application.findMany();
    res.status(200);
    res.json({
      data: allapplications,
      err: null,
    });
  } catch (e) {
    res.status(200);
    res.json({
      data: null,
      err: "INTERNAL SERVER ErROR",
    });
  }
}

const UnderwrittenApplicationStats = [
  { label: "Application", data: "20" },
  { label: "In-review", data: "10 applications" },
  {
    label: "Approved",
    data: "2 applications",
  },
  {
    label: "Funded",
    data: "$20k",
  },
] as const;

export async function getApplicationsStats(_: Request, res: Response) {
  try {
    res.status(200);
    res.json({
      data: UnderwrittenApplicationStats,
      err: null,
    });
  } catch (e) {
    res.status(500);
    res.json({
      data: null,
      err: "INTERNAL SERVER ERRRO",
    });
  }
}
