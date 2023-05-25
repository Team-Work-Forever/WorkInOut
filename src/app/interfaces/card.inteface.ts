export interface Card {
    id?: string;
    title: string;
    image: string;
    time: number;

    isFavorite: boolean;
}

export interface Data {
    name: string;
    description: string;
    img?: string;
}
