import {
  AddCreditInformaion,
  getBorrwerCreditDetails,
} from "@/controllers/borrower/creidt";
import {
  addDocument,
  getBorrwerDocuments,
} from "@/controllers/borrower/document";
import { getBorrwerInfo } from "@/controllers/borrower/getBorrowerInfo";
import { createCompany } from "@/controllers/onboarding/company";
import { Router } from "express";

const borrowerRoute = Router();

borrowerRoute.post("/add-company", createCompany);
borrowerRoute.get("/", getBorrwerInfo);
borrowerRoute.post("/credit", AddCreditInformaion);
borrowerRoute.get("/credit/:id", getBorrwerCreditDetails);
borrowerRoute.post("/document", addDocument);
borrowerRoute.get("/document/:id", getBorrwerDocuments);

export { borrowerRoute };
