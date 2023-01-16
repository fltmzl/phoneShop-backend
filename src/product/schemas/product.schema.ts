import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  brand: string;

  @Prop()
  model: string;

  @Prop()
  releaseDate: string;

  @Prop()
  description: string;

  @Prop(
    raw({
      chipset: { type: String },
      ram: { type: String },
      storage: { type: String },
      battery: { type: String },
      os: { type: String },
      size: { type: String },
      camera: { type: String },
    }),
  )
  specs: Record<string, any>;

  @Prop()
  images: string;

  @Prop()
  price: number;
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.plugin(uniqueValidator);
export { ProductSchema };
