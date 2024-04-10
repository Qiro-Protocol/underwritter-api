"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowerRoute = void 0;
const creidt_1 = require("../controllers/borrower/creidt");
const document_1 = require("../controllers/borrower/document");
const getBorrowerInfo_1 = require("../controllers/borrower/getBorrowerInfo");
const company_1 = require("../controllers/onboarding/company");
const express_1 = require("express");
const borrowerRoute = (0, express_1.Router)();
exports.borrowerRoute = borrowerRoute;
borrowerRoute.post("/add-company", company_1.createCompany);
borrowerRoute.get("/", getBorrowerInfo_1.getBorrwerInfo);
borrowerRoute.post("/credit", creidt_1.AddCreditInformaion);
borrowerRoute.get("/credit/:id", creidt_1.getBorrwerCreditDetails);
borrowerRoute.post("/document", document_1.addDocument);
borrowerRoute.get("/document/:id", document_1.getBorrwerDocuments);
//# sourceMappingURL=borrower.js.map