import { type Request, type Response } from "express";
import { prisma } from "@/utils";
import { validateCreditInfo } from "@/validators/validate-credit-info";

export const AddCreditInformaion = async (req: Request, res: Response) => {
  try {
    const { companyId, data } = validateCreditInfo.parse(req.body);
    const comp = await prisma.company.update({
      where: {
        id: Number(companyId),
      },
      data: {
        credit: {
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

export async function getBorrwerCreditDetails(req: Request, res: Response) {
  try {
    const companyId = Number(req.params.id);
    console.log(companyId);
    if (companyId) {
      const creditDetails = await prisma.record.findMany({
        where: {
          companyId: companyId,
        },
      });
      console.log(creditDetails);
      if (!creditDetails) {
        res.status(404);
        res.json({
          data: null,
          err: {
            message: "Not able to find any borrwer with prvided id",
          },
        });
      } else {
        res.status(200);
        res.json({
          data: creditDetails,
          err: null,
        });
      }
    } else {
      res.status(400);
      res.json({
        data: null,
        err: {
          message: "NO company Id Provided",
        },
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      data: null,
      err: {
        message: "INTERNAL SERVER ERROR",
      },
    });
  }
}
