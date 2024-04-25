"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompany = void 0;
const utils_1 = require("../../utils");
const validator_company_1 = require("../../validators/validator-company");
const createCompany = async (req, res) => {
    try {
        const { location, description, foundedYear, headLine, logo, name, teamSize, website, userId, } = validator_company_1.ValidateCompanyData.parse(req.body);
        const comp = await utils_1.prisma.company.create({
            data: {
                name,
                description,
                headLine,
                foundedYear,
                logo,
                teamSize,
                location,
                website,
                owner: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        const application = await utils_1.prisma.application.create({
            data: {
                status: "PENDING",
                slug: `${comp.name}${comp.id}`,
                details: comp.description,
                loanAmmount: 200,
            },
        });
        console.log(application);
        res.status(201);
        res.json({
            data: comp,
            err: null,
        });
    }
    catch (e) {
        console.log(e);
        res.status(500);
        res.json({
            data: null,
            err: e,
        });
    }
};
exports.createCompany = createCompany;
//# sourceMappingURL=company.js.map