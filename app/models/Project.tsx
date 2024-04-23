import { GroupType } from "./Group";
import { AddProductType } from "./AddProduct";

export interface ProjectType {
  id: number | null;
  name: string | null;
  description: string | null;
  image: string | null;
  budget: string | null;
  products: AddProductType | [];
  company: string | null;
  location: string | null;
  area: string | null;
  user_id: number | null;
  group: number | null;
  created_at: string | null;
  updated_at: string | null;
  groupInfo: GroupType | null;
}
