
import { Company } from "./company";
import { Permission } from "./permission";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  companies: Company[];
  permissions: Permission[];
  createdById: number;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  companies: Company[];
  permissions: Permission[];
}
