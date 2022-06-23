import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Trip, Prisma } from '@prisma/client';

@Injectable()
export class TripService {
    constructor(private config: ConfigService, private prisma: PrismaService) {}

    private custom_code_expn = this.config.get('CUSTOM_CODE_EXPN');

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
                'Itinerary not found',
                this.custom_code_expn,
            );
        }
    }

    private getTripItineraries = async ({ userId, tripId }): Promise<any> => {
        try {
            const { trip: itineraries } =
                await this.prisma.tripsOnUsers.findUnique({
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
            return itineraries;
        } catch (err) {
            throw new HttpException(
                'Itinerary not found.',
                this.custom_code_expn,
            );
        }
    };

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
            console.log(
                '🚀 ~ file: trip.service.ts ~ line 194 ~ TripService ~ upsertPlace= ~ err',
                err,
            );
            let msg = 'Error';
            let code = HttpStatus.INTERNAL_SERVER_ERROR;

            if (
                err instanceof Prisma.PrismaClientKnownRequestError &&
                err.code == 'P2002'
            ) {
                msg = 'Place has been already added';
                code = this.custom_code_expn;
            }
            throw new HttpException(msg, code);
        }
    };

    private ensureUserHasItinerary = ({ itineraries, itineraryId }): void => {
        const hasItinerary = itineraries.some(
            (el) => el.id == (itineraryId as number),
        );
        if (!hasItinerary) {
            console.error('ensureUserHasItinerary failed');
            throw new HttpException(
                'Itinerary not found',
                this.custom_code_expn,
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
                err.getStatus() === this.custom_code_expn
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
                err.getStatus() === this.custom_code_expn
            ) {
                msg = err.getResponse() as string;
            }
            throw new HttpException(msg, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
