import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { IExpenses } from './../../types/IExpenses';

export const createExpense = async (expense: IExpenses) => {
    const { data } = await api.post('/expenses', expense)
    return data
}
export const deleteExpense = async (id: string) => {
    const { data } = await api.delete(`/expenses/${id}`)
    return data
}
export const editExpense = async (expense: IExpenses) => {
    const { data } = await api.put(`/expenses/${expense?._id}`)
    return data
}

export const getAllExpenses = async () => {
    const { data } = await api.get<IExpenses[]>('/expenses')
    return data
}

export const useGetAllExpenses = () => {
    return useQuery(['getAllExpenses'], () => getAllExpenses())
}
