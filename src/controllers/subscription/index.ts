import { type Response, type Request } from "express";
import { prisma } from "@/utils";
import { validateSubscription } from "@/validators/validate-subscription";

export async function getSubscriptions(req: Request, res: Response) {
  try {
    const { id } = req.body;
    const subscriptions = await prisma.subscription.findMany({
      where: {
        ownerId: Number(id),
      },
    });

    if (!subscriptions) {
      res.status(404);
      res.json({
        data: null,
        err: {
          message: "Resource not found",
        },
      });
    } else {
      res.status(200);
      res.json({
        data: subscriptions,
        err: null,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({
      data: null,
      err: "INTERNAL SerVer ERROR",
    });
  }
}

export async function createSubscription(req: Request, res: Response) {
  try {
    const {
      id,
      name,
      chainId,
      contractAddress,
      donId,
      explorerUrl,
      linkTokenAddress,
      routerAddress,
      subscriptionId,
    } = validateSubscription.parse(req.body);
    const createdSubscription = await prisma.subscription.create({
      data: {
        name,
        chainId,
        contractAdress: contractAddress,
        donId,
        explorerUrl,
        linkTokenAddress,
        routerAddress,
        subscriptionId,
        osner: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
    res.status(201);
    res.json({
      data: createdSubscription,
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
