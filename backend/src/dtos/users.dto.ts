import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsBoolean()
  @IsOptional()
  public isAmind: boolean;

  @IsArray()
  @IsOptional()
  public myPosts: string[];

  @IsString()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  public phoneNumber: string;

  @IsString()
  @IsOptional()
  public sex: string;
}
