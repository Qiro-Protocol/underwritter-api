import { type Request, type Response } from "express";
import { prisma } from "src/utils";
import { validateCreditInfo } from "src/validators/validate-credit-info";

export const CreditInformaion = async (req: Request, res: Response) => {
  try {
    const { id, data } = validateCreditInfo.parse(req.body);
    const comp = await prisma.company.update({
      where: {
        id: id,
      },
      data: {
        creidt: {
          createMany: {
            data: data,
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
