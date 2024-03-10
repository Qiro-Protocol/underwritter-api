import { fetchData, serviceData } from "@/lib/fetchandstore";
import jobQueue from "@/lib/queue";
import { prisma } from "@/utils";
import {
  validateConnectService,
  validateService,
} from "@/validators/validate-service";
import { Job } from "bull";
import { Request, Response } from "express";

export async function createService(req: Request, res: Response) {
  try {
    const { id, name, description, dataType } = validateService.parse(req.body);
    const serviceRes = await prisma.service.create({
      data: {
        name,
        description,
        dataType: dataType ?? "UNKOWN",
        user: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
    res.status(200);
    res.json({
      data: serviceRes,
      err: null,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      data: null,
      err: "INTERNAL SERVER ERROR",
    });
  }
}

export async function getAllServices(_: Request, res: Response) {
  try {
    const allServices = await prisma.service.findMany({
      include: {
        company: true,
        user: true,
      },
    });
    res.status(200);
    res.json({
      data: allServices,
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

export async function connectService(req: Request, res: Response) {
  try {
    const { companyId, serviceId } = validateConnectService.parse(req.body);
    const connectedSerciesData = await prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        services: {
          connect: {
            id: serviceId,
          },
        },
      },
    });
    if (!connectedSerciesData) {
      res.status(404);
      res.json({
        data: null,
        err: {
          message: "NO SERVICE WITH THAT ID OR NO COMPANY WITH THAT COMPANY ID",
        },
      });
    } else {
      jobQueue.process(function (job: Job<serviceData>) {
        return fetchData({
          companyId,
          serviceId,
          url: job.data.url,
        });
      });
      jobQueue
        .add({
          id: serviceId,
          companyId,
          serviceId,
          url: "https://jsonplaceholder.typicode.com/posts",
        })
        .then(() => {
          res.status(200);
          res.json({
            data: connectedSerciesData,
            err: null,
          });
        })
        .catch((e) => {
          console.log(e);
          res.status(500);
          res.json("ERROR WITH QUEUE");
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

export async function getConnectedServicesByCompanyId(
  req: Request,
  res: Response
) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400);
      res.json({
        data: null,
        err: {
          message: "ID NOT PROVIDED",
        },
      });
    }
    const services = await prisma.service.findMany({
      where: {
        companyId: Number(id),
      },
    });
    res.status(200);
    res.json({
      data: services,
      err: null,
    });
  } catch (e) {
    res.status(200);
    res.json({
      data: null,
      err: "INTERNAL SERVER ERROR",
    });
  }
}
