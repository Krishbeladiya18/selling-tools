import { Category } from "./category";

export interface Products {
  id: number;
  name: string;
  price: number;
  category: Category;
}
