export interface responseSongType {
    id?:number;
    name:string; 
    link:string; 
    score:number;
}

export interface insertSongType {
    name: string;
    genresIds: number[];
    youtubeLink: string;
}