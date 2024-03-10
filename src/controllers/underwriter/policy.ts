import { makeRequestMumbai } from "@/lib/functions/request";
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
            id: Number(id),
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
        userId: Number(id),
      },
    });
    res.status(200);
    res.json({
      data: allPolcies,
      err: null,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      data: null,
      err: "INTERNAL SERVEr ERROR",
    });
  }
}

export async function DeployPolicy(req: Request, res: Response) {
  try {
    const { appId, policyId } = validatePolicyDeployInput.parse(req.body);
    const app = await prisma.application.findUnique({
      where: {
        id: appId,
      },
    });
    const polciy = await prisma.policy.findUnique({
      where: {
        id: policyId,
      },
    });

    if (!app || !polciy) {
      res.status(404);
      res.json({
        data: null,
        err: {
          message: "No applicaton found with provided app id",
        },
      });
    }

    await prisma.application.update({
      where: {
        id: appId,
      },
      data: {
        Policy: {
          connect: {
            id: policyId,
          },
        },
      },
    });
    const r = await makeRequestMumbai();
    console.log(r);

    res.status(200);
    res.json({
      data: {
        message: "polciy deployed succesfully",
      },
      err: null,
    });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      data: null,
      err: "INTERNAL SERVER ERRRO",
    });
  }
}
