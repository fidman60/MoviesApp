export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export function toggleFavoriteAction(film) {
    return {
        type: TOGGLE_FAVORITE,
        value: film
    };
}