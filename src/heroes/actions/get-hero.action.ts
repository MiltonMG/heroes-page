import { heroApi } from "../api/hero.api"
import type { Hero } from "../interfaces/hero.interface"

const baseURL = import.meta.env.VITE_API_URL

export const getHeroAction = async ( idSlug:string ) => {
  
    const { data } = await heroApi.get<Hero>(`/${idSlug}`);

    return {
        ...data,
        image: `${baseURL}/images/${data.image}`
    }

}
