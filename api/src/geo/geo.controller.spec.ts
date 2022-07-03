import { GetDirectionArgs, GetPlacesNearbyArgs } from '../dto/geo.service';
import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { GeoService } from './geo.service';
import { GeoController, EProfile, EAmenity } from './geo.controller';

describe('GeoController Unit Tests', () => {
    let geoController: GeoController;

    const mockGeoService = {
        autoComplete: jest
            .spyOn(GeoService.prototype, 'autoComplete')
            .mockImplementation((q: string) => Promise.resolve(q)),

        getPlacesNearby: jest
            .spyOn(GeoService.prototype, 'getPlacesNearby')
            .mockImplementation((args: GetPlacesNearbyArgs) =>
                Promise.resolve(args),
            ),

        getDirection: jest
            .spyOn(GeoService.prototype, 'getDirection')
            .mockImplementation((args: GetDirectionArgs) =>
                Promise.resolve(args),
            ),
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [GeoController],
            providers: [{ provide: GeoService, useValue: mockGeoService }],
        }).compile();

        geoController = moduleRef.get<GeoController>(GeoController);
    });

    it('should be defined', () => {
        expect(geoController).toBeDefined();
    });

    describe('autocomplete() ok test', () => {
        const query = 'toulouse';

        it('should return args', async () => {
            const res = await geoController.autoComplete(query);
            expect(res).toEqual(query);
        });

        it('should have been call with args', async () => {
            expect(mockGeoService.autoComplete).toHaveBeenLastCalledWith(query);
        });
    });

    describe('autocomplete() fail test', () => {
        const query = '';
        it('should throw an HttpException with empty string', async () => {
            await expect(() =>
                geoController.autoComplete(query),
            ).rejects.toThrow(HttpException);
        });

        it('should not have been call with args', () => {
            expect(mockGeoService.autoComplete).not.toHaveBeenLastCalledWith(
                query,
            );
        });
    });

    describe('getDirection() ok test', () => {
        const args = new GetDirectionArgs({
            latStart: 1,
            lngStart: 2,
            latEnd: 3,
            lngEnd: 4,
            profile: EProfile.drivingCar,
        });

        it('should return args', async () => {
            const { coord } = args;
            const res = await geoController.getDirection(
                coord.latStart,
                coord.lngStart,
                coord.latEnd,
                coord.lngEnd,
                args.profile,
            );
            expect(res).toBeInstanceOf(GetDirectionArgs);
        });

        it('should have been call with args', () => {
            expect(mockGeoService.getDirection).toHaveBeenLastCalledWith(args);
        });
    });

    describe('getDirection() fail test', () => {
        const args = new GetDirectionArgs({
            latStart: 1,
            lngStart: 2,
            latEnd: 3,
            lngEnd: 4,
            profile: 'hello',
        });

        it('should throw an error with an unknown profile as args', async () => {
            const { coord } = args;
            await expect(
                geoController.getDirection(
                    coord.latStart,
                    coord.lngStart,
                    coord.latEnd,
                    coord.lngEnd,
                    args.profile,
                ),
            ).rejects.toThrow(HttpException);
        });

        it('should not have been call with args', () => {
            expect(mockGeoService.getDirection).not.toHaveBeenLastCalledWith(
                args,
            );
        });
    });

    describe('getPlacesNearby() ok test', () => {
        const args = new GetPlacesNearbyArgs({
            radius: 10000,
            lat: 44.35139,
            lng: 2.03685,
            amenity: EAmenity.eat,
        });

        it('should return GetPlacesNearbyArgs object', async () => {
            const { coord } = args;
            const res = await geoController.getPlacesNearby(
                args.amenity,
                coord.radius,
                coord.lat,
                coord.lng,
            );
            expect(res).toBeInstanceOf(GetPlacesNearbyArgs);
        });

        it('service method should have been call with args', () => {
            expect(mockGeoService.getPlacesNearby).toHaveBeenLastCalledWith(
                args,
            );
        });
    });

    describe('getPlacesNearby() fail test.', () => {
        const args = new GetPlacesNearbyArgs({
            radius: 10000,
            lat: 44.35139,
            lng: 2.03685,
            amenity: 'ddd',
        });

        it('should throw an error with .', async () => {
            const { coord } = args;
            await expect(
                geoController.getPlacesNearby(
                    args.amenity,
                    coord.radius,
                    coord.lat,
                    coord.lng,
                ),
            ).rejects.toThrow(HttpException);
        });

        it('service method should not have been call with args', () => {
            expect(mockGeoService.getPlacesNearby).not.toHaveBeenLastCalledWith(
                args,
            );
        });
    });
});
