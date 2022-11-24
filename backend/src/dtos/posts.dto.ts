import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsString()
  public img: string;

  @IsString()
  public idUser: string;

  @IsString()
  public theme: string;
  
  @IsBoolean()
  @IsOptional()
  public isChecked: boolean;
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @IsOptional()
  public content: string;

  @IsString()
  @IsOptional()
  public img: string;

  @IsString()
  @IsOptional()
  public idUser: string;

  @IsString()
  @IsOptional()
  public theme: string;
  
  @IsBoolean()
  @IsOptional()
  public isChecked: boolean;
}
