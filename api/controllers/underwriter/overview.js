"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnderWritterStats = void 0;
const underwritterstats = [
    { label: "Total-Underwritten", data: "20" },
    { label: "Default-ate", data: "50%" },
    {
        label: "Acceptance-Rate",
        data: "10%",
    },
    {
        label: "Earnings",
        data: "$20k",
    },
];
async function getUnderWritterStats(_, res) {
    try {
        res.status(200);
        res.json({
            data: underwritterstats,
            err: null,
        });
    }
    catch (e) {
        res.status(500);
        res.json({
            data: null,
            err: "INTERNAL SERVER ERROR",
        });
    }
}
exports.getUnderWritterStats = getUnderWritterStats;
//# sourceMappingURL=overview.js.map