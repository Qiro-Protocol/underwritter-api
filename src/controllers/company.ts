import { type Request, type Response } from "express";
import { prisma } from "@/utils";
import { ValidateCompanyData } from "@/validators/validator-company";

export const createCompany = async (req: Request, res: Response) => {
  try {
    const {
      city,
      country,
      description,
      foundedYear,
      headLine,
      logo,
      name,
      teamSize,
      website,
      id,
    } = ValidateCompanyData.parse(req.body);
    const comp = await prisma.company.create({
      data: {
        name,
        city,
        country,
        description,
        headLine,
        foundedYear,
        logo,
        teamSize,
        website,
        owner: {
          connect: {
            id,
          },
        },
      },
    });

    res.status(201);
    res.json({
      data: comp,
      err: null,
    });
  } catch (e) {
    res.status(500);
    res.json({
      data: null,
      err: e,
    });
  }
};
