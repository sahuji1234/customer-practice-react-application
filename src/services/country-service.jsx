import { myAxios } from "./Helper"


export const getAllCountries=()=>{
    return myAxios.get(`/country`).then(response=>response.data)
}