import { prisma } from "@/utils";
import { validateDocument } from "@/validators/validate-user";
import { Request, Response } from "express";

export async function addDocument(req: Request, res: Response) {
  try {
    const { companyId, label, link } = validateDocument.parse(req.body);
    const dpcument = await prisma.document.create({
      data: {
        label,
        companyId,
        link,
        documentType: "AGREEMENTS",
      },
    });

    res.status(200);
    res.json({
      data: {
        message: "Document Added Successfuly`",
        dpcument,
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

export async function getBorrwerDocuments(req: Request, res: Response) {
  try {
    const companyId = Number(req.params.id);
    console.log(companyId);
    if (companyId) {
      const allDocuments = await prisma.document.findMany({
        where: {
          companyId: companyId,
        },
      });
      if (!allDocuments) {
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
          data: allDocuments,
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
