-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "product" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
