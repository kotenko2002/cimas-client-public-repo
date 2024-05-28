export interface CreateFilmRequest {
    name: string;
    duration: string;
}

export interface FilmResponse {
    id: string;
    name: string;
    duration: string;
}
