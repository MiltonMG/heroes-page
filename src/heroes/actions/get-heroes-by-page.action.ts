import { heroApi } from "../api/hero.api"
import type { HeroesResponse } from "../interfaces/get-heroes.respose";

const baseURL = import.meta.env.VITE_API_URL
export const getHeroesByPageAction = async(
    page: number,
    limit: number = 6,
    category: string = 'all'
): Promise<HeroesResponse> => {
    if ( isNaN(page) ) {
        page = 1;
    }
    if ( isNaN(limit) ) {
        page = 6;
    }
    
    const {data} = await heroApi.get<HeroesResponse>(`/`, {
        params: {
            limit: limit,
            offset: ( page - 1 ) * limit,
            category: category
        }
    });
    
    const heroes = data.heroes.map( hero => ({
        ...hero,
        image: `${ baseURL }/images/${hero.image}`
    }) )

    return {
        ...data,
        heroes: heroes
    };
}