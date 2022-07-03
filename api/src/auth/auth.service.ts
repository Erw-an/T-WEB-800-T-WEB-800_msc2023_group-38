import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto, SignUpDto } from 'src/dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async signIn(dto: SignInDto): Promise<{ access_token: string }> {
        const user = await this.prismaService.user.findUnique({
            where: { email: dto.email },
        });

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(dto.password, salt);
        console.log('hash:', hash);

        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        const isMatch = await bcrypt.compare(dto.password, user.password);

        if (!isMatch) {
            throw new ForbiddenException('Credentials incorrect');
        }
        const token = await this.signToken(user.id, user.email);
        return token;
    }

    async signUp(dto: SignUpDto): Promise<{ access_token: string }> {
        const checkUser = await this.prismaService.user.findUnique({
            where: { email: dto.email },
        });
        if (checkUser) {
            throw new ForbiddenException('Mail already existe');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(dto.password, salt);

        const user = await this.prismaService.user.create({
            data: {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                password: hash,
            },
        });

        const token = await this.signToken(user.id, user.email);
        return token;
    }

    async signToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            userId,
            email,
        };
        const secret = await this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '42m',
            secret: secret,
        });

        return {
            access_token: token,
        };
    }
}
