export interface Card {
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
