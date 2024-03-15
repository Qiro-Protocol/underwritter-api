-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "subscriptionId" INTEGER;

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "chainId" INTEGER NOT NULL,
    "routerAddress" TEXT NOT NULL,
    "donId" TEXT NOT NULL,
    "linkTokenAddress" TEXT NOT NULL,
    "explorerUrl" TEXT NOT NULL,
    "contractAdress" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
