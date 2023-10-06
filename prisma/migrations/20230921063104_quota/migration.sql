-- CreateTable
CREATE TABLE "UserCommentQuota" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quota" INTEGER NOT NULL,

    CONSTRAINT "UserCommentQuota_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCommentQuota_userId_key" ON "UserCommentQuota"("userId");

-- AddForeignKey
ALTER TABLE "UserCommentQuota" ADD CONSTRAINT "UserCommentQuota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
