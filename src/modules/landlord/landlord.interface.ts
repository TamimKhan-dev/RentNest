export interface IPropertyDetailsPayload {
    title: string;
    description: string;
    price: number;
    location: string;
    amenities: string[];
    categoryId?: number;
};

export interface IUpdatePropertyPayload {
    title?: string;
    description?: string;
    price?: number;
    location?: string;
    amenities?: string[];
    categoryId?: number;
};