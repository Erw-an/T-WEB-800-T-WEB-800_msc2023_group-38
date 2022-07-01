import { ValidationPipe } from './../pipes/validation.pipe';
import { SignInDto, SignUpDto } from './../dto/auth.service';
import { AuthService } from './auth.service';
import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOkResponse,
    ApiOperation,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        description: 'Endpoint for user to signin',
    })
    @ApiBody({
        description: 'User credentials',
        type: SignInDto,
        required: true,
    })
    @ApiOkResponse({
        description:
            'This description defines when a 200 (OK) is returned. For @Get-Annotated Endpoints this is always present. When, for example, using a @Post-Endpoint, a 201 Created is always present',
    })
    @ApiBadRequestResponse({
        description: 'This description is for a 400 response.',
    })
    @HttpCode(HttpStatus.ACCEPTED)
    @Post('/signin')
    async signIn(@Body(new ValidationPipe()) dto: SignInDto) {
        const res = await this.authService.signIn(dto);
        return res;
    }

    @HttpCode(HttpStatus.ACCEPTED)
    @Post('/signup')
    async signUp(@Body() dto: SignUpDto) {
        console.log('dto:', dto);
        const res = await this.authService.signUp(dto);
        return res;
    }
}
