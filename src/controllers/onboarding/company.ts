import { type Request, type Response } from "express";
import { prisma } from "@/utils";
import { ValidateCompanyData } from "@/validators/validator-company";

export const createCompany = async (req: Request, res: Response) => {
  try {
    const {
      location,
      description,
      foundedYear,
      headLine,
      logo,
      name,
      teamSize,
      website,
      userId,
    } = ValidateCompanyData.parse(req.body);
    const comp = await prisma.company.create({
      data: {
        name,
        description,
        headLine,
        foundedYear,
        logo,
        teamSize,
        location,
        website,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const application = await prisma.application.create({
      data: {
        status: "PENDING",
        slug: `${comp.name}${comp.id}`,
        details: comp.description,
        loanAmmount: 200,
      },
    });
    console.log(application);

    res.status(201);
    res.json({
      data: comp,
      err: null,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      data: null,
      err: e,
    });
  }
};
