import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  releaseDate: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  specs: {
    chipset: string;
    ram: string;
    storage: string;
    battery: string;
    os: string;
    size: string;
    camera: string;
  };

  @IsNotEmpty()
  images: string;

  @IsNotEmpty()
  price: number;
}
