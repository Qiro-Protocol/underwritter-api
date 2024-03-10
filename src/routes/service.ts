import {
  connectService,
  createService,
  getAllServices,
  getConnectedServicesByCompanyId,
} from "@/controllers/services/service";
import { Router } from "express";

const serviceRouter = Router();

serviceRouter.get("/", getAllServices);
serviceRouter.post("/", createService);
serviceRouter.post("/connect", connectService);
serviceRouter.get("/:id", getConnectedServicesByCompanyId);

export { serviceRouter };
