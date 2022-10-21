import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { IRevenues } from './../../types/IRevenues';

export const createRevenues = async (Revenue: IRevenues) => {
    const { data } = await api.post('/revenues', Revenue)
    return data
}
export const deleteRevenues = async (id: string) => {
    const { data } = await api.delete(`/revenues/${id}`)
    return data
}
export const editRevenues = async (Revenue: IRevenues) => {
    const { data } = await api.put(`/revenues/${Revenue?._id}`)
    return data
}

export const getAllRevenues = async () => {
    const { data } = await api.get<IRevenues[]>('/revenues')
    return data
}

export const useGetAllRevenues = () => {
    return useQuery(['getAllRevenues'], () => getAllRevenues())
}
