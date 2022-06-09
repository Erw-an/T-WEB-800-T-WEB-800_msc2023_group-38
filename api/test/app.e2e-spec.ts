import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as pactum from 'pactum';
import { eachLike, like } from 'pactum-matchers';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        await app.listen(3042);

        pactum.request.setBaseUrl('http://localhost:3042');
    });

    afterAll(() => {
        app.close();
    });

    describe('Geo', () => {
        describe('GET /geo/adresses/autocomplete?q=toulouse', () => {
            it('should return an list of adresses', async () => {
                await pactum
                    .spec()
                    .get('/geo/adresses/autocomplete?q=toulouse')
                    .expectStatus(HttpStatus.OK)
                    .expectJsonMatch(
                        'content',
                        eachLike({
                            place_id: '321218857946',
                            osm_id: '35738',
                            osm_type: 'relation',
                            licence: 'https://locationiq.com/attribution',
                            lat: '43.6044622',
                            lon: '1.4442469',
                            boundingbox: [
                                '43.532654',
                                '43.668708',
                                '1.3503956',
                                '1.5153795',
                            ],
                            class: 'place',
                            type: 'city',
                            display_name:
                                'Toulouse, Haute-Garonne, Occitanie, 31000;31100;31200;31300;31400;31500, France',
                            display_place: 'Toulouse',
                            display_address:
                                'Haute-Garonne, Occitanie, 31000;31100;31200;31300;31400;31500, France',
                            address: like({
                                name: 'Toulouse',
                                county: 'Haute-Garonne',
                                state: 'Occitanie',
                                postcode: '31000;31100;31200;31300;31400;31500',
                                country: 'France',
                                country_code: 'fr',
                            }),
                        }),
                    );
            });
        });
    });
});