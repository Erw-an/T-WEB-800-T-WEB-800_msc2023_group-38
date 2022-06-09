import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class GeoService {
    constructor(
        private config: ConfigService,
        private httpService: HttpService,
    ) {}

    private readonly requestConfig: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    private readonly locationIqApiKEy = this.config.get('LOCATION_IQ_API_KEY');

    async autoComplete(q: string): Promise<any> {
        const res = this.httpService
            .get(
                `https://api.locationiq.com/v1/autocomplete.php?key=${this.locationIqApiKEy}&q=${q}&countrycodes=fr&tag=place&accept-language=fr`,
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
}
