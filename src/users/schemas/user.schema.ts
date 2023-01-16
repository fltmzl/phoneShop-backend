import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: false })
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(uniqueValidator);
export { UserSchema };
