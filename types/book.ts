export type Book = {
    _id: string;
    image: string;
    title: string;
    description: string;
    author: string;
    rating: number;
    pages: number;
    languages: string;
    date: Date;
    category: string;
    validUntil: Date;
    stock: number;
}