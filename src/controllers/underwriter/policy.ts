import { prisma } from "@/utils";
import {
  validateCreatePolicy,
  validatePolicyDeployInput,
} from "@/validators/validate-policy";
import { Request, Response } from "express";

export async function createPolicy(req: Request, res: Response) {
  try {
    const { name, polciyCode, id } = validateCreatePolicy.parse(req.body);
    const createdPolciy = await prisma.policy.create({
      data: {
        name,
        polciyCode,
        owner: {
          connect: {
            id,
          },
        },
      },
    });
    res.status(200);
    res.json({
      data: createdPolciy,
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

export async function getAllPolicies(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const allPolcies = await prisma.policy.findMany({
      where: {
        userId: id,
      },
    });
    res.status(200);
    res.json({
      data: allPolcies,
      err: null,
    });
  } catch (e) {
    res.status(500);
    res.json({
      data: null,
      err: "INTERNAL SERVEr ERROR",
    });
  }
}

export async function DeployPolicy(req: Request, res: Response) {
  try {
    const { appId, id } = validatePolicyDeployInput.parse(req.body);
    console.log(appId, id);
    res.status(200);
    res.json({
      data: {
        message: "polciy deployed succesfully",
      },
      err: null,
    });
  } catch (e) {
    res.status(200);
    res.json({
      data: null,
      err: "INTERNAL SERVER ERRRO",
    });
  }
}
