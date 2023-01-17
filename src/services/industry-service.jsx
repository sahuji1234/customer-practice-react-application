import { myAxios } from "./Helper"

export const  getAllIndustries=()=>{
    return myAxios.get(`/industries`).then(response=> response.data)
}