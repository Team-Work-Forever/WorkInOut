export interface Card {
    id?: string;
    title: string;
    image: string;
    time: string;
    list: Data[];
    isFavorite: boolean;
}

export interface Data {
    name: string;
    description: string;
    img?: string;
}
