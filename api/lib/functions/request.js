"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequestMumbai = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const functions_toolkit_1 = require("@chainlink/functions-toolkit");
const abi_json_1 = __importDefault(require("./abi.json"));
const ethers_1 = require("ethers");
const env_enc_1 = require("@chainlink/env-enc");
(0, env_enc_1.config)();
const consumerAddress = "0x3513FDb3F7db1aaA149feCCc614A5C642698fe1C";
const subscriptionId = 1323;
const makeRequestMumbai = async () => {
    const routerAddress = "0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C";
    const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    const donId = "fun-polygon-mumbai-1";
    const explorerUrl = "https://mumbai.polygonscan.com";
    const source = fs_1.default
        .readFileSync(path_1.default.resolve(__dirname, "source.js"))
        .toString();
    const args = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    const gasLimit = 300000;
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey)
        throw new Error("private key not provided - check your environment variables");
    const rpcUrl = "https://polygon-mumbai.g.alchemy.com/v2/kV8qIfhZYAYxIzeQrxfHrso9_R-ITP4y";
    if (!rpcUrl)
        throw new Error(`rpcUrl not provided  - check your environment variables`);
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers_1.ethers.Wallet(privateKey);
    const signer = wallet.connect(provider);
    console.log("Start simulation...");
    console.log("\nEstimate request costs...");
    const subscriptionManager = new functions_toolkit_1.SubscriptionManager({
        signer: signer,
        linkTokenAddress: linkTokenAddress,
        functionsRouterAddress: routerAddress,
    });
    await subscriptionManager.initialize();
    const gasPriceWei = await signer.getGasPrice();
    const estimatedCostInJuels = await subscriptionManager.estimateFunctionsRequestCost({
        donId: donId,
        subscriptionId: subscriptionId,
        callbackGasLimit: gasLimit,
        gasPriceWei: BigInt(gasPriceWei.toBigInt()),
    });
    console.log(`Fulfillment cost estimated to ${ethers_1.ethers.utils.formatEther(estimatedCostInJuels)} LINK`);
    console.log("\nMake request...");
    const functionsConsumer = new ethers_1.ethers.Contract(consumerAddress, abi_json_1.default, signer);
    const transaction = await functionsConsumer.sendRequest(source, "0x", 0, 0, args, [], subscriptionId, gasLimit, ethers_1.ethers.utils.formatBytes32String(donId));
    console.log(`\n✅ Functions request sent! Transaction hash ${transaction.hash}. Waiting for a response...`);
    console.log(`See your request in the explorer ${explorerUrl}/tx/${transaction.hash}`);
    const responseListener = new functions_toolkit_1.ResponseListener({
        provider: provider,
        functionsRouterAddress: routerAddress,
    });
    (async () => {
        try {
            const response = (await new Promise((resolve, reject) => {
                responseListener
                    .listenForResponseFromTransaction(transaction.hash)
                    .then((response) => {
                    resolve(response);
                })
                    .catch((error) => {
                    reject(error);
                });
            }));
            const fulfillmentCode = response.fulfillmentCode;
            if (fulfillmentCode === functions_toolkit_1.FulfillmentCode.FULFILLED) {
                console.log(`\n✅ Request ${response.requestId} successfully fulfilled. Cost is ${ethers_1.ethers.utils.formatEther(response.totalCostInJuels)} LINK.Complete reponse: `, response);
            }
            else if (fulfillmentCode === functions_toolkit_1.FulfillmentCode.USER_CALLBACK_ERROR) {
                console.log(`\n⚠️ Request ${response.requestId} fulfilled. However, the consumer contract callback failed. Cost is ${ethers_1.ethers.utils.formatEther(response.totalCostInJuels)} LINK.Complete reponse: `, response);
            }
            else {
                console.log(`\n❌ Request ${response.requestId} not fulfilled. Code: ${fulfillmentCode}. Cost is ${ethers_1.ethers.utils.formatEther(response.totalCostInJuels)} LINK.Complete reponse: `, response);
            }
            const errorString = response.errorString;
            if (errorString) {
                console.log(`\n❌ Error during the execution: `, errorString);
            }
            else {
                const responseBytesHexstring = response.responseBytesHexstring;
                if (ethers_1.ethers.utils.arrayify(responseBytesHexstring).length > 0) {
                    const decodedResponse = (0, functions_toolkit_1.decodeResult)(response.responseBytesHexstring, functions_toolkit_1.ReturnType.uint256);
                    console.log(`\n✅ Decoded response to ${functions_toolkit_1.ReturnType.uint256}: `, decodedResponse);
                }
            }
        }
        catch (error) {
            console.error("Error listening for response:", error);
        }
    })();
};
exports.makeRequestMumbai = makeRequestMumbai;
//# sourceMappingURL=request.js.map