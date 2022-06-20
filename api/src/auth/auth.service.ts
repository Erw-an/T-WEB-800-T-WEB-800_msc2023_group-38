import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignInDto } from 'src/dto';
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

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(dto.password, salt);
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
