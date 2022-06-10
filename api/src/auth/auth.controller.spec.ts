import { HttpException, ForbiddenException } from '@nestjs/common';
import { SignInDto } from 'src/dto';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
    let controller: AuthController;
    const EMAIL = 'test@test.com';
    const PASSWORD = 'password';
    const USER = { access_token: 'acess_token' };

    const mockAuthGeoService = {
        signIn: jest
            .spyOn(AuthService.prototype, 'signIn')
            .mockImplementation((dto: SignInDto) => {
                if (dto.email === EMAIL && dto.password === PASSWORD)
                    return Promise.resolve(USER);
                else {
                    return Promise.reject(
                        new ForbiddenException('Credentials incorrect'),
                    );
                }
            }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: mockAuthGeoService }],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('signIn() ok test', () => {
        const query = { email: EMAIL, password: PASSWORD };

        it('should return user id', async () => {
            const res = await controller.signIn(query);
            expect(res).toMatchObject(USER);
        });

        it('should have been call with args', () => {
            expect(mockAuthGeoService.signIn).toHaveBeenLastCalledWith(query);
        });
    });

    describe('signIn() fail test', () => {
        const query = { email: 'test.com', password: 'password' };

        it('should throw an error', async () => {
            await expect(controller.signIn(query)).rejects.toThrow(
                HttpException,
            );
        });

        it('should have been call with args', () => {
            expect(mockAuthGeoService.signIn).toHaveBeenLastCalledWith(query);
        });
    });
});
