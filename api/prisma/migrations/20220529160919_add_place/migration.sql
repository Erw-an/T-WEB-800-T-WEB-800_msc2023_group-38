-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_tripId_fkey";

-- DropForeignKey
ALTER TABLE "TripsOnUsers" DROP CONSTRAINT "TripsOnUsers_tripId_fkey";

-- DropForeignKey
ALTER TABLE "TripsOnUsers" DROP CONSTRAINT "TripsOnUsers_userId_fkey";

-- DropIndex
DROP INDEX "User_password_key";

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "idApi" INTEGER NOT NULL,
    "lat" INTEGER NOT NULL,
    "lng" INTEGER NOT NULL,
    "tags" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacesOnItineraries" (
    "itineraryId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,

    CONSTRAINT "PlacesOnItineraries_pkey" PRIMARY KEY ("itineraryId","placeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_idApi_key" ON "Place"("idApi");

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacesOnItineraries" ADD CONSTRAINT "PlacesOnItineraries_itineraryId_fkey" FOREIGN KEY ("itineraryId") REFERENCES "Itinerary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacesOnItineraries" ADD CONSTRAINT "PlacesOnItineraries_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripsOnUsers" ADD CONSTRAINT "TripsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripsOnUsers" ADD CONSTRAINT "TripsOnUsers_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
