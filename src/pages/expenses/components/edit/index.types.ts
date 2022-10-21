import { IExpenses } from '../../../../types/IExpenses';
export interface IProps {
    isEditExpense: boolean,
    setEditExpense: () => void,
    item: IExpenses
}