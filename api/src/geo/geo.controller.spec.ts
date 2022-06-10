import { HttpException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { GeoService } from './geo.service';
import { GeoController } from './geo.controller';

describe('GeoController Unit Tests', () => {
    let geoController: GeoController;

    const mockGeoService = {
        autoComplete: jest
            .spyOn(GeoService.prototype, 'autoComplete')
            .mockImplementation((q: string) => Promise.resolve(q)),
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
});
