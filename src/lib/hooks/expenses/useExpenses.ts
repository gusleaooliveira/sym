import { useQuery } from '@tanstack/react-query';
import { api } from "../../api"

export const getAllExpenses = async (token: string) =>{
    const resp = await api.get('/expenses', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return resp.data
}
 
export const useAllExpenses = (token: string) => {
    return useQuery(['getAllExpenses', token], ()=>getAllExpenses(token))
}
 