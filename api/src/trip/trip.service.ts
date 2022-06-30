import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Trip, Prisma } from '@prisma/client';

enum EMsgExpn {
    INY_NOT_FOUND = 'Itinerary not found',
    PLACE_ALREADY_ADDED = 'Place already added',
}
@Injectable()
export class TripService {
    constructor(private config: ConfigService, private prisma: PrismaService) {}

    async getTrips(userId: number): Promise<
        {
            trip: Trip;
        }[]
    > {
        try {
            console.log('userId:', userId);

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
                                connect: { id: userId as number },
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
            throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getItinerary({ userId, tripId, itId }) {
        try {
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
                            itineraries: {
                                where: {
                                    id: itId,
                                },
                                include: {
                                    places: {
                                        select: {
                                            place: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            return { itinerary: res.trip.itineraries[0] };
        } catch (err) {
            throw new HttpException(
                EMsgExpn.INY_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    getTripItineraries = async ({ userId, tripId }): Promise<any> => {
        try {
            const { trip: itineraries } =
                await this.prisma.tripsOnUsers.findUnique({
                    where: {
                        userId_tripId: {
                            userId,
                            tripId,
                        },
                    },
                    include: {
                        trip: {
                            include: {
                                itineraries: {
                                    select: {
                                        id: true,
                                        tripId: true,
                                        resumeFile: true,
                                    },
                                },
                            },
                        },
                    },
                });
            return itineraries;
        } catch (err) {
            throw new HttpException(
                EMsgExpn.INY_NOT_FOUND,
                HttpStatus.BAD_REQUEST,
            );
        }
    };

    // getTripItineraries = async ({ userId, tripId }): Promise<any> => {
    //     try {
    //         const { trip: itineraries } =
    //             await this.prisma.tripsOnUsers.findUnique({
    //                 where: {
    //                     userId_tripId: {
    //                         userId,
    //                         tripId,
    //                     },
    //                 },
    //                 select: {
    //                     trip: {
    //                         select: {
    //                             itineraries: { select: { resumeFile: true } },
    //                         },
    //                     },
    //                 },
    //             });
    //         return itineraries;
    //     } catch (err) {
    //         throw new HttpException(
    //             EMsgExpn.INY_NOT_FOUND,
    //             HttpStatus.BAD_REQUEST,
    //         );
    //     }
    // };

    private upsertPlace = async ({ content, itineraryId }): Promise<any> => {
        const { id, lat, lon, tags } = content;

        try {
            const res = await this.prisma.place.upsert({
                where: {
                    idApi: id,
                },
                update: {
                    itineraries: {
                        create: {
                            itinerary: {
                                connect: { id: itineraryId as number },
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
                                connect: { id: itineraryId as number },
                            },
                        },
                    },
                },
            });
            return res;
        } catch (err) {
            let msg = 'Error';
            let code = HttpStatus.INTERNAL_SERVER_ERROR;

            if (
                err instanceof Prisma.PrismaClientKnownRequestError &&
                err.code == 'P2002'
            ) {
                msg = EMsgExpn.INY_NOT_FOUND;
                code = HttpStatus.BAD_REQUEST;
            }
            throw new HttpException(msg, code);
        }
    };

    private ensureUserHasItinerary = ({ itineraries, itineraryId }): void => {
        const hasItinerary = itineraries.some(
            (itinerary) => itinerary.id === (itineraryId as number),
        );

        if (!hasItinerary) {
            console.error('ensureUserHasItinerary failed');
            throw new HttpException(
                'Itinerary not found',
                HttpStatus.BAD_REQUEST,
            );
        }
    };

    async savePlace({ userId, tripId, itineraryId, content }) {
        try {
            const res = await this.prisma.$transaction(async () => {
                const { itineraries } = await this.getTripItineraries({
                    userId,
                    tripId,
                });

                this.ensureUserHasItinerary({ itineraries, itineraryId });
                const res = await this.upsertPlace({ content, itineraryId });
                return res;
            });
            return res;
        } catch (err) {
            let msg = 'Error';

            if (
                err instanceof HttpException &&
                Object.values(EMsgExpn).includes(err.getResponse() as EMsgExpn)
            ) {
                msg = err.getResponse() as string;
            }
            throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async saveItineraryFile({ file, userId, tripId, itineraryId }) {
        try {
            const { itineraries } = await this.getTripItineraries({
                userId,
                tripId,
            });

            this.ensureUserHasItinerary({ itineraries, itineraryId });

            const res = await this.prisma.resumeFile.upsert({
                where: {
                    itineraryId,
                },
                update: {},
                create: {
                    itinerary: {
                        connect: { id: itineraryId as number },
                    },
                    data: file.buffer,
                },
            });
            return res;
        } catch (err) {
            let msg = 'Error';
            if (
                err instanceof HttpException &&
                Object.values(EMsgExpn).includes(err.getResponse() as EMsgExpn)
            ) {
                msg = err.getResponse() as string;
            }
            throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
