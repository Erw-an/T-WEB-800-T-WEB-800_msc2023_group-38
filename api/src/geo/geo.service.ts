import { PrismaService } from './../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import * as OrsApiClient from 'openrouteservice-js';
import { GetPlacesNearbyArgs, GetDirectionArgs } from 'src/dto';
@Injectable()
export class GeoService {
    constructor(
        private config: ConfigService,
        private httpService: HttpService,
        private prisma: PrismaService,
    ) {}

    private readonly requestConfig: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    private readonly locationIqApiKEy = this.config.get('LOCATION_IQ_API_KEY');
    private readonly orsApiKey = this.config.get('ORS_API_KEY');

    async autoComplete(q: string): Promise<any> {
        const res = this.httpService
            .get(
                `https://api.locationiq.com/v1/autocomplete.php?key=${this.locationIqApiKEy}&dedupe=1&q=${q}&countrycodes=fr&tag=place&accept-language=fr`,
                this.requestConfig,
            )
            .pipe(
                map((response: any) => ({
                    options: {
                        origin: '/autocomplete',
                        apiVersion: 0.1,
                    },
                    content: response.data,
                })),
                catchError((err) => {
                    if (err.response.status === 404) {
                        throw new NotFoundException();
                    }
                    throw err;
                }),
            );
        return lastValueFrom(res);
    }

    async getPlacesNearby(args: GetPlacesNearbyArgs): Promise<any> {
        let amenityString = '';
        const { coord } = args;
        switch (args.amenity) {
            case 'drink':
                amenityString += 'bar|cafe|pub';
                break;
            case 'eat':
                amenityString += 'restaurant|ice_cream|fast_food|food_court';
                break;
            case 'travel':
                amenityString +=
                    'bicycle_rental|bicycle_parking|bicycle_repair_station|boat_rental|boat_sharing|bus_station|car_rental|taxi';
                break;
            case 'enjoy':
                amenityString +=
                    'arts_centre|casino|events_venue|cinema|nightclub|theatre';
                break;
            case 'sleep':
                //TODO
                throw new NotFoundException();
            default:
                throw new NotFoundException();
        }
        // `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node['amenity'='bar'](around:10000,43.604652,1.444209);way['amenity'='bar'](around:100,43.604652,1.444209);relation["amenity"="bar"](around:100,43.604652,1.444209););out;`
        const resp = this.httpService
            .get(
                `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];(node['amenity'~'${amenityString}'](around:${coord.radius},${coord.lat},${coord.lng}););out;`,
            )
            .pipe(
                map((response: any) => ({
                    data: {
                        options: {
                            origin: '/places',
                            apiVersion: 0.1,
                        },
                        content: response.data.elements,
                    },
                })),
                catchError((resp) => {
                    if (resp.response.status === 404) {
                        throw new NotFoundException();
                    }
                    throw resp;
                }),
            );
        return lastValueFrom(resp);
    }

    /**
     * @see https://github.com/GIScience/openrouteservice-js
     * args: IGetDirectionArgs
     * @returns Promise
     */
    async getDirection(args: GetDirectionArgs): Promise<any> {
        const { profile } = args;
        const { latStart, lngStart, latEnd, lngEnd } = args.coord;
        const directions = new OrsApiClient.Directions({
            api_key: this.orsApiKey,
            host: 'https://api.openrouteservice.org',
            service: 'directions',
        });

        const argsCalc = {
            coordinates: [
                [lngStart, latStart],
                [lngEnd, latEnd],
            ],
            format: 'geojson',
            elevation: true,
            instructions_format: 'html',
            extra_info: ['surface', 'steepness', 'waytype'],
            language: 'fr',
            units: 'km',
            timeout: 40000,
            profile,
            preference: 'recommended',
            api_version: 'v2',
        };

        return new Promise((resolve, reject) => {
            directions
                .calculate(argsCalc)
                .then((response) => {
                    const data = {
                        options: {
                            origin: '/direction',
                            apiVersion: 2,
                        },
                        content: response,
                    };
                    resolve(data);
                })
                .catch((err) => {
                    const result = { response: err };
                    if (err.response.status === 400) {
                        reject(
                            new HttpException(
                                'Bad request.',
                                HttpStatus.BAD_REQUEST,
                            ),
                        );
                        return;
                    }
                    reject(result);
                });
        });
    }
}
