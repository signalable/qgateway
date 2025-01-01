import { IsEmail, IsString, MinLength } from 'class-validator';

// 회원가입 DTO
export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  name: string;
}

// 로그인 DTO
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

// 로그인 응답 DTO
export class LoginResponseDto {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}
