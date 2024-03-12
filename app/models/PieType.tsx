export interface PieType {
    name: string;
    value: number;
}

export interface PieConfigType {
    title: string;
    data: PieType[];
    total: number;
}