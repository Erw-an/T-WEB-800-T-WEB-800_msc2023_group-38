import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Trip, Prisma } from '@prisma/client';

@Injectable()
export class TripService {
    constructor(private config: ConfigService, private prisma: PrismaService) {}

    async getTrips(userId: number): Promise<
        {
            trip: Trip;
        }[]
    > {
        try {
            const res = await this.prisma.tripsOnUsers.findMany({
                where: {
                    userId,
                },
                select: {
                    trip: true,
                },
            });

            return res;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createTrip(userId: number): Promise<Trip> {
        try {
            const res = await this.prisma.trip.create({
                data: {
                    users: {
                        create: {
                            user: {
                                connect: {
                                    id: userId,
                                },
                            },
                        },
                    },
                },
            });
            return res;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async saveItinerary({ content, tripId, userId }) {
        try {
            const tripItineraries = await this.prisma.tripsOnUsers.update({
                where: {
                    userId_tripId: {
                        userId,
                        tripId,
                    },
                },
                data: {
                    trip: {
                        update: {
                            itineraries: {
                                create: {
                                    content,
                                },
                            },
                        },
                    },
                },
                select: {
                    trip: {
                        select: {
                            itineraries: true,
                        },
                    },
                },
            });
            const { itineraries } = tripItineraries.trip;
            return itineraries[itineraries.length - 1];
        } catch (err) {
            console.log(err);
            throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async savePlace({ userId, tripId, itineraryId, content }) {
        try {
            const ensureUserOwnItinerary = async () => {
                const res = await this.prisma.tripsOnUsers.findUnique({
                    where: {
                        userId_tripId: {
                            userId,
                            tripId,
                        },
                    },
                    select: {
                        trip: {
                            select: {
                                itineraries: { select: { id: true } },
                            },
                        },
                    },
                });
                return res;
            };

            const { id, lat, lon, tags } = content;
            const itinaryIdInt = itineraryId as number;

            const queryUpsertPlaceToItinerary = async () =>
                this.prisma.place.upsert({
                    where: {
                        idApi: id,
                    },
                    update: {
                        itineraries: {
                            create: {
                                itinerary: {
                                    connect: { id: itinaryIdInt },
                                },
                            },
                        },
                    },
                    create: {
                        idApi: content.id,
                        lat: lat,
                        lng: lon,
                        tags,
                        itineraries: {
                            create: {
                                itinerary: {
                                    connect: { id: itinaryIdInt },
                                },
                            },
                        },
                    },
                });

            return await this.prisma.$transaction(async () => {
                const { trip } = await ensureUserOwnItinerary();

                const userOwnItinerary = trip.itineraries.some(
                    (el) => el.id == itinaryIdInt,
                );
                if (!userOwnItinerary) {
                    console.error('User not owner of the repo');
                    throw new HttpException('Error', HttpStatus.BAD_REQUEST);
                }
                const res = await queryUpsertPlaceToItinerary();
                return res;
            });
        } catch (err) {
            let msg = 'Error';
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == 'P2002') {
                    msg = 'Already selected';
                }
            }
            throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
