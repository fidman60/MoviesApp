import {API_KEY} from "../Helpers/token";

export function getFilmsWithSearchedText(text,page=1) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr&query=${text}&page=${page}`;
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getImageFromApi (name,width=300) {
    return `https://image.tmdb.org/t/p/w${width}${name}`;
}

export function getFilmDetailFromApi (id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr`)
        .then((response) => response.json())
        .catch((error) => console.error(error));
}