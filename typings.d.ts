import { User } from 'src/users/schemas/user.schema';

export interface UserType extends User {
  id: string;
}
