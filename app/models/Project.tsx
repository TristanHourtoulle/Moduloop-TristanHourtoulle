import { GroupType } from "./Group";

export interface ProjectType {
    id: number | null;
    name: string | null;
    description: string | null;
    image: string | null;
    budget: string | null;
    products: JSON | null;
    company: string | null;
    location: string | null;
    area: string | null;
    user_id: number | null;
    group: GroupType | null;
    created_at: string | null;
    updated_at: string | null;
};