-- CreateTable
CREATE TABLE "ResumeFile" (
    "id" SERIAL NOT NULL,
    "itineraryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "data" BYTEA NOT NULL,

    CONSTRAINT "ResumeFile_pkey" PRIMARY KEY ("id","itineraryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeFile_itineraryId_key" ON "ResumeFile"("itineraryId");

-- AddForeignKey
ALTER TABLE "ResumeFile" ADD CONSTRAINT "ResumeFile_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
