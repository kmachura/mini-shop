import { Address } from "./address.model";
import { UserRole } from "./user-role.model";

export interface User {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  roles: Array<UserRole>;
  password: string;
  phone: number;
  address?: Address;
}
